import { PaymentData } from '../types/dashboard';

export const generateMockData = (): PaymentData[] => {
  const data: PaymentData[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseSuccessful = 150 + Math.random() * 100;
    const baseFailed = 10 + Math.random() * 20;
    const baseCancelled = 5 + Math.random() * 15;
    const cashPayments = 80 + Math.random() * 60;
    const onlinePayments = baseSuccessful - cashPayments;
    
    data.push({
      date: date.toISOString().split('T')[0],
      successful: Math.floor(baseSuccessful),
      failed: Math.floor(baseFailed),
      cancelled: Math.floor(baseCancelled),
      cashPayments: Math.floor(cashPayments),
      onlinePayments: Math.floor(onlinePayments),
      revenue: Math.floor((baseSuccessful * 850) + (Math.random() * 200)),
    });
  }
  
  return data;
};

export const mockData = generateMockData();