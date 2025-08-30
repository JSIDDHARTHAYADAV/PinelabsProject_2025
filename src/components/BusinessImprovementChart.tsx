import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart
} from 'recharts';
import { PaymentData } from '../types/dashboard';

interface BusinessImprovementChartProps {
  data: PaymentData[];
}

export const BusinessImprovementChart: React.FC<BusinessImprovementChartProps> = ({ data }) => {
  const improvementData = data.map((item, index) => {
    const previousWeekRevenue = index >= 7 ? data[index - 7].revenue : item.revenue;
    const growthRate = previousWeekRevenue > 0 
      ? ((item.revenue - previousWeekRevenue) / previousWeekRevenue) * 100 
      : 0;
    
    const digitalAdoption = (item.onlinePayments / (item.onlinePayments + item.cashPayments)) * 100;
    const successRate = (item.successful / (item.successful + item.failed + item.cancelled)) * 100;

    return {
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      growth: Number(growthRate.toFixed(1)),
      digitalAdoption: Number(digitalAdoption.toFixed(1)),
      successRate: Number(successRate.toFixed(1)),
      efficiency: Number(((item.successful / (item.successful + item.failed)) * 100).toFixed(1))
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Improvement Metrics</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={improvementData}>
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
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Bar 
            dataKey="digitalAdoption" 
            fill="#3b82f6" 
            fillOpacity={0.6}
            name="Digital Adoption"
            radius={[2, 2, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            name="Success Rate"
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            name="Payment Efficiency"
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Digital Adoption</p>
          <p className="text-lg font-bold text-blue-700">
            {improvementData[improvementData.length - 1]?.digitalAdoption}%
          </p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Success Rate</p>
          <p className="text-lg font-bold text-green-700">
            {improvementData[improvementData.length - 1]?.successRate}%
          </p>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-600 font-medium">Efficiency</p>
          <p className="text-lg font-bold text-amber-700">
            {improvementData[improvementData.length - 1]?.efficiency}%
          </p>
        </div>
      </div>
    </div>
  );
};