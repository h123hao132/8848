import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const PythonEditor = () => {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (value) => {
    setCode(value || '');
  };

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('http://localhost:3001/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      setError('Error connecting to execution server');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Python Code Editor</h2>
        <button
          onClick={executeCode}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      
      <div className="h-96 mb-4">
        <Editor
          height="100%"
          language="python"
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Output:</h3>
        <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm h-48 overflow-auto">
          {error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <div>{output || 'No output yet'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PythonEditor;