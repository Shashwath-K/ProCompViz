/**
 * API Client
 * Centralized HTTP client with interceptors and error handling
 */

import { CONFIG, isDevelopment } from '../../config/environment';
import { ERROR_MESSAGES } from '../../utils/constants';

/**
 * HTTP Methods
 */
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * Default headers
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/**
 * API Client Class
 */
class APIClient {
  constructor(baseURL = CONFIG.API.BASE_URL) {
    this.baseURL = baseURL;
    this.timeout = CONFIG.API.TIMEOUT;
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} - Response promise
   */
  async request(endpoint, options = {}) {
    const {
      method = HTTP_METHODS.GET,
      headers = {},
      body = null,
      timeout = this.timeout,
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(ERROR_MESSAGES.TIMEOUT_ERROR)), timeout);
      });

      // Create fetch promise
      const fetchPromise = fetch(url, config);

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Handle HTTP errors
      if (!response.ok) {
        return this.handleHTTPError(response);
      }

      // Parse JSON response
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle HTTP errors
   * @param {Response} response - Fetch response
   * @returns {Object} - Error object
   */
  async handleHTTPError(response) {
    let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;

    switch (response.status) {
      case 400:
        errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case 401:
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 403:
        errorMessage = ERROR_MESSAGES.FORBIDDEN;
        break;
      case 404:
        errorMessage = ERROR_MESSAGES.NOT_FOUND;
        break;
      case 500:
      case 502:
      case 503:
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
        break;
    }

    // Try to get error message from response body
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Use default error message
    }

    return {
      success: false,
      error: errorMessage,
      status: response.status,
    };
  }

  /**
   * Handle general errors
   * @param {Error} error - Error object
   * @returns {Object} - Error object
   */
  handleError(error) {
    let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;

    if (error.message === ERROR_MESSAGES.TIMEOUT_ERROR) {
      errorMessage = ERROR_MESSAGES.TIMEOUT_ERROR;
    } else if (!navigator.onLine) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      errorMessage = error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    if (isDevelopment()) {
      console.error('API Error:', error);
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: HTTP_METHODS.GET });
  }

  /**
   * POST request
   */
  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: HTTP_METHODS.POST, body });
  }

  /**
   * PUT request
   */
  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: HTTP_METHODS.PUT, body });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: HTTP_METHODS.PATCH, body });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: HTTP_METHODS.DELETE });
  }
}

// Create singleton instance
const apiClient = new APIClient();

export default apiClient;
