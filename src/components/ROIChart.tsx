import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { PaymentData } from '../types/dashboard';

interface ROIChartProps {
  data: PaymentData[];
}

export const ROIChart: React.FC<ROIChartProps> = ({ data }) => {
  const totalCash = data.reduce((sum, item) => sum + item.cashPayments, 0);
  const totalOnline = data.reduce((sum, item) => sum + item.onlinePayments, 0);

  const pieData = [
    { name: 'Online Payments', value: totalOnline, color: '#3b82f6' },
    { name: 'Cash Payments', value: totalCash, color: '#10b981' }
  ];

  const weeklyData = data.slice(-7).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    online: item.onlinePayments,
    cash: item.cashPayments,
    roi: ((item.onlinePayments / (item.onlinePayments + item.cashPayments)) * 100).toFixed(1)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Transactions']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Online adoption: {((totalOnline / (totalOnline + totalCash)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Payment Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="online" fill="#3b82f6" name="Online" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cash" fill="#10b981" name="Cash" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};