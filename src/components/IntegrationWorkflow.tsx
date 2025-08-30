import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Circle, AlertCircle, Code, HelpCircle } from 'lucide-react';
import { PaymentFlow, IntegrationScenario } from '../types/chatbot';
import { offlinePaymentFlow, onlinePaymentFlow, integrationScenarios } from '../data/paymentFlows';

interface IntegrationWorkflowProps {
  onQuestionClick: (question: string) => void;
}

export const IntegrationWorkflow: React.FC<IntegrationWorkflowProps> = ({ onQuestionClick }) => {
  const [selectedFlow, setSelectedFlow] = useState<'offline' | 'online'>('offline');
  const [selectedScenario, setSelectedScenario] = useState<string>('cloth-shop');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentFlow = selectedFlow === 'offline' ? offlinePaymentFlow : onlinePaymentFlow;
  const currentScenario = integrationScenarios.find(s => s.id === selectedScenario);

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Integration Workflow</h3>
      
      {/* Scenario Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Scenario</label>
        <select
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {integrationScenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.title} - {scenario.businessType}
            </option>
          ))}
        </select>
        {currentScenario && (
          <p className="text-sm text-gray-600 mt-2">{currentScenario.description}</p>
        )}
      </div>

      {/* Flow Selection */}
      <div className="mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedFlow('offline')}
            className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
              selectedFlow === 'offline'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-medium">Offline Store Flow</h4>
            <p className="text-xs text-gray-600">POS Terminal Integration</p>
          </button>
          <button
            onClick={() => setSelectedFlow('online')}
            className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
              selectedFlow === 'online'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-medium">Online Store Flow</h4>
            <p className="text-xs text-gray-600">Payment Gateway Integration</p>
          </button>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {currentFlow.steps.map((step, index) => (
          <div key={step.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleStepCompletion(step.id)}
                className="mt-1"
              >
                {completedSteps.has(step.id) ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Step {index + 1}
                  </span>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                
                {step.apiEndpoint && (
                  <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                    <code className="text-blue-600">{step.apiEndpoint}</code>
                  </div>
                )}

                {/* Required Fields */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 mb-1">Required Fields:</p>
                  <div className="flex flex-wrap gap-1">
                    {step.requiredFields.map((field) => (
                      <span key={field} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 mb-1">Optional Fields:</p>
                  <div className="flex flex-wrap gap-1">
                    {step.optionalFields.map((field) => (
                      <span key={field} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Common Doubts */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">Common Questions:</p>
                  <div className="space-y-1">
                    {step.commonDoubts.map((doubt, doubtIndex) => (
                      <button
                        key={doubtIndex}
                        onClick={() => onQuestionClick(doubt)}
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-green-600 hover:bg-green-50 p-2 rounded w-full text-left"
                      >
                        <HelpCircle className="w-3 h-3" />
                        {doubt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onQuestionClick(`Show me code example for ${step.title}`)}
                    className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    <Code className="w-3 h-3" />
                    Get Code
                  </button>
                  <button
                    onClick={() => onQuestionClick(`Explain ${step.title} functionality`)}
                    className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Explain
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Integration Progress</span>
          <span className="text-sm text-gray-600">
            {completedSteps.size}/{currentFlow.steps.length} steps
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.size / currentFlow.steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};