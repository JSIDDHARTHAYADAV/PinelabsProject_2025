import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { QuickStats } from './components/QuickStats';
import { MetricCard } from './components/MetricCard';
import { PaymentChart } from './components/PaymentChart';
import { ROIChart } from './components/ROIChart';
import { RevenueChart } from './components/RevenueChart';
import { BusinessImprovementChart } from './components/BusinessImprovementChart';
import { ChatBot } from './components/ChatBot';
import { ChatBotTrigger } from './components/ChatBotTrigger';
import { IntegrationWorkflow } from './components/IntegrationWorkflow';
import { DocumentationViewer } from './components/DocumentationViewer';
import { mockData } from './data/mockData';
import { calculateMetrics, formatCurrency } from './utils/calculations';

function App() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'integration'>('dashboard');
  
  const metrics = calculateMetrics(mockData);
  const totalLostRevenue = (metrics.totalFailed + metrics.totalCancelled) * 850;

  const handleChatBotQuestion = (question: string) => {
    setIsChatBotOpen(true);
    // The question would be automatically sent to the chatbot
  };

  const handleDocumentUpload = (file: File) => {
    console.log('Document uploaded:', file.name);
    // Handle document processing
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'dashboard'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Analytics Dashboard
          </button>
          <button
            onClick={() => setActiveView('integration')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'integration'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Integration Workflow
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' ? (
          <>
            {/* Quick Stats Banner */}
            <div className="mb-8">
              <QuickStats data={mockData} />
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Today's Revenue"
                value={formatCurrency(metrics.totalRevenue)}
                change={metrics.revenueChange}
                trend={metrics.revenueChange >= 0 ? 'up' : 'down'}
              />
              
              <MetricCard
                title="Successful Payments"
                value={metrics.totalSuccessful}
                change={metrics.successfulChange}
                trend={metrics.successfulChange >= 0 ? 'up' : 'down'}
              />
              
              <MetricCard
                title="Lost Revenue"
                value={formatCurrency(totalLostRevenue)}
                change={metrics.failedChange}
                trend={metrics.failedChange <= 0 ? 'up' : 'down'}
              />
              
              <MetricCard
                title="Success Rate"
                value={`${metrics.successRate.toFixed(1)}%`}
                change={metrics.successfulChange - metrics.failedChange}
                trend={metrics.successfulChange > metrics.failedChange ? 'up' : 'down'}
              />
            </div>

            {/* Charts Section */}
            <div className="space-y-8">
              {/* Payment Trends */}
              <PaymentChart data={mockData} />
              
              {/* Revenue Analysis */}
              <RevenueChart data={mockData} />
              
              {/* ROI Comparison */}
              <ROIChart data={mockData} />
              
              {/* Business Improvement */}
              <BusinessImprovementChart data={mockData} />
            </div>

            {/* Additional Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Payment Method ROI</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Online Payments</span>
                    <span className="font-medium text-blue-600">Higher ROI</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Cost</span>
                    <span className="font-medium text-green-600">2.1% lower</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transaction Speed</span>
                    <span className="font-medium text-green-600">3x faster</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Business Growth</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Growth</span>
                    <span className="font-medium text-green-600">+12.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customer Retention</span>
                    <span className="font-medium text-green-600">+8.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Transaction</span>
                    <span className="font-medium text-blue-600">₹850</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">Promote Digital Payments</p>
                    <p className="text-xs text-green-600">Offer incentives for online transactions</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">Reduce Failed Payments</p>
                    <p className="text-xs text-blue-600">Implement retry mechanisms</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Integration Workflow */}
            <IntegrationWorkflow onQuestionClick={handleChatBotQuestion} />
            
            {/* Documentation Viewer */}
            <DocumentationViewer onDocumentUpload={handleDocumentUpload} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p className="mt-1">Pine Labs Integration Dashboard - Real-time payment analytics</p>
        </footer>
      </main>

      {/* ChatBot */}
      <ChatBot 
        isOpen={isChatBotOpen} 
        onClose={() => setIsChatBotOpen(false)} 
      />
      
      {/* ChatBot Trigger */}
      {!isChatBotOpen && (
        <ChatBotTrigger onClick={() => setIsChatBotOpen(true)} />
      )}
    </div>
  );
}

export default App;