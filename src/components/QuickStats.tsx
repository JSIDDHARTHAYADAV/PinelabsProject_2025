import React from 'react';
import { PaymentData } from '../types/dashboard';

interface QuickStatsProps {
  data: PaymentData[];
}

export const QuickStats: React.FC<QuickStatsProps> = ({ data }) => {
  const today = data[data.length - 1];
  const yesterday = data[data.length - 2];
  
  const todayRevenue = today?.revenue || 0;
  const yesterdayRevenue = yesterday?.revenue || 0;
  const revenueChange = yesterdayRevenue > 0 
    ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
    : 0;

  const todaySuccessful = today?.successful || 0;
  const yesterdaySuccessful = yesterday?.successful || 0;
  const successfulChange = yesterdaySuccessful > 0 
    ? ((todaySuccessful - yesterdaySuccessful) / yesterdaySuccessful) * 100 
    : 0;

  const todayFailed = today?.failed || 0;
  const yesterdayFailed = yesterday?.failed || 0;
  const failedChange = yesterdayFailed > 0 
    ? ((todayFailed - yesterdayFailed) / yesterdayFailed) * 100 
    : 0;

  const totalLost = (today?.failed + today?.cancelled) * 850; // Assuming avg transaction value
  const digitalAdoption = today ? (today.onlinePayments / (today.onlinePayments + today.cashPayments)) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Today's Performance</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold">₹{todayRevenue.toLocaleString()}</p>
          <p className="text-green-100 text-sm">Total Revenue</p>
          <p className={`text-xs ${revenueChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(1)}% vs yesterday
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold">{todaySuccessful}</p>
          <p className="text-green-100 text-sm">Successful Payments</p>
          <p className={`text-xs ${successfulChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {successfulChange >= 0 ? '+' : ''}{successfulChange.toFixed(1)}% vs yesterday
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold">₹{totalLost.toLocaleString()}</p>
          <p className="text-red-100 text-sm">Lost Revenue</p>
          <p className="text-xs text-red-200">{today?.failed + today?.cancelled} failed transactions</p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold">{digitalAdoption.toFixed(1)}%</p>
          <p className="text-blue-100 text-sm">Digital Adoption</p>
          <p className="text-xs text-blue-200">Online vs Cash ratio</p>
        </div>
      </div>
    </div>
  );
};