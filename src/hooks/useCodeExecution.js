import { useState, useCallback } from 'react';
import { executeCode, visualizeCode, traceCode } from '../services/api/codeExecutionService';
import { CONFIG } from '../config/environment';
import { devLog, errorLog } from '../config/environment';

/**
 * useCodeExecution Hook
 * Handles code execution, visualization, and tracing
 */
const useCodeExecution = () => {
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState('');
  const [visualizationData, setVisualizationData] = useState(null);
  const [traceData, setTraceData] = useState(null);

  /**
   * Reset execution state
   */
  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setOutput('');
    setVisualizationData(null);
    setTraceData(null);
  }, []);

  /**
   * Execute code
   */
  const run = useCallback(async (code, language) => {
    if (!CONFIG.FEATURES.ENABLE_CODE_EXECUTION) {
      setError('Code execution is disabled');
      return null;
    }

    try {
      setExecuting(true);
      setError(null);
      setResult(null);
      setOutput('');

      devLog('Executing code:', { language, codeLength: code.length });

      const response = await executeCode(code, language);

      if (response.success) {
        setResult(response.result);
        setOutput(response.output || '');
        devLog('Code executed successfully');
      } else {
        setError(response.error || 'Execution failed');
        errorLog('Code execution failed:', response.error);
      }

      return response;
    } catch (err) {
      const errorMessage = err.message || 'Execution error';
      setError(errorMessage);
      errorLog('Code execution error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setExecuting(false);
    }
  }, []);

  /**
   * Visualize code execution
   */
  const visualize = useCallback(async (code, language) => {
    if (!CONFIG.FEATURES.ENABLE_VISUALIZATION) {
      setError('Visualization is disabled');
      return null;
    }

    try {
      setExecuting(true);
      setError(null);
      setVisualizationData(null);

      devLog('Visualizing code:', { language, codeLength: code.length });

      const response = await visualizeCode(code, language);

      if (response.success) {
        setVisualizationData(response.data);
        devLog('Code visualized successfully');
      } else {
        setError(response.error || 'Visualization failed');
        errorLog('Code visualization failed:', response.error);
      }

      return response;
    } catch (err) {
      const errorMessage = err.message || 'Visualization error';
      setError(errorMessage);
      errorLog('Code visualization error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setExecuting(false);
    }
  }, []);

  /**
   * Trace code execution
   */
  const trace = useCallback(async (code, language) => {
    if (!CONFIG.FEATURES.ENABLE_TRACER) {
      setError('Tracer is disabled');
      return null;
    }

    try {
      setExecuting(true);
      setError(null);
      setTraceData(null);

      devLog('Tracing code:', { language, codeLength: code.length });

      const response = await traceCode(code, language);

      if (response.success) {
        setTraceData(response.data);
        devLog('Code traced successfully');
      } else {
        setError(response.error || 'Tracing failed');
        errorLog('Code tracing failed:', response.error);
      }

      return response;
    } catch (err) {
      const errorMessage = err.message || 'Tracing error';
      setError(errorMessage);
      errorLog('Code tracing error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setExecuting(false);
    }
  }, []);

  /**
   * Stop execution (if running)
   */
  const stop = useCallback(() => {
    setExecuting(false);
    devLog('Execution stopped');
  }, []);

  /**
   * Check if code is valid for execution
   */
  const validateCode = useCallback((code, language) => {
    if (!code || code.trim() === '') {
      return { valid: false, message: 'Code is empty' };
    }

    if (!language) {
      return { valid: false, message: 'Language not specified' };
    }

    return { valid: true, message: 'Code is valid' };
  }, []);

  /**
   * Get execution statistics
   */
  const getStats = useCallback(() => {
    return {
      hasResult: result !== null,
      hasError: error !== null,
      hasOutput: output !== '',
      hasVisualization: visualizationData !== null,
      hasTrace: traceData !== null,
      isExecuting: executing,
    };
  }, [result, error, output, visualizationData, traceData, executing]);

  return {
    // State
    executing,
    result,
    error,
    output,
    visualizationData,
    traceData,
    
    // Actions
    run,
    visualize,
    trace,
    stop,
    reset,
    
    // Utilities
    validateCode,
    getStats,
  };
};

export default useCodeExecution;
