import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, FileText, Code, MessageCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage, APIDocumentation } from '../types/chatbot';
import { CodeEditor } from './CodeEditor';
import { apiKnowledgeBase } from '../data/apiKnowledge';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Pine Labs API integration assistant. I can help you understand API documentation, generate code snippets, and guide you through payment integration flows. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat');
  const [generatedCode, setGeneratedCode] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<APIDocumentation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response with API knowledge
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase();
    
    // Check for common questions
    const matchedQuestion = apiKnowledgeBase.commonQuestions.find(q => 
      input.includes(q.question.toLowerCase().split(' ').slice(0, 3).join(' '))
    );

    if (matchedQuestion) {
      setGeneratedCode(matchedQuestion.code);
      setActiveTab('code');
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: matchedQuestion.answer,
        timestamp: new Date(),
        codeSnippet: matchedQuestion.code,
        language: 'javascript'
      };
    }

    // Handle specific integration scenarios
    if (input.includes('cloth shop') || input.includes('retail')) {
      const code = `// Complete cloth shop integration setup
const setupClothShopIntegration = async () => {
  // 1. Initialize Pine Labs SDK
  const pineLabs = new PineLabsSDK({
    apiKey: 'YOUR_API_KEY',
    environment: 'sandbox' // or 'production'
  });

  // 2. Create store profile
  const store = await pineLabs.stores.create({
    name: 'Fashion Hub',
    type: 'RETAIL',
    address: '123 Shopping Street, Mumbai',
    contactEmail: 'store@fashionhub.com'
  });

  // 3. Configure POS terminals
  const terminal = await pineLabs.terminals.register({
    storeId: store.id,
    terminalType: 'CARD_READER',
    location: 'COUNTER_1'
  });

  return { store, terminal };
};`;
      
      setGeneratedCode(code);
      setActiveTab('code');
      
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'For a cloth shop integration, you\'ll need to set up both offline POS and online payment flows. I\'ve generated the initial setup code that includes store registration, terminal configuration, and basic payment processing. This covers customer profile creation, inventory management, and payment processing for both in-store and online purchases.',
        timestamp: new Date(),
        codeSnippet: code,
        language: 'javascript'
      };
    }

    if (input.includes('payment failure') || input.includes('error handling')) {
      const code = `// Handle payment failures and errors
const handlePaymentError = (errorResponse) => {
  switch (errorResponse.errorCode) {
    case 'INSUFFICIENT_FUNDS':
      return {
        message: 'Insufficient funds in account',
        action: 'RETRY_WITH_DIFFERENT_CARD',
        userMessage: 'Please try with a different payment method'
      };
    
    case 'CARD_DECLINED':
      return {
        message: 'Card declined by bank',
        action: 'CONTACT_BANK',
        userMessage: 'Please contact your bank or try another card'
      };
    
    case 'NETWORK_ERROR':
      return {
        message: 'Network connectivity issue',
        action: 'RETRY_PAYMENT',
        userMessage: 'Please check your connection and try again'
      };
    
    default:
      return {
        message: 'Unknown payment error',
        action: 'CONTACT_SUPPORT',
        userMessage: 'Please contact customer support'
      };
  }
};`;

      setGeneratedCode(code);
      setActiveTab('code');
      
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Payment failure handling is crucial for a good user experience. I\'ve provided error handling code that covers common failure scenarios like insufficient funds, card declines, and network issues. Each error type has specific retry logic and user-friendly messages.',
        timestamp: new Date(),
        codeSnippet: code,
        language: 'javascript'
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: 'I can help you with Pine Labs API integration. Try asking about specific topics like "customer profile creation", "payment flows", "error handling", or "cloth shop integration". You can also upload API documentation for more specific guidance.',
      timestamp: new Date()
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newDoc: APIDocumentation = {
          id: Date.now().toString(),
          title: file.name,
          content,
          uploadedAt: new Date()
        };
        setUploadedDocs(prev => [...prev, newDoc]);
        
        // Add confirmation message
        const confirmMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'bot',
          content: `I've successfully uploaded and analyzed "${file.name}". You can now ask me questions about this documentation, and I'll provide specific guidance and code examples based on its content.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, confirmMessage]);
      };
      reader.readAsText(file);
    }
  };

  const quickQuestions = [
    'How do I create a customer profile?',
    'What are the payment methods supported?',
    'How to handle payment failures?',
    'Show me cloth shop integration example',
    'How to set up webhooks?',
    'What are the authentication requirements?'
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 ${
      isExpanded ? 'w-[95vw] h-[90vh]' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-blue-600 rounded-t-xl">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-semibold text-white">Pine Labs API Assistant</h3>
            <p className="text-xs text-green-100">Integration Helper</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white/20 rounded text-white"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'chat' 
              ? 'text-green-600 border-b-2 border-green-600 bg-green-50' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Chat & Functionality
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === 'code' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          Code Editor
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.codeSnippet && (
                      <button
                        onClick={() => {
                          setGeneratedCode(message.codeSnippet!);
                          setActiveTab('code');
                        }}
                        className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
                      >
                        View Code
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs bg-white hover:bg-gray-100 px-2 py-1 rounded border text-gray-700"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.md,.json,.pdf"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  title="Upload Documentation"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about API integration..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <CodeEditor code={generatedCode} onChange={setGeneratedCode} />
        )}
      </div>

      {/* Uploaded Documents */}
      {uploadedDocs.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 mb-2">Uploaded Documents:</p>
          <div className="space-y-1">
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 text-xs">
                <FileText className="w-3 h-3 text-gray-500" />
                <span className="text-gray-700">{doc.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};