import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const TenantAlerts: React.FC = () => {
  const alerts = [
    {
      type: 'urgent',
      icon: AlertCircle,
      message: 'Lease expires in 30 days',
      tenant: 'S. Johnson',
      color: 'text-[#EF4444]'
    },
    {
      type: 'warning',
      icon: Clock,
      message: 'Rent payment pending',
      tenant: 'M. Thompson',
      color: 'text-[#FBBF24]'
    },
    {
      type: 'success',
      icon: CheckCircle,
      message: 'Lease renewed',
      tenant: 'E. Davis',
      color: 'text-[#FFB380]'
    },
    {
      type: 'warning',
      icon: Clock,
      message: 'Move-out scheduled',
      tenant: 'R. Williams',
      color: 'text-[#FBBF24]'
    }
  ];

  return (
    <div className="space-y-2">
      {alerts.map((alert, idx) => {
        const Icon = alert.icon;
        return (
          <div 
            key={idx}
            className="flex items-start gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <Icon size={16} className={`mt-0.5 ${alert.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white">{alert.message}</p>
              <p className="text-xs text-[#A3A3A3]">{alert.tenant}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
