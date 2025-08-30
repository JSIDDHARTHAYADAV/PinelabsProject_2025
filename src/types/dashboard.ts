export interface PaymentData {
  date: string;
  successful: number;
  failed: number;
  cancelled: number;
  cashPayments: number;
  onlinePayments: number;
  revenue: number;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  change?: number;
}