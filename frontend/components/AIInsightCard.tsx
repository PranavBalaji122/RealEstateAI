import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  description: string;
  type?: 'insight' | 'success' | 'warning';
}

export default function AIInsightCard({ title, description, type = 'insight' }: AIInsightCardProps) {
  const config = {
    insight: {
      icon: Lightbulb,
      bgColor: 'bg-[#FFD9B3]',
      iconColor: 'text-[#F7A654]',
    },
    success: {
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      iconColor: 'text-[#3CB371]',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-[#FBBF24]',
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className="bg-[#F8F7F5] rounded-xl p-4 border border-[#E5E0DA] flex gap-3">
      <div className={`p-2 ${config.bgColor} rounded-lg h-fit`}>
        <Icon size={18} className={config.iconColor} />
      </div>
      <div className="flex-1">
        <h4 className="mb-1">{title}</h4>
        <p className="text-[#555555] text-sm">{description}</p>
      </div>
    </div>
  );
}
