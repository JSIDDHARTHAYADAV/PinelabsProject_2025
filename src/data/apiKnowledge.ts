export const apiKnowledgeBase = {
  endpoints: {
    '/api/v1/customers': {
      method: 'POST',
      description: 'Create customer profile',
      requiredFields: ['name', 'email', 'phone'],
      optionalFields: ['address', 'metadata'],
      sampleRequest: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91-9876543210',
        address: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      sampleResponse: {
        customerId: 'CUST_001',
        status: 'created',
        message: 'Customer profile created successfully'
      }
    },
    '/api/v1/orders': {
      method: 'POST',
      description: 'Create order with items',
      requiredFields: ['customerId', 'items', 'totalAmount'],
      optionalFields: ['discounts', 'taxes'],
      sampleRequest: {
        customerId: 'CUST_001',
        items: [
          {
            productId: 'PROD_001',
            name: 'Cotton T-Shirt',
            quantity: 2,
            price: 599
          }
        ],
        totalAmount: 1198,
        currency: 'INR'
      }
    },
    '/api/v1/payments/initiate': {
      method: 'POST',
      description: 'Initiate payment process',
      requiredFields: ['orderId', 'amount'],
      optionalFields: ['paymentMethod', 'metadata'],
      sampleRequest: {
        orderId: 'ORD_001',
        amount: 1198,
        currency: 'INR',
        paymentMethod: 'CARD'
      }
    }
  },
  
  commonQuestions: [
    {
      question: 'How do I create a customer profile?',
      answer: 'Use the /api/v1/customers endpoint with POST method. Required fields are name, email, and phone.',
      code: `const customer = await createCustomer({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91-9876543210'
});`
    },
    {
      question: 'What payment methods are supported?',
      answer: 'Pine Labs supports CARD, UPI, WALLET, and CASH payment methods.',
      code: `const paymentMethods = ['CARD', 'UPI', 'WALLET', 'CASH'];`
    },
    {
      question: 'How to handle payment failures?',
      answer: 'Check the error codes in the response and implement retry logic based on the error type.',
      code: `if (response.status === 'FAILED') {
  console.log('Error:', response.errorCode);
  // Implement retry logic
}`
    }
  ]
};