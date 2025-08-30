import { PaymentFlow, IntegrationScenario } from '../types/chatbot';

export const offlinePaymentFlow: PaymentFlow = {
  id: 'offline-flow',
  name: 'Offline Store Payment Flow',
  type: 'offline',
  steps: [
    {
      id: 'profile-creation-offline',
      title: 'Customer Profile Creation',
      description: 'Create customer profile for POS transactions',
      apiEndpoint: '/api/v1/customers',
      requiredFields: ['name', 'phone', 'email'],
      optionalFields: ['address', 'loyaltyId', 'preferences'],
      commonDoubts: [
        'What are mandatory vs optional fields for creating a client profile?',
        'How to handle KYC or address verification fields?',
        'Are there field size/format restrictions?'
      ],
      sampleCode: `// Create customer profile for offline store
const createCustomerProfile = async (customerData) => {
  const response = await fetch('/api/v1/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      name: customerData.name,
      phone: customerData.phone,
      email: customerData.email,
      address: customerData.address,
      storeId: 'STORE_001'
    })
  });
  return response.json();
};`
    },
    {
      id: 'order-creation-offline',
      title: 'Order Creation',
      description: 'Create order with items and pricing for POS',
      apiEndpoint: '/api/v1/orders',
      requiredFields: ['customerId', 'items', 'totalAmount'],
      optionalFields: ['discounts', 'taxes', 'metadata'],
      commonDoubts: [
        'How are discounts, taxes, and shipping handled?',
        'What currency and locale formats are supported?',
        'How is order status managed initially?'
      ],
      sampleCode: `// Create order for offline transaction
const createOrder = async (orderData) => {
  const response = await fetch('/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      customerId: orderData.customerId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      currency: 'INR',
      storeId: 'STORE_001',
      posTerminalId: 'POS_001'
    })
  });
  return response.json();
};`
    },
    {
      id: 'payment-initiation-pos',
      title: 'Payment Initiation at POS',
      description: 'Initialize payment on POS terminal',
      apiEndpoint: '/api/v1/payments/initiate',
      requiredFields: ['orderId', 'amount', 'terminalId'],
      optionalFields: ['paymentMethod', 'timeout'],
      commonDoubts: [
        'How to link payment request with an order?',
        'What are required fields for initiating payment?',
        'Timeout and retry policy in payment requests?'
      ],
      sampleCode: `// Initiate payment on POS terminal
const initiatePayment = async (paymentData) => {
  const response = await fetch('/api/v1/payments/initiate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      terminalId: paymentData.terminalId,
      paymentMethod: 'CARD',
      timeout: 300
    })
  });
  return response.json();
};`
    }
  ]
};

export const onlinePaymentFlow: PaymentFlow = {
  id: 'online-flow',
  name: 'Online Store Payment Flow',
  type: 'online',
  steps: [
    {
      id: 'profile-creation-online',
      title: 'Customer Profile Creation',
      description: 'Create customer profile for online transactions',
      apiEndpoint: '/api/v1/customers',
      requiredFields: ['name', 'email', 'phone'],
      optionalFields: ['address', 'preferences', 'loyaltyId'],
      commonDoubts: [
        'What are mandatory vs optional fields?',
        'How to handle address verification?',
        'Email validation requirements?'
      ],
      sampleCode: `// Create customer profile for online store
const createOnlineCustomer = async (customerData) => {
  const response = await fetch('/api/v1/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      channel: 'ONLINE'
    })
  });
  return response.json();
};`
    },
    {
      id: 'payment-gateway-integration',
      title: 'Payment Gateway Integration',
      description: 'Integrate online payment gateway',
      apiEndpoint: '/api/v1/payments/gateway',
      requiredFields: ['orderId', 'amount', 'returnUrl'],
      optionalFields: ['webhookUrl', 'metadata'],
      commonDoubts: [
        'How to handle 3D Secure authentication?',
        'Webhook vs redirect flow differences?',
        'How to handle payment timeouts?'
      ],
      sampleCode: `// Initialize online payment gateway
const initializePaymentGateway = async (paymentData) => {
  const response = await fetch('/api/v1/payments/gateway', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      currency: 'INR',
      returnUrl: paymentData.returnUrl,
      webhookUrl: paymentData.webhookUrl,
      paymentMethods: ['CARD', 'UPI', 'WALLET']
    })
  });
  return response.json();
};`
    }
  ]
};

export const integrationScenarios: IntegrationScenario[] = [
  {
    id: 'cloth-shop',
    title: 'Cloth Shop Integration',
    description: 'Complete payment integration for a clothing retail store',
    businessType: 'Retail',
    flow: 'both',
    steps: [
      'Set up store profile and POS terminals',
      'Configure product catalog with pricing',
      'Implement customer registration flow',
      'Set up offline POS payment processing',
      'Configure online payment gateway',
      'Implement inventory management',
      'Set up reporting and analytics'
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant Integration',
    description: 'Payment processing for dine-in and online orders',
    businessType: 'Food & Beverage',
    flow: 'both',
    steps: [
      'Configure table management system',
      'Set up menu and pricing integration',
      'Implement order management flow',
      'Configure split payment options',
      'Set up tip handling',
      'Implement receipt printing',
      'Configure delivery payment flow'
    ]
  }
];