import React from 'react';
import { TrendingUp, TrendingDown, Home, DollarSign, Percent, Users } from 'lucide-react';

export const PortfolioSnapshot: React.FC = () => {
  const metrics = [
    { label: 'Total Value', value: '$2.4M', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'Properties', value: '12', change: '+2', trend: 'up', icon: Home },
    { label: 'Occupancy', value: '94%', change: '-2%', trend: 'down', icon: Percent },
    { label: 'Active Tenants', value: '28', change: '+3', trend: 'up', icon: Users },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        const trendColor = metric.trend === 'up' ? 'text-[#6DD47E]' : 'text-[#FF6B7A]';
        
        return (
          <div key={idx} className="bg-[#E8EAF6] rounded-2xl p-4 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF] hover:shadow-[10px_10px_20px_#C8CADE,-10px_-10px_20px_#FFFFFF] transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-xl bg-[#E8EAF6] shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF]">
                <Icon size={18} className="text-[#FF8B65]" />
              </div>
              <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                <TrendIcon size={12} />
                <span>{metric.change}</span>
              </div>
            </div>
            <p className="text-xs text-[#B4BBCC] mb-1">{metric.label}</p>
            <p className="text-2xl text-[#3E4C5E]">{metric.value}</p>
          </div>
        );
      })}
    </div>
  );
};
