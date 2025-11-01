/**
 * Code Execution Service
 * API calls for code execution, visualization, and tracing
 */

import apiClient from './apiClient';
import { API_ENDPOINTS } from '../../utils/constants';
import { CONFIG } from '../../config/environment';
import { sleep } from '../../utils/helpers';

/**
 * Execute code
 * @param {string} code - Code to execute
 * @param {string} language - Programming language
 * @returns {Promise} - Execution result
 */
export const executeCode = async (code, language) => {
  // Mock execution for development
  if (CONFIG.DEV.MOCK_API) {
    await sleep(1000); // Simulate network delay
    
    return {
      success: true,
      result: {
        output: 'Hello, World!\n',
        exitCode: 0,
        executionTime: 0.125,
      },
      output: 'Hello, World!\n',
    };
  }

  // Real API call
  return apiClient.post(API_ENDPOINTS.EXECUTE, {
    code,
    language,
  });
};

/**
 * Visualize code execution
 * @param {string} code - Code to visualize
 * @param {string} language - Programming language
 * @returns {Promise} - Visualization data
 */
export const visualizeCode = async (code, language) => {
  // Mock visualization for development
  if (CONFIG.DEV.MOCK_API) {
    await sleep(1500); // Simulate network delay
    
    return {
      success: true,
      data: {
        type: 'visualizer',
        steps: [
          {
            line: 1,
            action: 'Function declaration',
            state: { variables: {} },
          },
          {
            line: 2,
            action: 'Variable assignment',
            state: { variables: { x: 10 } },
          },
          {
            line: 3,
            action: 'Console output',
            state: { variables: { x: 10 }, output: 'Hello, World!' },
          },
        ],
        finalState: {
          variables: { x: 10 },
          output: 'Hello, World!',
        },
      },
    };
  }

  // Real API call
  return apiClient.post(API_ENDPOINTS.VISUALIZE, {
    code,
    language,
  });
};

/**
 * Trace code execution
 * @param {string} code - Code to trace
 * @param {string} language - Programming language
 * @returns {Promise} - Trace data
 */
export const traceCode = async (code, language) => {
  // Mock tracing for development
  if (CONFIG.DEV.MOCK_API) {
    await sleep(1500); // Simulate network delay
    
    return {
      success: true,
      data: {
        type: 'tracer',
        trace: [
          {
            step: 1,
            line: 1,
            lineContent: 'function greet(name) {',
            action: 'Enter function',
            callStack: ['greet'],
            variables: { name: 'World' },
            timestamp: 0,
          },
          {
            step: 2,
            line: 2,
            lineContent: '  return `Hello, ${name}!`;',
            action: 'Return value',
            callStack: ['greet'],
            variables: { name: 'World' },
            returnValue: 'Hello, World!',
            timestamp: 0.001,
          },
          {
            step: 3,
            line: 5,
            lineContent: 'console.log(greet("World"));',
            action: 'Console output',
            callStack: [],
            variables: {},
            output: 'Hello, World!',
            timestamp: 0.002,
          },
        ],
        totalSteps: 3,
        executionTime: 0.002,
      },
    };
  }

  // Real API call
  return apiClient.post(API_ENDPOINTS.TRACE, {
    code,
    language,
  });
};

/**
 * Stop code execution
 * @param {string} executionId - Execution ID
 * @returns {Promise} - Success status
 */
export const stopExecution = async (executionId) => {
  if (CONFIG.DEV.MOCK_API) {
    await sleep(300);
    return { success: true };
  }

  return apiClient.post(`${API_ENDPOINTS.EXECUTE}/stop`, { executionId });
};

export default {
  executeCode,
  visualizeCode,
  traceCode,
  stopExecution,
};
