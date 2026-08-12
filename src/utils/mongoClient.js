import { setStorageItem, getStorageItemAsync } from './dbStorage';

const API_BASE = (typeof window !== 'undefined' && window.location.origin.includes('localhost'))
  ? 'http://localhost:5001'
  : '';

/**
 * Save data to MongoDB (and local cache fallback) and broadcast to all devices
 */
export const saveCloudData = async (key, value) => {
  // 1. Save locally first
  await setStorageItem(key, value);

  // 2. Post to Express / MongoDB backend
  try {
    const res = await fetch(`${API_BASE}/api/site-data/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    if (res.ok) {
      console.log(`MongoDB sync success for "${key}"`);
    }
  } catch (err) {
    console.warn(`MongoDB save warning for "${key}":`, err);
  }
};

/**
 * Fetch data from MongoDB if online/configured, fallback to local storage
 */
export const getCloudData = async (key, fallbackValue) => {
  try {
    const res = await fetch(`${API_BASE}/api/site-data/${key}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.value) {
        setStorageItem(key, data.value);
        return data.value;
      }
    }
  } catch (err) {
    console.warn(`MongoDB fetch warning for "${key}":`, err);
  }

  return await getStorageItemAsync(key, fallbackValue);
};

/**
 * Subscribe to real-time updates from MongoDB server via Server-Sent Events (SSE)
 */
export const subscribeToCloudChanges = (onDataUpdated) => {
  let eventSource = null;

  try {
    eventSource = new EventSource(`${API_BASE}/api/realtime`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.key && data.value) {
          setStorageItem(data.key, data.value);
          onDataUpdated(data.key, data.value);
        }
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn("SSE connection retry...", err);
    };
  } catch (err) {
    console.warn("SSE setup error:", err);
  }

  return () => {
    if (eventSource) {
      eventSource.close();
    }
  };
};
