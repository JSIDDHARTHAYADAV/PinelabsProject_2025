import React, { useState } from 'react';
import { FileText, ExternalLink, Upload, Search } from 'lucide-react';

interface DocumentationViewerProps {
  onDocumentUpload: (file: File) => void;
}

export const DocumentationViewer: React.FC<DocumentationViewerProps> = ({ onDocumentUpload }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const predefinedDocs = [
    {
      title: 'Pine Labs API Documentation',
      url: 'https://github.com/prnvshlk7777/pl_online_hackathon_2025',
      description: 'Complete API reference and integration guide'
    },
    {
      title: 'Error Codes Reference',
      url: 'https://developer.pluralonline.com/docs/developer-tools-error-codes#error-structure',
      description: 'Comprehensive error handling documentation'
    },
    {
      title: 'Historical Support Tickets',
      url: 'https://github.com/prnvshlk7777/pl_online_hackathon_2025',
      description: 'Common integration issues and solutions'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDocumentUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h3>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search documentation..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Upload Section */}
      <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.txt,.md,.json"
          className="hidden"
          id="doc-upload"
        />
        <label
          htmlFor="doc-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">Upload API Documentation</p>
          <p className="text-xs text-gray-500">PDF, TXT, MD, JSON files supported</p>
        </label>
      </div>

      {/* Predefined Documentation */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Official Documentation</h4>
        {predefinedDocs.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                <p className="text-xs text-gray-600">{doc.description}</p>
              </div>
            </div>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-green-600"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Quick Access Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
          <h5 className="text-sm font-medium text-green-700">API Endpoints</h5>
          <p className="text-xs text-green-600">View all available endpoints</p>
        </button>
        <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
          <h5 className="text-sm font-medium text-blue-700">Code Examples</h5>
          <p className="text-xs text-blue-600">Ready-to-use code snippets</p>
        </button>
      </div>
    </div>
  );
};