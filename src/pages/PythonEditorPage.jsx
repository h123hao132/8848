import React from 'react';
import PythonEditor from '../components/PythonEditor';

const PythonEditorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Python Code Editor</h1>
      <PythonEditor />
    </div>
  );
};

export default PythonEditorPage;