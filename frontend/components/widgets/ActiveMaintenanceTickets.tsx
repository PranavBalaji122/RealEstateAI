import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ActiveMaintenanceTickets: React.FC = () => {
  const tickets = [
    {
      id: 'MNT-1245',
      property: '742 Evergreen Terrace',
      issue: 'HVAC not cooling properly',
      priority: 'high',
      status: 'in-progress',
      assignee: 'ABC Heating',
      dueDate: '2 days'
    },
    {
      id: 'MNT-1243',
      property: '1060 W Addison St',
      issue: 'Leaking kitchen faucet',
      priority: 'medium',
      status: 'scheduled',
      assignee: 'Quick Plumbing',
      dueDate: '5 days'
    },
    {
      id: 'MNT-1240',
      property: '123 Fake Street',
      issue: 'Exterior paint touch-up',
      priority: 'low',
      status: 'pending',
      assignee: 'Unassigned',
      dueDate: '14 days'
    },
    {
      id: 'MNT-1238',
      property: '456 Oak Avenue',
      issue: 'Replace smoke detector batteries',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'Property Manager',
      dueDate: '1 day'
    }
  ];

  const priorityColors = {
    high: 'bg-[#EF4444] text-white',
    medium: 'bg-[#FBBF24] text-[#0A0A0A]',
    low: 'bg-[#3B82F6] text-white'
  };

  const statusIcons = {
    'in-progress': Clock,
    'scheduled': CheckCircle,
    'pending': AlertCircle
  };

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {tickets.map((ticket) => {
        const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons];
        return (
          <div 
            key={ticket.id}
            className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-[#A3A3A3]">{ticket.id}</span>
                  <Badge className={`${priorityColors[ticket.priority as keyof typeof priorityColors]} text-xs px-2 py-0`}>
                    {ticket.priority}
                  </Badge>
                </div>
                <p className="text-sm mb-1 text-white">{ticket.issue}</p>
                <p className="text-xs text-[#A3A3A3]">{ticket.property}</p>
              </div>
              <StatusIcon size={16} className="text-[#FFB380]" />
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
              <span>{ticket.assignee}</span>
              <span>Due in {ticket.dueDate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
