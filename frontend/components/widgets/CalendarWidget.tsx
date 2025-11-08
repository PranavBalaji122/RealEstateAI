import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const events = [
    {
      time: '9:00 AM',
      title: 'Property Inspection',
      location: '742 Evergreen Terrace',
      type: 'inspection'
    },
    {
      time: '2:00 PM',
      title: 'Tenant Meeting',
      location: '1060 W Addison St',
      type: 'meeting'
    },
    {
      time: '4:30 PM',
      title: 'Contractor Walkthrough',
      location: '456 Oak Avenue',
      type: 'maintenance'
    }
  ];

  const typeColors = {
    inspection: 'border-[#FFB380]',
    meeting: 'border-[#3B82F6]',
    maintenance: 'border-[#FBBF24]'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#FFB380]" />
          <span className="text-sm text-[#A3A3A3]">Today, Nov 6</span>
        </div>
        <button className="text-xs text-[#FFB380] hover:underline">View All</button>
      </div>
      
      {events.map((event, idx) => (
        <div 
          key={idx}
          className={`p-3 bg-white/5 backdrop-blur-sm rounded-xl border-l-2 ${typeColors[event.type as keyof typeof typeColors]} hover:bg-white/10 transition-all cursor-pointer`}
        >
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3] min-w-[60px]">
              <Clock size={12} />
              <span>{event.time}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm mb-1 text-white">{event.title}</p>
              <p className="text-xs text-[#A3A3A3]">{event.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
