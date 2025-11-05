import { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../config/environment';
import {
  getTimeBasedGreeting,
  getRandomMessage,
  getGreetingEmoji,
} from '../utils/welcomeMessages';

/**
 * useWelcomeMessage Hook
 * Generates dynamic welcome messages based on time, username, and randomness
 * 
 * Returns:
 * - greeting: Time-based greeting (Good morning/afternoon/evening)
 * - message: Funny pun or professional message
 * - username: User's name
 * - emoji: Appropriate emoji for the time of day
 */
const useWelcomeMessage = () => {
  const [username, setUsername] = useState(CONFIG.APP.DEFAULT_USERNAME);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  /**
   * Load username from localStorage
   */
  useEffect(() => {
    const savedUsername = localStorage.getItem(CONFIG.STORAGE_KEYS.USERNAME);
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  /**
   * Update current hour every minute
   */
  useEffect(() => {
    const updateHour = () => {
      setCurrentHour(new Date().getHours());
    };

    // Update every minute
    const interval = setInterval(updateHour, 60000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Get time-based greeting
   */
  const greeting = useMemo(() => {
    return getTimeBasedGreeting(currentHour);
  }, [currentHour]);

  /**
   * Get random message (funny pun or professional)
   */
  const message = useMemo(() => {
    return getRandomMessage(currentHour);
  }, [currentHour]);

  /**
   * Get appropriate emoji
   */
  const emoji = useMemo(() => {
    return getGreetingEmoji(currentHour);
  }, [currentHour]);

  /**
   * Update username
   */
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem(CONFIG.STORAGE_KEYS.USERNAME, newUsername);
  };

  return {
    greeting,
    message,
    username,
    emoji,
    updateUsername,
  };
};

export default useWelcomeMessage;
