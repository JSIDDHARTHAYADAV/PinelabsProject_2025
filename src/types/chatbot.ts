export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  codeSnippet?: string;
  language?: string;
}

export interface APIDocumentation {
  id: string;
  title: string;
  content: string;
  url?: string;
  uploadedAt: Date;
}

export interface PaymentFlow {
  id: string;
  name: string;
  steps: PaymentStep[];
  type: 'offline' | 'online';
}

export interface PaymentStep {
  id: string;
  title: string;
  description: string;
  apiEndpoint?: string;
  requiredFields: string[];
  optionalFields: string[];
  commonDoubts: string[];
  sampleCode?: string;
}

export interface IntegrationScenario {
  id: string;
  title: string;
  description: string;
  businessType: string;
  flow: 'offline' | 'online' | 'both';
  steps: string[];
}