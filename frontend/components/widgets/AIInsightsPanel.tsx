import React from 'react';
import { Sparkles, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';

export const AIInsightsPanel: React.FC = () => {
  const insights = [
    {
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Rent Optimization',
      message: '3 properties could increase rent by 8-12% based on market data',
      color: 'text-[#6DD47E]',
      bgColor: 'from-[#6DD47E]/10 to-[#6DD47E]/5'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Vacancy Risk',
      message: '742 Evergreen has lease ending in 30 days, start marketing now',
      color: 'text-[#FFB84D]',
      bgColor: 'from-[#FFB84D]/10 to-[#FFB84D]/5'
    },
    {
      type: 'tip',
      icon: Lightbulb,
      title: 'Maintenance Savings',
      message: 'Bundle HVAC inspections across 4 properties to save ~$400',
      color: 'text-[#C4A1FF]',
      bgColor: 'from-[#C4A1FF]/10 to-[#C4A1FF]/5'
    }
  ];

  return (
    <div className="space-y-3">
      {insights.map((insight, idx) => {
        const Icon = insight.icon;
        return (
          <div key={idx} className="flex gap-3 p-3 bg-[#E8EAF6] rounded-2xl shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF] transition-all duration-300">
            <div className={`p-2 rounded-xl bg-[#E8EAF6] shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF] ${insight.color}`}>
              <Icon size={16} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-[#FF8B65]" />
                <p className="text-sm text-[#3E4C5E]">{insight.title}</p>
              </div>
              <p className="text-xs text-[#8B94A8]">{insight.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
