const { useState, useEffect, useRef, useCallback } = React;

// Sample files data
const initialFiles = {
  "index.html": `<!DOCTYPE html>
<html>
<head>
    <title>Sample Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to the IDE</h1>
    <div id="app"></div>
    <script src="main.js"></script>
</body>
</html>`,
  "main.js": `// Sample JavaScript for demonstration
function fibonacci(n) {
    console.log('Calculating fibonacci for:', n);
    if (n <= 1) {
        return n;
    }
    let a = fibonacci(n - 1);
    let b = fibonacci(n - 2);
    let result = a + b;
    console.log('fibonacci(' + n + ') = ' + result);
    return result;
}

function processArray(arr) {
    console.log('Processing array:', arr);
    let results = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item % 2 === 0) {
            results.push(item * 2);
        } else {
            results.push(item + 1);
        }
    }
    console.log('Results:', results);
    return results;
}

let numbers = [1, 2, 3, 4, 5];
let processed = processArray(numbers);
console.log('Final result:', processed);

let fibResult = fibonacci(5);`,
  "styles.css": `/* Sample CSS */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

#app {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
  "utils.js": `// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}`,
  "examples/sample.js": `// Sample code with loops and functions
function calculatePrimes(limit) {
    console.log('Finding primes up to:', limit);
    let primes = [];
    
    for (let num = 2; num <= limit; num++) {
        let isPrime = true;
        
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) {
            primes.push(num);
            console.log('Found prime:', num);
        }
    }
    
    return primes;
}

let primeNumbers = calculatePrimes(10);
console.log('All primes:', primeNumbers);`
};

// Settings Modal Component
const SettingsModal = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('14');

  if (!isOpen) return null;

  return (
    <div className="modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'var(--color-surface)',
        padding: 'var(--space-24)',
        borderRadius: 'var(--radius-lg)',
        minWidth: '300px',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-text)' }}>IDE Settings</h3>
        
        <div className="form-group">
          <label className="form-label">Theme</label>
          <select 
            className="form-control" 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Font Size</label>
          <select 
            className="form-control" 
            value={fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-8)', justifyContent: 'flex-end', marginTop: 'var(--space-16)' }}>
          <button className="btn btn--secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={onClose}>Save</button>
        </div>
      </div>
    </div>
  );
};

// File Explorer Component
const FileExplorer = ({ files, activeFile, onFileSelect, onNewFile }) => {
  const [expandedFolders, setExpandedFolders] = useState({ examples: true });

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'js': return '📄';
      case 'html': return '🌐';
      case 'css': return '🎨';
      default: return '📄';
    }
  };

  const handleNewFile = () => {
    const fileName = prompt('Enter file name (e.g., newfile.js):');
    if (fileName && fileName.trim() && !files[fileName]) {
      onNewFile(fileName.trim());
    } else if (files[fileName]) {
      alert('File already exists!');
    }
  };

  const renderFileTree = () => {
    const folders = {};
    const rootFiles = [];

    Object.keys(files).forEach(path => {
      if (path.includes('/')) {
        const [folder, file] = path.split('/');
        if (!folders[folder]) folders[folder] = [];
        folders[folder].push(file);
      } else {
        rootFiles.push(path);
      }
    });

    return (
      <>
        {rootFiles.map(file => (
          <div
            key={file}
            className={`file-item ${activeFile === file ? 'active' : ''}`}
            onClick={() => onFileSelect(file)}
          >
            <span className="file-icon">{getFileIcon(file)}</span>
            {file}
          </div>
        ))}
        {Object.entries(folders).map(([folder, folderFiles]) => (
          <div key={folder}>
            <div
              className="folder-item"
              onClick={() => toggleFolder(folder)}
            >
              <span className="folder-icon">{expandedFolders[folder] ? '📂' : '📁'}</span>
              {folder}
            </div>
            {expandedFolders[folder] && (
              <div className="folder-children">
                {folderFiles.map(file => (
                  <div
                    key={`${folder}/${file}`}
                    className={`file-item ${activeFile === `${folder}/${file}` ? 'active' : ''}`}
                    onClick={() => onFileSelect(`${folder}/${file}`)}
                  >
                    <span className="file-icon">{getFileIcon(file)}</span>
                    {file}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h3 className="file-explorer-title">Explorer</h3>
        <button className="btn-icon" onClick={handleNewFile} title="New File">
          ➕
        </button>
      </div>
      <div className="file-tree">
        {renderFileTree()}
      </div>
    </div>
  );
};

// Code Editor Component
const CodeEditor = ({ files, activeFile, onFileChange, onTabClose, highlightLine }) => {
  const [openTabs, setOpenTabs] = useState(['main.js']);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (activeFile && !openTabs.includes(activeFile)) {
      setOpenTabs(prev => [...prev, activeFile]);
    }
  }, [activeFile]);

  const closeTab = (fileName) => {
    const newTabs = openTabs.filter(tab => tab !== fileName);
    setOpenTabs(newTabs);
    if (fileName === activeFile && newTabs.length > 0) {
      onTabClose(newTabs[newTabs.length - 1]);
    }
  };

  const getLineNumbers = (content) => {
    const lines = content.split('\n');
    return lines.map((_, index) => {
      const lineNum = index + 1;
      const isHighlighted = highlightLine === lineNum;
      return `<div style="${isHighlighted ? 'background-color: var(--color-primary); color: var(--color-btn-primary-text); font-weight: bold;' : ''}">${lineNum}</div>`;
    }).join('');
  };

  const currentContent = files[activeFile] || '';

  // Scroll to highlighted line
  useEffect(() => {
    if (highlightLine && textareaRef.current) {
      const lineHeight = 24; // Approximate line height
      const scrollTop = (highlightLine - 1) * lineHeight;
      textareaRef.current.scrollTop = scrollTop;
    }
  }, [highlightLine]);

  return (
    <div className="editor">
      <div className="editor-tabs">
        {openTabs.map(tab => (
          <div
            key={tab}
            className={`editor-tab ${tab === activeFile ? 'active' : ''}`}
            onClick={() => onTabClose(tab)}
          >
            <span>{tab.split('/').pop()}</span>
            <span
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab);
              }}
            >
              ✕
            </span>
          </div>
        ))}
      </div>
      <div className="editor-content">
        <div 
          className="line-numbers"
          dangerouslySetInnerHTML={{ 
            __html: getLineNumbers(currentContent) 
          }}
        />
        <textarea
          ref={textareaRef}
          className="code-editor"
          value={currentContent}
          onChange={(e) => onFileChange(activeFile, e.target.value)}
          placeholder="Start coding..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};

// Simple JavaScript Execution Engine
class JSExecutor {
  constructor() {
    this.reset();
  }

  reset() {
    this.output = [];
    this.steps = [];
    this.currentStep = 0;
    this.variables = {};
    this.callStack = [];
  }

  log(...args) {
    this.output.push({ type: 'log', content: args.join(' '), timestamp: Date.now() });
  }

  addStep(line, action, variables = {}, callStack = []) {
    this.steps.push({
      line,
      action,
      variables: { ...variables },
      callStack: [...callStack],
      timestamp: Date.now()
    });
  }

  executeREPL(command) {
    try {
      // Create a function that returns the result
      const func = new Function(`return (${command})`);
      const result = func();
      return { success: true, result };
    } catch (error) {
      try {
        // If that fails, try executing as a statement
        const func = new Function(command);
        func();
        return { success: true, result: 'undefined' };
      } catch (error2) {
        return { success: false, error: error2.message };
      }
    }
  }

  execute(code) {
    this.reset();
    
    try {
      // Create a sandboxed execution environment
      const sandboxedConsole = {
        log: (...args) => this.log(...args)
      };

      // Simple code analysis for visualization
      this.analyzeCode(code);

      // Execute the code with sandboxed console
      const func = new Function('console', code);
      func(sandboxedConsole);
      
    } catch (error) {
      this.output.push({ 
        type: 'error', 
        content: `Error: ${error.message}`, 
        timestamp: Date.now() 
      });
    }

    return {
      output: this.output,
      steps: this.steps,
      visualization: this.generateVisualization(code)
    };
  }

  analyzeCode(code) {
    const lines = code.split('\n');
    let lineNumber = 0;
    let currentVars = {};
    let currentStack = [];

    lines.forEach((line, index) => {
      lineNumber = index + 1;
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('function ')) {
        const functionName = trimmedLine.match(/function\s+(\w+)/)?.[1];
        if (functionName) {
          this.addStep(lineNumber, `Declare function ${functionName}`, currentVars, currentStack);
        }
      } else if (trimmedLine.includes('console.log')) {
        this.addStep(lineNumber, 'Console output', currentVars, currentStack);
      } else if (trimmedLine.includes('=') && !trimmedLine.startsWith('//')) {
        const varMatch = trimmedLine.match(/(?:let|const|var)?\s*(\w+)\s*=/);
        if (varMatch) {
          const varName = varMatch[1];
          currentVars[varName] = 'assigned';
          this.addStep(lineNumber, `Assign variable ${varName}`, currentVars, currentStack);
        }
      } else if (trimmedLine.includes('for ') || trimmedLine.includes('while ')) {
        this.addStep(lineNumber, 'Loop iteration', currentVars, currentStack);
      } else if (trimmedLine.includes('if ')) {
        this.addStep(lineNumber, 'Condition check', currentVars, currentStack);
      }
    });
  }

  generateVisualization(code) {
    const nodes = [];
    const links = [];
    const lines = code.split('\n');
    let nodeId = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('function ')) {
        const functionName = trimmedLine.match(/function\s+(\w+)/)?.[1];
        if (functionName) {
          nodes.push({
            id: nodeId++,
            type: 'function',
            label: functionName,
            line: index + 1
          });
        }
      } else if (trimmedLine.includes('=') && !trimmedLine.startsWith('//')) {
        const varMatch = trimmedLine.match(/(?:let|const|var)?\s*(\w+)\s*=/);
        if (varMatch) {
          const varName = varMatch[1];
          nodes.push({
            id: nodeId++,
            type: 'variable',
            label: varName,
            line: index + 1
          });
        }
      } else if (trimmedLine.includes('for ') || trimmedLine.includes('while ')) {
        nodes.push({
          id: nodeId++,
          type: 'loop',
          label: 'Loop',
          line: index + 1
        });
      } else if (trimmedLine.includes('if ')) {
        nodes.push({
          id: nodeId++,
          type: 'condition',
          label: 'Condition',
          line: index + 1
        });
      }
    });

    // Create simple sequential links
    for (let i = 0; i < nodes.length - 1; i++) {
      links.push({
        source: nodes[i].id,
        target: nodes[i + 1].id
      });
    }

    return { nodes, links };
  }
}

// Visualizer Component
const Visualizer = ({ visualization, onNodeClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!visualization || !visualization.nodes) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 280;
    const height = 400;

    const g = svg.append("g");

    // Create simulation
    const simulation = d3.forceSimulation(visualization.nodes)
      .force("link", d3.forceLink(visualization.links).id(d => d.id).distance(50))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = g.append("g")
      .selectAll("line")
      .data(visualization.links)
      .enter().append("line")
      .attr("class", "link");

    // Create nodes
    const node = g.append("g")
      .selectAll("g")
      .data(visualization.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add shapes based on node type
    node.append("circle")
      .attr("r", d => d.type === 'function' ? 20 : 15)
      .attr("class", d => `node-${d.type}`)
      .on("click", (event, d) => {
        if (onNodeClick) {
          onNodeClick(d);
        }
      });

    // Add labels
    node.append("text")
      .attr("class", "node-text")
      .text(d => d.label.length > 8 ? d.label.substring(0, 8) + '...' : d.label)
      .attr("dy", "0.35em");

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [visualization]);

  return (
    <div className="visualizer">
      <div className="visualizer-header">
        <h3 className="visualizer-title">Code Visualizer</h3>
      </div>
      <div className="visualizer-content">
        <svg
          ref={svgRef}
          className="visualization-svg"
          width="100%"
          height="100%"
          viewBox="0 0 280 400"
        />
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
            <span>Function</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#2196F3' }}></div>
            <span>Variable</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FF9800' }}></div>
            <span>Loop</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#9C27B0' }}></div>
            <span>Condition</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tracer Component
const Tracer = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="tracer">
      <div className="tracer-header">
        <h3 className="tracer-title">Step Tracer</h3>
        <div className="tracer-controls">
          <button
            className="btn-icon"
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep <= 0}
            title="Previous Step"
          >
            ⏮
          </button>
          <button
            className="btn-icon"
            onClick={() => onStepChange(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep >= steps.length - 1}
            title="Next Step"
          >
            ⏭
          </button>
        </div>
      </div>
      <div className="tracer-content">
        {steps.length === 0 ? (
          <div style={{ padding: 'var(--space-16)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Run code to see execution steps
          </div>
        ) : (
          steps.map((step, index) => (
            <div
              key={index}
              className={`tracer-step ${index === currentStep ? 'current' : ''}`}
              onClick={() => onStepChange(index)}
            >
              <div className="step-info">
                <span className="step-line">Line {step.line}:</span> {step.action}
              </div>
              {Object.keys(step.variables).length > 0 && (
                <div className="variables">
                  Variables: {JSON.stringify(step.variables)}
                </div>
              )}
              {step.callStack.length > 0 && (
                <div className="call-stack">
                  Call Stack: {step.callStack.join(' → ')}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Console Component
const Console = ({ output, onCommand }) => {
  const [command, setCommand] = useState('');
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command.trim());
      setCommand('');
    }
  };

  const clearConsole = () => {
    // Trigger clear through parent component
    onCommand('__CLEAR__');
  };

  return (
    <div className="console">
      <div className="console-header">
        <h3 className="console-title">Console</h3>
        <button className="btn-icon" onClick={clearConsole} title="Clear Console">
          🗑️
        </button>
      </div>
      <div className="console-output" ref={outputRef}>
        {output.length === 0 ? (
          <div style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
            Console output will appear here...
          </div>
        ) : (
          output.map((entry, index) => (
            <div key={index} className={`console-line ${entry.type}`}>
              <span style={{ opacity: 0.7 }}>
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
              {' > '}
              <span dangerouslySetInnerHTML={{ __html: entry.content.replace(/\n/g, '<br>') }} />
            </div>
          ))
        )}
      </div>
      <form className="console-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter JavaScript command..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};

// Main IDE Component
const IDE = () => {
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState('main.js');
  const [output, setOutput] = useState([]);
  const [executionData, setExecutionData] = useState({ steps: [], visualization: null });
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [highlightLine, setHighlightLine] = useState(null);

  const executor = useRef(new JSExecutor());

  const handleFileSelect = (fileName) => {
    setActiveFile(fileName);
  };

  const handleFileChange = (fileName, content) => {
    setFiles(prev => ({
      ...prev,
      [fileName]: content
    }));
  };

  const handleTabClose = (fileName) => {
    setActiveFile(fileName);
  };

  const handleNewFile = (fileName) => {
    const extension = fileName.split('.').pop();
    let template = '';
    
    switch (extension) {
      case 'js':
        template = '// New JavaScript file\nconsole.log("Hello, World!");';
        break;
      case 'html':
        template = '<!DOCTYPE html>\n<html>\n<head>\n    <title>New Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>';
        break;
      case 'css':
        template = '/* New CSS file */\nbody {\n    margin: 0;\n    padding: 0;\n}';
        break;
      default:
        template = `// New ${extension} file`;
    }
    
    setFiles(prev => ({
      ...prev,
      [fileName]: template
    }));
    setActiveFile(fileName);
  };

  const handleRunCode = () => {
    if (!activeFile || !files[activeFile]) return;
    
    setIsRunning(true);
    const result = executor.current.execute(files[activeFile]);
    
    setOutput(result.output);
    setExecutionData({
      steps: result.steps,
      visualization: result.visualization
    });
    setCurrentStep(0);
    setIsRunning(false);
  };

  const handleFormatCode = () => {
    if (!activeFile || !files[activeFile]) return;
    
    const code = files[activeFile];
    let indentLevel = 0;
    const indentSize = 4;
    
    const formatted = code
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        
        // Decrease indent for closing braces
        if (trimmed.startsWith('}')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        const formattedLine = ' '.repeat(indentLevel * indentSize) + trimmed;
        
        // Increase indent for opening braces and control structures
        if (trimmed.endsWith('{') || 
            trimmed.startsWith('if ') || 
            trimmed.startsWith('for ') || 
            trimmed.startsWith('while ') ||
            trimmed.startsWith('function ')) {
          indentLevel++;
        }
        
        return formattedLine;
      })
      .join('\n');
    
    handleFileChange(activeFile, formatted);
  };

  const handleConsoleCommand = (command) => {
    if (command === '__CLEAR__') {
      setOutput([]);
      return;
    }
    
    // Add the command to output first
    setOutput(prev => [...prev, {
      type: 'log',
      content: `> ${command}`,
      timestamp: Date.now()
    }]);
    
    const result = executor.current.executeREPL(command);
    
    if (result.success) {
      setOutput(prev => [...prev, {
        type: 'log',
        content: `< ${result.result}`,
        timestamp: Date.now()
      }]);
    } else {
      setOutput(prev => [...prev, {
        type: 'error',
        content: `< Error: ${result.error}`,
        timestamp: Date.now()
      }]);
    }
  };

  const handleNodeClick = (node) => {
    // Jump to the line in the editor when a visualization node is clicked
    setHighlightLine(node.line);
    setTimeout(() => setHighlightLine(null), 3000); // Clear highlight after 3 seconds
  };

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
    if (executionData.steps[stepIndex]) {
      const step = executionData.steps[stepIndex];
      setHighlightLine(step.line);
      setTimeout(() => setHighlightLine(null), 2000);
    }
  };

  return (
    <div className="ide-container">
      <div className="toolbar">
        <h1>React IDE</h1>
        <div className="toolbar-buttons">
          <button className="btn btn--primary" onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? '⏳ Running...' : '▶️ Run Code'}
          </button>
          <button className="btn btn--secondary" onClick={handleFormatCode}>
            ✨ Format
          </button>
          <button className="btn btn--outline" onClick={() => setShowSettings(true)}>
            ⚙️ Settings
          </button>
        </div>
      </div>

      <FileExplorer
        files={files}
        activeFile={activeFile}
        onFileSelect={handleFileSelect}
        onNewFile={handleNewFile}
      />

      <CodeEditor
        files={files}
        activeFile={activeFile}
        onFileChange={handleFileChange}
        onTabClose={handleTabClose}
        highlightLine={highlightLine}
      />

      <Console
        output={output}
        onCommand={handleConsoleCommand}
      />

      <Visualizer
        visualization={executionData.visualization}
        onNodeClick={handleNodeClick}
      />

      <Tracer
        steps={executionData.steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

// Render the application
ReactDOM.render(<IDE />, document.getElementById('root'));