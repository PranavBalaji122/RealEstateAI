import React, { useState } from 'react';
import { Plus, Search, Filter, Wrench, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type Priority = 'High' | 'Medium' | 'Low';
type Status = 'Pending' | 'In Progress' | 'Scheduled' | 'Completed';

interface MaintenanceTicket {
  id: string;
  title: string;
  property: string;
  unit: string;
  priority: Priority;
  status: Status;
  description: string;
  requestedBy: string;
  requestedDate: Date;
  assignedTo?: string;
}

interface MaintenancePageProps {
  sidebarCollapsed?: boolean;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ sidebarCollapsed = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');

  const tickets: MaintenanceTicket[] = [
    {
      id: '1',
      title: 'Broken Water Heater',
      property: 'Oak Street Apartments',
      unit: '2B',
      priority: 'High',
      status: 'In Progress',
      description: 'Water heater not producing hot water for the past 2 days',
      requestedBy: 'Sarah Johnson',
      requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      assignedTo: 'Mike Rodriguez'
    },
    {
      id: '2',
      title: 'Leaky Faucet',
      property: 'Maple Plaza',
      unit: '4A',
      priority: 'Medium',
      status: 'Pending',
      description: 'Kitchen faucet dripping constantly',
      requestedBy: 'Emma Chen',
      requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
    {
      id: '3',
      title: 'AC Maintenance',
      property: 'Pine View',
      unit: '1C',
      priority: 'Low',
      status: 'Scheduled',
      description: 'Regular quarterly AC maintenance check',
      requestedBy: 'Property Manager',
      requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 48),
      assignedTo: 'Tom\'s Maintenance Co.'
    },
    {
      id: '4',
      title: 'Broken Window',
      property: 'Oak Street Apartments',
      unit: '7C',
      priority: 'High',
      status: 'Pending',
      description: 'Bedroom window cracked, needs replacement',
      requestedBy: 'Michael Torres',
      requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
    {
      id: '5',
      title: 'Light Fixture Replacement',
      property: 'Maple Plaza',
      unit: '3B',
      priority: 'Low',
      status: 'Completed',
      description: 'Hallway light fixture replaced',
      requestedBy: 'Lisa Anderson',
      requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      assignedTo: 'Mike Rodriguez'
    }
  ];

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 'bg-[#FF6B7A]/20 text-[#FF6B7A] border-[#FF6B7A]/30';
      case 'Medium':
        return 'bg-[#FFB84D]/20 text-[#FF8B65] border-[#FFB84D]/30';
      case 'Low':
        return 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/30';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FF8B65]/20 text-[#FF8B65]';
      case 'In Progress':
        return 'bg-[#C4A1FF]/20 text-[#8B7AB8]';
      case 'Scheduled':
        return 'bg-[#FF9ECE]/20 text-[#FF9ECE]';
      case 'Completed':
        return 'bg-[#4CAF50]/20 text-[#4CAF50]';
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle size={14} />;
      case 'In Progress':
        return <Wrench size={14} />;
      case 'Scheduled':
        return <Clock size={14} />;
      case 'Completed':
        return <CheckCircle size={14} />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const days = Math.floor(hours / 24);

    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filterPriority !== 'all' && ticket.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
    if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.property.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={`p-8 space-y-6 transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-[#3E4C5E]">Maintenance</h1>
          <p className="text-[#8B94A8]">Track and manage property maintenance requests</p>
        </div>
        <button className="px-5 py-3 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] hover:shadow-[0_6px_16px_rgba(255,139,101,0.5)] text-white rounded-2xl transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,139,101,0.4)]">
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
          <Input
            placeholder="Search by title or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#E8EAF6] text-[#3E4C5E] placeholder:text-[#B4BBCC] shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
            className="px-4 py-2 bg-[#E8EAF6] rounded-xl text-[#3E4C5E] text-sm focus:outline-none shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] border-none"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Status | 'all')}
            className="px-4 py-2 bg-[#E8EAF6] rounded-xl text-[#3E4C5E] text-sm focus:outline-none shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] border-none"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: tickets.length, color: 'text-[#3E4C5E]' },
          { label: 'Pending', value: tickets.filter(t => t.status === 'Pending').length, color: 'text-[#FF8B65]' },
          { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: 'text-[#C4A1FF]' },
          { label: 'High Priority', value: tickets.filter(t => t.priority === 'High').length, color: 'text-[#FF6B7A]' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#E8EAF6] rounded-xl p-4 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
            <p className="text-[#8B94A8] text-sm mb-1">{stat.label}</p>
            <p className={`${stat.color} text-2xl`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-[#E8EAF6] rounded-2xl p-5 transition-all cursor-pointer shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[4px_4px_10px_#C8CADE,-4px_-4px_10px_#FFFFFF]"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#3E4C5E] flex-1">{ticket.title}</h3>
              <Badge className={`${getPriorityColor(ticket.priority)} border`}>
                {ticket.priority}
              </Badge>
            </div>

            {/* Property Info */}
            <p className="text-sm text-[#8B94A8] mb-1">{ticket.property}</p>
            <p className="text-sm text-[#8B94A8] mb-3">Unit {ticket.unit}</p>

            {/* Description */}
            <p className="text-sm text-[#3E4C5E] mb-4 line-clamp-2">{ticket.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#D1D5E0]">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(ticket.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(ticket.status)}
                    <span className="text-xs">{ticket.status}</span>
                  </div>
                </Badge>
              </div>
              <span className="text-xs text-[#8B94A8]">{formatDate(ticket.requestedDate)}</span>
            </div>

            {/* Assigned To */}
            {ticket.assignedTo && (
              <div className="mt-3 pt-3 border-t border-[#D1D5E0]">
                <p className="text-xs text-[#8B94A8]">
                  Assigned to: <span className="text-[#FF8B65]">{ticket.assignedTo}</span>
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Add New Card */}
        <button className="bg-[#E8EAF6] border-dashed rounded-2xl p-5 transition-all flex flex-col items-center justify-center min-h-[280px] shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[4px_4px_10px_#C8CADE,-4px_-4px_10px_#FFFFFF] border-2 border-[#D1D5E0]">
          <Plus size={32} className="text-[#8B94A8] mb-2" />
          <span className="text-[#8B94A8]">Add Request</span>
        </button>
      </div>
    </div>
  );
};
