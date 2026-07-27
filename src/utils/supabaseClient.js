import { createClient } from '@supabase/supabase-js';
import { setStorageItem, getStorageItemAsync } from './dbStorage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Save data to local storage AND sync to Supabase Cloud if configured
 */
export const saveCloudData = async (key, value) => {
  // Always save locally first (IndexedDB / localStorage)
  await setStorageItem(key, value);

  // Sync to Supabase if configured
  if (supabase) {
    try {
      const { error } = await supabase
        .from('site_data')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      if (error) {
        console.warn(`Supabase sync warning for "${key}":`, error.message);
      }
    } catch (err) {
      console.error(`Supabase cloud save error for "${key}":`, err);
    }
  }
};

/**
 * Fetch data from Supabase Cloud if online/configured, otherwise fallback to local IndexedDB/localStorage
 */
export const getCloudData = async (key, fallbackValue) => {
  // Try fetching from Supabase Cloud first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_data')
        .select('value')
        .eq('key', key)
        .single();

      if (!error && data && data.value) {
        // Also update local storage so it stays up to date
        setStorageItem(key, data.value);
        return data.value;
      }
    } catch (err) {
      console.warn(`Supabase fetch warning for "${key}":`, err);
    }
  }

  // Fallback to IndexedDB / localStorage
  return await getStorageItemAsync(key, fallbackValue);
};

/**
 * Subscribe to real-time updates from Supabase Cloud
 */
export const subscribeToCloudChanges = (onDataUpdated) => {
  if (!supabase) return () => {};

  const channel = supabase
    .channel('public:site_data')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'site_data' },
      (payload) => {
        if (payload.new && payload.new.key && payload.new.value) {
          // Update local cache
          setStorageItem(payload.new.key, payload.new.value);
          // Notify app callback
          onDataUpdated(payload.new.key, payload.new.value);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
