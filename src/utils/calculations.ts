import { PaymentData } from '../types/dashboard';

export const calculateMetrics = (data: PaymentData[]) => {
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];
  
  if (!latest || !previous) {
    return {
      totalRevenue: 0,
      totalSuccessful: 0,
      totalFailed: 0,
      totalCancelled: 0,
      revenueChange: 0,
      successfulChange: 0,
      failedChange: 0,
      cancelledChange: 0,
      digitalAdoptionRate: 0,
      successRate: 0
    };
  }

  const totalRevenue = latest.revenue;
  const totalSuccessful = latest.successful;
  const totalFailed = latest.failed;
  const totalCancelled = latest.cancelled;
  
  const revenueChange = previous.revenue > 0 
    ? ((latest.revenue - previous.revenue) / previous.revenue) * 100 
    : 0;
    
  const successfulChange = previous.successful > 0 
    ? ((latest.successful - previous.successful) / previous.successful) * 100 
    : 0;
    
  const failedChange = previous.failed > 0 
    ? ((latest.failed - previous.failed) / previous.failed) * 100 
    : 0;
    
  const cancelledChange = previous.cancelled > 0 
    ? ((latest.cancelled - previous.cancelled) / previous.cancelled) * 100 
    : 0;

  const digitalAdoptionRate = (latest.onlinePayments / (latest.onlinePayments + latest.cashPayments)) * 100;
  const successRate = (latest.successful / (latest.successful + latest.failed + latest.cancelled)) * 100;

  return {
    totalRevenue,
    totalSuccessful,
    totalFailed,
    totalCancelled,
    revenueChange,
    successfulChange,
    failedChange,
    cancelledChange,
    digitalAdoptionRate,
    successRate
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};