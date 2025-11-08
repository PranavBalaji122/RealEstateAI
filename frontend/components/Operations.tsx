import { useState } from 'react';
import { MessageSquare, Wrench, Calendar, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessagesPage } from '@/components/MessagesPage';

export function Operations() {
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-white mb-2">📬 Operations</h1>
        <p className="text-[#A3A3A3]">Manage messages, maintenance, calendar, and payments</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 mb-6">
          <TabsTrigger 
            value="messages" 
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <MessageSquare size={16} className="mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger 
            value="maintenance"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <Wrench size={16} className="mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger 
            value="calendar"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <Calendar size={16} className="mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger 
            value="payments"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <DollarSign size={16} className="mr-2" />
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="m-0 p-0">
          <MessagesPage />
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Broken Water Heater', property: 'Oak Street Apartments', unit: '2B', priority: 'High', status: 'In Progress' },
              { title: 'Leaky Faucet', property: 'Maple Plaza', unit: '4A', priority: 'Medium', status: 'Pending' },
              { title: 'AC Maintenance', property: 'Pine View', unit: '1C', priority: 'Low', status: 'Scheduled' },
            ].map((ticket, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white">{ticket.title}</h4>
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    ticket.priority === 'High' 
                      ? 'bg-red-500/20 text-red-400' 
                      : ticket.priority === 'Medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-sm text-[#A3A3A3] mb-2">{ticket.property} - Unit {ticket.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#FF6B35]">{ticket.status}</span>
                  <button className="text-sm text-white hover:text-[#FF6B35] transition-all">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
            <button className="bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-5 hover:bg-white/10 transition-all flex items-center justify-center min-h-[160px]">
              <span className="text-[#A3A3A3]">+ Add Request</span>
            </button>
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white">November 2024</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-[#A3A3A3] hover:text-white hover:bg-white/10 transition-all">
                  Month
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-[#A3A3A3] hover:text-white hover:bg-white/10 transition-all">
                  Week
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm text-[#A3A3A3] py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, idx) => (
                <div 
                  key={idx}
                  className="aspect-square bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <span className="text-xs text-white">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-[#A3A3A3]">Tenant</th>
                  <th className="px-6 py-4 text-left text-sm text-[#A3A3A3]">Property</th>
                  <th className="px-6 py-4 text-left text-sm text-[#A3A3A3]">Amount</th>
                  <th className="px-6 py-4 text-left text-sm text-[#A3A3A3]">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm text-[#A3A3A3]">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-[#A3A3A3]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tenant: 'Sarah Chen', property: 'Oak Street Apts', amount: '$1,800', due: 'Nov 1', status: 'Paid', late: false },
                  { tenant: 'Mike Johnson', property: 'Maple Plaza', amount: '$2,200', due: 'Nov 1', status: 'Late', late: true },
                  { tenant: 'Emma Davis', property: 'Pine View', amount: '$1,950', due: 'Nov 15', status: 'Upcoming', late: false },
                ].map((payment, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-all">
                    <td className="px-6 py-4 text-sm text-white">{payment.tenant}</td>
                    <td className="px-6 py-4 text-sm text-[#A3A3A3]">{payment.property}</td>
                    <td className="px-6 py-4 text-sm text-white">{payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-[#A3A3A3]">{payment.due}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-xs ${
                        payment.status === 'Paid'
                          ? 'bg-green-500/20 text-green-400'
                          : payment.status === 'Late'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {payment.late && (
                        <button className="text-sm text-[#FF6B35] hover:text-[#FF6B35]/80 transition-all">
                          Send Reminder
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
