/**
 * IndexedDB Service
 * For storing large data (future use - code history, large projects)
 */

import { CONFIG } from '../../config/environment';
import { errorLog, devLog } from '../../config/environment';

const DB_NAME = 'VisualizerTracerDB';
const DB_VERSION = 1;
const STORES = {
  PROJECTS: 'projects',
  CODE_HISTORY: 'codeHistory',
  VISUALIZATIONS: 'visualizations',
};

let db = null;

/**
 * Initialize IndexedDB
 * @returns {Promise<IDBDatabase>} - Database instance
 */
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      errorLog('IndexedDB error:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      devLog('IndexedDB initialized');
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Create projects store
      if (!database.objectStoreNames.contains(STORES.PROJECTS)) {
        const projectStore = database.createObjectStore(STORES.PROJECTS, {
          keyPath: 'id',
        });
        projectStore.createIndex('type', 'type', { unique: false });
        projectStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }

      // Create code history store
      if (!database.objectStoreNames.contains(STORES.CODE_HISTORY)) {
        const historyStore = database.createObjectStore(STORES.CODE_HISTORY, {
          keyPath: 'id',
          autoIncrement: true,
        });
        historyStore.createIndex('projectId', 'projectId', { unique: false });
        historyStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Create visualizations store
      if (!database.objectStoreNames.contains(STORES.VISUALIZATIONS)) {
        const vizStore = database.createObjectStore(STORES.VISUALIZATIONS, {
          keyPath: 'id',
        });
        vizStore.createIndex('projectId', 'projectId', { unique: false });
      }

      devLog('IndexedDB stores created');
    };
  });
};

/**
 * Add item to store
 * @param {string} storeName - Store name
 * @param {Object} data - Data to add
 * @returns {Promise} - Success status
 */
export const addItem = async (storeName, data) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        devLog('Item added to IndexedDB:', storeName);
        resolve({ success: true, id: request.result });
      };
      request.onerror = () => {
        errorLog('Error adding to IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    errorLog('IndexedDB error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get item from store
 * @param {string} storeName - Store name
 * @param {string} key - Item key
 * @returns {Promise} - Item data
 */
export const getItem = async (storeName, key) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve({ success: true, data: request.result });
      };
      request.onerror = () => {
        errorLog('Error getting from IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    errorLog('IndexedDB error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all items from store
 * @param {string} storeName - Store name
 * @returns {Promise} - Array of items
 */
export const getAllItems = async (storeName) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve({ success: true, data: request.result });
      };
      request.onerror = () => {
        errorLog('Error getting all from IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    errorLog('IndexedDB error:', error);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Update item in store
 * @param {string} storeName - Store name
 * @param {Object} data - Data to update
 * @returns {Promise} - Success status
 */
export const updateItem = async (storeName, data) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        devLog('Item updated in IndexedDB:', storeName);
        resolve({ success: true });
      };
      request.onerror = () => {
        errorLog('Error updating IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    errorLog('IndexedDB error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete item from store
 * @param {string} storeName - Store name
 * @param {string} key - Item key
 * @returns {Promise} - Success status
 */
export const deleteItem = async (storeName, key) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        devLog('Item deleted from IndexedDB:', storeName);
        resolve({ success: true });
      };
      request.onerror = () => {
        errorLog('Error deleting from IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    errorLog('IndexedDB error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Clear store
 * @param {string} storeName - Store name
 * @returns {Promise} - Success status
 */
export const clearStore = async (storeName) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        devLog('Store cleared in IndexedDB:', storeName);
        resolve({ success: true });
      };
      request.onerror = () => {
        errorLog('Error clearing IndexedDB:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    errorLog('IndexedDB error:', error);
    return { success: false, error: error.message };
  }
};

export { STORES };

export default {
  initDB,
  addItem,
  getItem,
  getAllItems,
  updateItem,
  deleteItem,
  clearStore,
  STORES,
};
