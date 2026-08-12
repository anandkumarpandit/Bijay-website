import { createClient } from '@supabase/supabase-js';
import { setStorageItem, getStorageItemAsync } from './dbStorage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local BroadcastChannel for instant multi-tab & same-device real-time sync
const broadcastChannel = (typeof window !== 'undefined' && 'BroadcastChannel' in window)
  ? new BroadcastChannel('bijay_website_realtime')
  : null;

/**
 * Save data locally AND broadcast globally to Supabase Cloud & active tabs
 */
export const saveCloudData = async (key, value) => {
  // 1. Always save locally (IndexedDB / localStorage)
  await setStorageItem(key, value);

  // 2. Broadcast to all active tabs on the same device immediately
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ key, value, timestamp: Date.now() });
    } catch (e) {
      console.warn("BroadcastChannel error:", e);
    }
  }

  // 3. Sync to Supabase Cloud for global multi-device deployment sync
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
 * Fetch data from Supabase Cloud if available, otherwise fallback to local storage
 */
export const getCloudData = async (key, fallbackValue) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_data')
        .select('value')
        .eq('key', key)
        .single();

      if (!error && data && data.value) {
        setStorageItem(key, data.value);
        return data.value;
      }
    } catch (err) {
      console.warn(`Supabase fetch warning for "${key}":`, err);
    }
  }

  return await getStorageItemAsync(key, fallbackValue);
};

/**
 * Subscribe to real-time updates from both Supabase Cloud and local BroadcastChannel
 */
export const subscribeToCloudChanges = (onDataUpdated) => {
  const unsubscribers = [];

  // Listen to local BroadcastChannel (same device / multi-tab)
  if (broadcastChannel) {
    const handleBroadcast = (event) => {
      if (event.data && event.data.key && event.data.value) {
        onDataUpdated(event.data.key, event.data.value);
      }
    };
    broadcastChannel.addEventListener('message', handleBroadcast);
    unsubscribers.push(() => broadcastChannel.removeEventListener('message', handleBroadcast));
  }

  // Listen to Supabase Realtime Postgres Changes (cross-device global live sync)
  if (supabase) {
    const channel = supabase
      .channel('public:site_data')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_data' },
        (payload) => {
          if (payload.new && payload.new.key && payload.new.value) {
            setStorageItem(payload.new.key, payload.new.value);
            onDataUpdated(payload.new.key, payload.new.value);
          }
        }
      )
      .subscribe();

    unsubscribers.push(() => supabase.removeChannel(channel));
  }

  return () => {
    unsubscribers.forEach(unsub => unsub());
  };
};

