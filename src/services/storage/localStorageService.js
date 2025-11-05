/**
 * LocalStorage Service
 * Wrapper for localStorage operations with error handling
 */

import { CONFIG } from '../../config/environment';
import { devLog, errorLog } from '../../config/environment';

/**
 * Check if localStorage is available
 */
const isAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} - Stored value or default
 */
export const getItem = (key, defaultValue = null) => {
  if (!isAvailable()) {
    errorLog('localStorage is not available');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    return JSON.parse(item);
  } catch (error) {
    errorLog('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} - Success status
 */
export const setItem = (key, value) => {
  if (!isAvailable()) {
    errorLog('localStorage is not available');
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    devLog('localStorage set:', key);
    return true;
  } catch (error) {
    errorLog('Error writing to localStorage:', error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} - Success status
 */
export const removeItem = (key) => {
  if (!isAvailable()) {
    errorLog('localStorage is not available');
    return false;
  }

  try {
    localStorage.removeItem(key);
    devLog('localStorage removed:', key);
    return true;
  } catch (error) {
    errorLog('Error removing from localStorage:', error);
    return false;
  }
};

/**
 * Clear all localStorage
 * @returns {boolean} - Success status
 */
export const clear = () => {
  if (!isAvailable()) {
    errorLog('localStorage is not available');
    return false;
  }

  try {
    localStorage.clear();
    devLog('localStorage cleared');
    return true;
  } catch (error) {
    errorLog('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Get all keys
 * @returns {Array<string>} - Array of keys
 */
export const getAllKeys = () => {
  if (!isAvailable()) return [];

  try {
    return Object.keys(localStorage);
  } catch (error) {
    errorLog('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Get storage size (approximate)
 * @returns {number} - Size in bytes
 */
export const getSize = () => {
  if (!isAvailable()) return 0;

  try {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return size;
  } catch (error) {
    errorLog('Error calculating localStorage size:', error);
    return 0;
  }
};

/**
 * Check if key exists
 * @param {string} key - Storage key
 * @returns {boolean} - True if exists
 */
export const hasKey = (key) => {
  if (!isAvailable()) return false;
  return localStorage.getItem(key) !== null;
};

export default {
  isAvailable,
  getItem,
  setItem,
  removeItem,
  clear,
  getAllKeys,
  getSize,
  hasKey,
};
