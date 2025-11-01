/**
 * Validation Utilities
 * Input validation and sanitization functions
 */

import { VALIDATION_RULES, CODE_LIMITS } from './constants';

/**
 * Validate project name
 * @param {string} name - Project name
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateProjectName = (name) => {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Project name is required' };
  }
  
  if (name.length < VALIDATION_RULES.PROJECT_NAME.MIN_LENGTH) {
    return {
      valid: false,
      message: `Project name must be at least ${VALIDATION_RULES.PROJECT_NAME.MIN_LENGTH} character`,
    };
  }
  
  if (name.length > VALIDATION_RULES.PROJECT_NAME.MAX_LENGTH) {
    return {
      valid: false,
      message: `Project name must be at most ${VALIDATION_RULES.PROJECT_NAME.MAX_LENGTH} characters`,
    };
  }
  
  if (!VALIDATION_RULES.PROJECT_NAME.PATTERN.test(name)) {
    return {
      valid: false,
      message: 'Project name contains invalid characters',
    };
  }
  
  return { valid: true, message: 'Valid project name' };
};

/**
 * Validate username
 * @param {string} username - Username
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return { valid: false, message: 'Username is required' };
  }
  
  if (username.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
    return {
      valid: false,
      message: `Username must be at least ${VALIDATION_RULES.USERNAME.MIN_LENGTH} character`,
    };
  }
  
  if (username.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
    return {
      valid: false,
      message: `Username must be at most ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`,
    };
  }
  
  if (!VALIDATION_RULES.USERNAME.PATTERN.test(username)) {
    return {
      valid: false,
      message: 'Username contains invalid characters',
    };
  }
  
  return { valid: true, message: 'Valid username' };
};

/**
 * Validate code
 * @param {string} code - Code content
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateCode = (code) => {
  if (!code || code.trim() === '') {
    return { valid: false, message: 'Code is empty' };
  }
  
  if (code.length > CODE_LIMITS.MAX_LENGTH) {
    return {
      valid: false,
      message: `Code exceeds maximum length of ${CODE_LIMITS.MAX_LENGTH} characters`,
    };
  }
  
  const lineCount = code.split('\n').length;
  if (lineCount > CODE_LIMITS.MAX_LINES) {
    return {
      valid: false,
      message: `Code exceeds maximum of ${CODE_LIMITS.MAX_LINES} lines`,
    };
  }
  
  return { valid: true, message: 'Valid code' };
};

/**
 * Validate email
 * @param {string} email - Email address
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email is required' };
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  
  return { valid: true, message: 'Valid email' };
};

/**
 * Validate URL
 * @param {string} url - URL string
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateURL = (url) => {
  if (!url || url.trim() === '') {
    return { valid: false, message: 'URL is required' };
  }
  
  try {
    new URL(url);
    return { valid: true, message: 'Valid URL' };
  } catch {
    return { valid: false, message: 'Invalid URL format' };
  }
};

/**
 * Sanitize string (remove HTML tags and special characters)
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  
  // Remove HTML tags
  let sanitized = str.replace(/<[^>]*>/g, '');
  
  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>\"\']/g, '');
  
  return sanitized.trim();
};

/**
 * Sanitize filename
 * @param {string} filename - Filename to sanitize
 * @returns {string} - Sanitized filename
 */
export const sanitizeFilename = (filename) => {
  if (!filename) return 'untitled';
  
  // Remove path separators and dangerous characters
  let sanitized = filename.replace(/[\/\\:*?"<>|]/g, '_');
  
  // Remove leading/trailing dots and spaces
  sanitized = sanitized.replace(/^[\s.]+|[\s.]+$/g, '');
  
  // Limit length
  if (sanitized.length > 255) {
    sanitized = sanitized.substring(0, 255);
  }
  
  return sanitized || 'untitled';
};

/**
 * Validate and sanitize project name
 * @param {string} name - Project name
 * @returns {Object} - { valid: boolean, sanitized: string, message: string }
 */
export const validateAndSanitizeProjectName = (name) => {
  const sanitized = sanitizeString(name);
  const validation = validateProjectName(sanitized);
  
  return {
    ...validation,
    sanitized,
  };
};

/**
 * Check if string is empty or whitespace
 * @param {string} str - String to check
 * @returns {boolean} - True if empty
 */
export const isEmpty = (str) => {
  return !str || str.trim() === '';
};

/**
 * Check if value is valid JSON
 * @param {string} str - String to validate
 * @returns {boolean} - True if valid JSON
 */
export const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate number in range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Object} - { valid: boolean, message: string }
 */
export const validateNumberRange = (value, min, max) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return { valid: false, message: 'Value must be a number' };
  }
  
  if (value < min) {
    return { valid: false, message: `Value must be at least ${min}` };
  }
  
  if (value > max) {
    return { valid: false, message: `Value must be at most ${max}` };
  }
  
  return { valid: true, message: 'Valid number' };
};

export default {
  validateProjectName,
  validateUsername,
  validateCode,
  validateEmail,
  validateURL,
  sanitizeString,
  sanitizeFilename,
  validateAndSanitizeProjectName,
  isEmpty,
  isValidJSON,
  validateNumberRange,
};
