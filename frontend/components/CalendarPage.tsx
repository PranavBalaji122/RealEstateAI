import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type EventType = 'maintenance' | 'showing' | 'inspection' | 'lease' | 'payment';

interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: Date;
  time: string;
  property?: string;
  description?: string;
}

interface CalendarPageProps {
  sidebarCollapsed?: boolean;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ sidebarCollapsed = true }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'HVAC Maintenance',
      type: 'maintenance',
      date: new Date(2025, 10, 8),
      time: '2:00 PM',
      property: 'Oak Street Apartments',
      description: 'Quarterly HVAC inspection'
    },
    {
      id: '2',
      title: 'Property Showing',
      type: 'showing',
      date: new Date(2025, 10, 10),
      time: '3:30 PM',
      property: 'Maple Plaza - Unit 4A',
      description: 'Showing to potential tenant'
    },
    {
      id: '3',
      title: 'Lease Renewal',
      type: 'lease',
      date: new Date(2025, 10, 12),
      time: '10:00 AM',
      property: 'Pine View - Unit 1C',
      description: 'Lease renewal meeting with tenant'
    },
    {
      id: '4',
      title: 'Rent Payment Due',
      type: 'payment',
      date: new Date(2025, 10, 15),
      time: 'All Day',
      description: 'Monthly rent payment deadline'
    },
    {
      id: '5',
      title: 'Annual Inspection',
      type: 'inspection',
      date: new Date(2025, 10, 18),
      time: '9:00 AM',
      property: 'Oak Street Apartments',
      description: 'Fire safety inspection'
    }
  ];

  const getEventColor = (type: EventType) => {
    switch (type) {
      case 'maintenance':
        return 'bg-[#C4A1FF]/20 text-[#8B7AB8] border-[#C4A1FF]/30';
      case 'showing':
        return 'bg-[#FF9ECE]/20 text-[#FF9ECE] border-[#FF9ECE]/30';
      case 'inspection':
        return 'bg-[#FF8B65]/20 text-[#FF8B65] border-[#FF8B65]/30';
      case 'lease':
        return 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30';
      case 'payment':
        return 'bg-[#FFB84D]/20 text-[#FFB84D] border-[#FFB84D]/30';
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      return event.date.getDate() === day && 
             event.date.getMonth() === currentDate.getMonth() &&
             event.date.getFullYear() === currentDate.getFullYear();
    });
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className={`p-8 space-y-6 transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-[#3E4C5E]">Calendar</h1>
          <p className="text-[#8B94A8]">Schedule and manage property events</p>
        </div>
        <button className="px-5 py-3 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] hover:shadow-[0_6px_16px_rgba(255,139,101,0.5)] text-white rounded-2xl transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,139,101,0.4)]">
          <Plus size={18} />
          New Event
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="col-span-2 bg-[#E8EAF6] rounded-3xl p-6 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-[#3E4C5E]">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 bg-[#E8EAF6] rounded-lg transition-all shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]"
                >
                  <ChevronLeft size={18} className="text-[#8B94A8]" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 bg-[#E8EAF6] rounded-lg transition-all shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]"
                >
                  <ChevronRight size={18} className="text-[#8B94A8]" />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  viewMode === 'month'
                    ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                    : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  viewMode === 'week'
                    ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                    : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                }`}
              >
                Week
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm text-[#8B94A8] py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square"></div>
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = new Date().getDate() === day && 
                             new Date().getMonth() === currentDate.getMonth() &&
                             new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div
                  key={day}
                  className={`aspect-square bg-[#E8EAF6] rounded-lg p-2 transition-all cursor-pointer border shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] ${
                    isToday ? 'border-[#FF8B65]' : 'border-transparent'
                  }`}
                >
                  <div className={`text-xs mb-1 ${isToday ? 'text-[#FF8B65]' : 'text-[#3E4C5E]'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-[10px] px-1 py-0.5 rounded truncate ${getEventColor(event.type)} border`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-[#B4BBCC]">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="col-span-1 bg-[#E8EAF6] rounded-3xl p-6 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
          <h3 className="text-[#3E4C5E] mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="bg-[#E8EAF6] rounded-xl p-4 transition-all cursor-pointer shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#E8EAF6] rounded-lg flex flex-col items-center justify-center shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <span className="text-xs text-[#8B94A8]">
                      {event.date.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-[#3E4C5E]">{event.date.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#3E4C5E] text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-[#8B94A8] mb-2">
                      <Clock size={12} />
                      <span>{event.time}</span>
                    </div>
                    {event.property && (
                      <p className="text-xs text-[#A3A3A3] truncate">{event.property}</p>
                    )}
                    <Badge className={`${getEventColor(event.type)} border text-xs mt-2`}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Type Legend */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-white text-sm mb-3">Event Types</h4>
            <div className="space-y-2">
              {[
                { type: 'maintenance' as EventType, label: 'Maintenance' },
                { type: 'showing' as EventType, label: 'Showing' },
                { type: 'inspection' as EventType, label: 'Inspection' },
                { type: 'lease' as EventType, label: 'Lease' },
                { type: 'payment' as EventType, label: 'Payment' },
              ].map(item => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded border ${getEventColor(item.type)}`}></div>
                  <span className="text-xs text-[#A3A3A3]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
