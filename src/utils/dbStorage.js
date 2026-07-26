// Helper utility for persistent storage handling large data (e.g. video files, high-res images) via IndexedDB + localStorage fallback

const DB_NAME = 'BijayPanditDB';
const DB_VERSION = 1;
const STORE_NAME = 'app_data';

let dbPromise = null;

const initDB = () => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        resolve(null);
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = (err) => {
        console.warn('IndexedDB initialization failed:', err);
        resolve(null);
      };
    });
  }
  return dbPromise;
};

export const setStorageItem = async (key, value) => {
  // 1. Try localStorage (fast synchronous storage for standard text data)
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // QuotaExceededError happens when storing large base64 video/photo payloads in localStorage (5MB limit)
    console.warn(`localStorage limit reached for "${key}". Saving safely in IndexedDB instead.`, err);
  }

  // 2. Persist in IndexedDB (supports high capacity binary/string storage up to gigabytes)
  try {
    const db = await initDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(value, key);
    }
  } catch (err) {
    console.error(`IndexedDB storage error for "${key}":`, err);
  }
};

export const getStorageItemAsync = async (key, fallbackValue) => {
  try {
    const db = await initDB();
    if (db) {
      const item = await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
      if (item !== undefined && item !== null) {
        return item;
      }
    }
  } catch (err) {
    console.warn(`IndexedDB read error for "${key}":`, err);
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn(`localStorage read error for "${key}":`, err);
  }

  return fallbackValue;
};
