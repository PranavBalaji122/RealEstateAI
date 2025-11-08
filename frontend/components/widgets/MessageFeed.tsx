import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';

export const MessageFeed: React.FC = () => {
  const messages = [
    {
      sender: 'Sarah Johnson',
      property: '742 Evergreen',
      message: 'When will the HVAC repair be scheduled?',
      time: '5m ago',
      unread: true
    },
    {
      sender: 'Mike Thompson',
      property: '1060 W Addison',
      message: 'Lease renewal documents signed',
      time: '1h ago',
      unread: true
    },
    {
      sender: 'ABC Heating',
      property: '742 Evergreen',
      message: 'Technician arriving tomorrow at 9 AM',
      time: '2h ago',
      unread: false
    },
    {
      sender: 'Emma Davis',
      property: '456 Oak Ave',
      message: 'Thank you for the quick maintenance response',
      time: '3h ago',
      unread: false
    }
  ];

  return (
    <div className="space-y-2">
      {messages.map((msg, idx) => (
        <div 
          key={idx}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            msg.unread 
              ? 'bg-white/10 backdrop-blur-sm border-[#FFB380] hover:bg-white/15' 
              : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs border border-white/10">
                {msg.sender.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm text-white">{msg.sender}</p>
                <p className="text-xs text-[#A3A3A3]">{msg.property}</p>
              </div>
            </div>
            <span className="text-xs text-[#A3A3A3] flex items-center gap-1">
              <Clock size={10} />
              {msg.time}
            </span>
          </div>
          <p className="text-sm text-[#A3A3A3] line-clamp-1">{msg.message}</p>
        </div>
      ))}
    </div>
  );
};
