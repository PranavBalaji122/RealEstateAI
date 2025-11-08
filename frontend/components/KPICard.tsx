import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export default function KPICard({ title, value, change, changeType = 'neutral', icon: Icon }: KPICardProps) {
  const changeColor = {
    positive: 'text-[#3CB371]',
    negative: 'text-[#E57373]',
    neutral: 'text-[#555555]',
  }[changeType];

  return (
    <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA] shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#FFD9B3] rounded-xl">
          <Icon size={24} className="text-[#F7A654]" />
        </div>
        {change && (
          <span className={`text-sm ${changeColor}`}>{change}</span>
        )}
      </div>
      <p className="text-[#555555] text-sm mb-1">{title}</p>
      <h2>{value}</h2>
      <div className="mt-4 h-1 bg-[#EFEAE5] rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-[#F7A654] rounded-full"></div>
      </div>
    </div>
  );
}
