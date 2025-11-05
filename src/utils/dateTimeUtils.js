/**
 * Date and Time Utilities
 * Helper functions for date/time formatting and manipulation
 */

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffMs / 604800000);
  const diffMonths = Math.floor(diffMs / 2592000000);
  const diffYears = Math.floor(diffMs / 31536000000);
  
  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};

/**
 * Format date to short format (e.g., "Jan 15, 2025")
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatShortDate = (date) => {
  const d = new Date(date);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format date to long format (e.g., "January 15, 2025")
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatLongDate = (date) => {
  const d = new Date(date);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format time (e.g., "14:30" or "2:30 PM")
 * @param {Date|string} date - Date to format
 * @param {boolean} use24Hour - Use 24-hour format
 * @returns {string} - Formatted time string
 */
export const formatTime = (date, use24Hour = true) => {
  const d = new Date(date);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  };
  return d.toLocaleTimeString('en-US', options);
};

/**
 * Format date and time (e.g., "Jan 15, 2025 14:30")
 * @param {Date|string} date - Date to format
 * @param {boolean} use24Hour - Use 24-hour format
 * @returns {string} - Formatted datetime string
 */
export const formatDateTime = (date, use24Hour = true) => {
  return `${formatShortDate(date)} ${formatTime(date, use24Hour)}`;
};

/**
 * Get current hour (0-23)
 * @returns {number} - Current hour
 */
export const getCurrentHour = () => {
  return new Date().getHours();
};

/**
 * Get current date
 * @returns {Date} - Current date
 */
export const getCurrentDate = () => {
  return new Date();
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if today
 */
export const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if yesterday
 */
export const isYesterday = (date) => {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Get days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} - Days between dates
 */
export const getDaysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2 - d1);
  return Math.floor(diffMs / 86400000);
};

/**
 * Add days to date
 * @param {Date|string} date - Base date
 * @param {number} days - Days to add (can be negative)
 * @returns {Date} - New date
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Format ISO date string
 * @param {Date|string} date - Date to format
 * @returns {string} - ISO date string
 */
export const formatISO = (date) => {
  return new Date(date).toISOString();
};

/**
 * Parse ISO date string
 * @param {string} isoString - ISO date string
 * @returns {Date} - Parsed date
 */
export const parseISO = (isoString) => {
  return new Date(isoString);
};

/**
 * Get timestamp
 * @param {Date|string} date - Date (defaults to now)
 * @returns {number} - Unix timestamp
 */
export const getTimestamp = (date = new Date()) => {
  return new Date(date).getTime();
};

/**
 * Format duration (milliseconds to human readable)
 * @param {number} ms - Duration in milliseconds
 * @returns {string} - Formatted duration
 */
export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

export default {
  formatRelativeTime,
  formatShortDate,
  formatLongDate,
  formatTime,
  formatDateTime,
  getCurrentHour,
  getCurrentDate,
  isToday,
  isYesterday,
  getDaysBetween,
  addDays,
  formatISO,
  parseISO,
  getTimestamp,
  formatDuration,
};
