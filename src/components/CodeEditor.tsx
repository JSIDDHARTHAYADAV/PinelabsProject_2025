import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pine-labs-integration.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700">Generated Code</h4>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-white hover:bg-gray-100 border rounded"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-white hover:bg-gray-100 border rounded"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto">
        {code ? (
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            customStyle={{
              margin: 0,
              height: '100%',
              fontSize: '12px'
            }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <Code className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No code generated yet</p>
            <p className="text-xs">Ask the chatbot for code examples</p>
          </div>
        )}
      </div>

      {/* Code Editor (for editing) */}
      <div className="border-t border-gray-200 p-3">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Edit generated code here..."
          className="w-full h-24 p-2 text-xs font-mono border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};