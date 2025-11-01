import { useState, useCallback, useEffect } from 'react';
import { devLog, errorLog } from '../config/environment';

/**
 * useLocalStorage Hook
 * Custom hook for localStorage with JSON serialization
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 */
const useLocalStorage = (key, initialValue) => {
  /**
   * Get initial value from localStorage or use provided initial value
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      errorLog('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  /**
   * Set value in state and localStorage
   */
  const setValue = useCallback(
    (value) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        devLog('localStorage set:', key, valueToStore);
      } catch (error) {
        errorLog('Error writing to localStorage:', error);
      }
    },
    [key, storedValue]
  );

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      devLog('localStorage removed:', key);
    } catch (error) {
      errorLog('Error removing from localStorage:', error);
    }
  }, [key, initialValue]);

  /**
   * Check if key exists in localStorage
   */
  const hasValue = useCallback(() => {
    return window.localStorage.getItem(key) !== null;
  }, [key]);

  /**
   * Get raw value (without parsing)
   */
  const getRawValue = useCallback(() => {
    return window.localStorage.getItem(key);
  }, [key]);

  /**
   * Set raw value (without stringifying)
   */
  const setRawValue = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, value);
        devLog('localStorage set (raw):', key, value);
      } catch (error) {
        errorLog('Error writing raw to localStorage:', error);
      }
    },
    [key]
  );

  /**
   * Listen for changes to this key in other tabs/windows
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
          devLog('localStorage updated from another tab:', key);
        } catch (error) {
          errorLog('Error parsing storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, removeValue, hasValue, getRawValue, setRawValue];
};

export default useLocalStorage;
