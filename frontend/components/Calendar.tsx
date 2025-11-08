import { useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const events = [
  { id: '1', date: 1, title: 'Rent Due - Multiple Properties', type: 'rent', time: 'All Day' },
  { id: '2', date: 3, title: 'HVAC Maintenance - 742 Evergreen', type: 'maintenance', time: '2:00 PM' },
  { id: '3', date: 8, title: 'Rent Due - 221B Baker St', type: 'rent', time: 'All Day' },
  { id: '4', date: 12, title: 'ROI Review Meeting', type: 'review', time: '10:00 AM' },
  { id: '5', date: 15, title: 'Plumbing Inspection - 1600 Penn Ave', type: 'maintenance', time: '9:00 AM' },
  { id: '6', date: 20, title: 'Lease Renewal - John Smith', type: 'rent', time: '3:00 PM' },
  { id: '7', date: 25, title: 'Property Tax Payment', type: 'review', time: 'All Day' },
];

const today = 6;

export default function Calendar() {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedEvent, setSelectedEvent] = useState(events[1]);

  const eventColors = {
    rent: 'bg-[#F7A654]',
    maintenance: 'bg-[#FBBF24]',
    review: 'bg-[#555555]',
  };

  const eventLabels = {
    rent: 'Rent Due',
    maintenance: 'Maintenance',
    review: 'ROI Review',
  };

  const getDaysInMonth = () => {
    return Array.from({ length: 30 }, (_, i) => i + 1);
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => event.date === day);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Calendar</h2>
        <div className="flex items-center gap-3">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
            className={view === 'month' ? 'bg-[#F7A654] hover:bg-[#F58E3C] text-white' : ''}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
            className={view === 'week' ? 'bg-[#F7A654] hover:bg-[#F58E3C] text-white' : ''}
          >
            Week
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Sync Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="col-span-3 bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
          <div className="flex items-center justify-between mb-6">
            <h3>November 2025</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-[#555555] pb-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {getDaysInMonth().map((day) => {
              const dayEvents = getEventsForDay(day);
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={`aspect-square p-2 rounded-xl border ${
                    isToday
                      ? 'border-[#F7A654] bg-[#FFD9B3]'
                      : 'border-[#E5E0DA] bg-[#F5F3F0] hover:bg-[#EFEAE5]'
                  } cursor-pointer transition-colors`}
                >
                  <div className={`text-sm mb-1 ${isToday ? '' : 'text-[#555555]'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`${eventColors[event.type as keyof typeof eventColors]} text-white text-xs px-1.5 py-0.5 rounded truncate`}
                      >
                        {event.title.split(' - ')[0]}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-[#555555]">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
            <h4 className="mb-4">Event Details</h4>
            {selectedEvent && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#555555] mb-1">Title</p>
                  <p className="text-sm">{selectedEvent.title}</p>
                </div>
                <div>
                  <p className="text-xs text-[#555555] mb-1">Time</p>
                  <p className="text-sm">{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-xs text-[#555555] mb-1">Date</p>
                  <p className="text-sm">November {selectedEvent.date}, 2025</p>
                </div>
                <div className="p-3 bg-[#FFD9B3] rounded-xl">
                  <p className="text-xs text-[#555555] mb-1">AI Note</p>
                  <p className="text-sm">
                    {selectedEvent.type === 'maintenance'
                      ? 'Vendor typically arrives 15 min early'
                      : 'No special notes'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
            <h4 className="mb-4">Legend</h4>
            <div className="space-y-3">
              {Object.entries(eventLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${eventColors[key as keyof typeof eventColors]}`} />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
