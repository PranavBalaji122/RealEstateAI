import { useState } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const threads = [
  {
    id: '1',
    name: 'John Smith',
    type: 'Tenant',
    lastMessage: 'Thanks for fixing the sink!',
    time: '2 hours ago',
    unread: 0,
    lastPayment: 'Nov 1, 2025',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    type: 'Tenant',
    lastMessage: 'When is rent due?',
    time: '1 day ago',
    unread: 2,
    lastPayment: 'Oct 28, 2025',
  },
  {
    id: '3',
    name: 'ABC Plumbing',
    type: 'Vendor',
    lastMessage: 'Invoice #3421 sent',
    time: '3 days ago',
    unread: 0,
    lastPayment: null,
  },
  {
    id: '4',
    name: 'Mike Wilson',
    type: 'Contractor',
    lastMessage: 'Estimate attached',
    time: '1 week ago',
    unread: 1,
    lastPayment: null,
  },
];

const messages = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    text: 'Hi, I wanted to ask about the rent payment.',
    time: '2:30 PM',
    isUser: false,
  },
  {
    id: '2',
    sender: 'Sarah Johnson',
    text: 'When is it due this month?',
    time: '2:31 PM',
    isUser: false,
  },
  {
    id: '3',
    sender: 'You',
    text: 'Hi Sarah! Rent is due on the 1st of each month.',
    time: '2:45 PM',
    isUser: true,
  },
  {
    id: '4',
    sender: 'Sarah Johnson',
    text: "Thanks! I'll make sure to pay on time.",
    time: '2:46 PM',
    isUser: false,
  },
];

export default function Inbox() {
  const [selectedThread, setSelectedThread] = useState(threads[1]);
  const [message, setMessage] = useState('');

  return (
    <div className="p-6">
      <h2 className="mb-6">Inbox</h2>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Message Threads */}
        <div className="bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#E5E0DA]">
            <Input placeholder="Search messages..." />
          </div>

          <div className="flex-1 overflow-y-auto">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`w-full p-4 border-b border-[#E5E0DA] text-left hover:bg-[#EFEAE5] transition-colors ${
                  selectedThread.id === thread.id ? 'bg-[#FFD9B3]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#F7A654] text-white">
                        {thread.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm mb-0.5">{thread.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {thread.type}
                      </Badge>
                    </div>
                  </div>
                  {thread.unread > 0 && (
                    <Badge className="bg-[#F7A654] text-white">{thread.unread}</Badge>
                  )}
                </div>
                <p className="text-sm text-[#555555] truncate">{thread.lastMessage}</p>
                <p className="text-xs text-[#555555] mt-1">{thread.time}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-span-2 bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-[#E5E0DA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#F7A654] text-white">
                  {selectedThread.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4>{selectedThread.name}</h4>
                {selectedThread.lastPayment && (
                  <p className="text-xs text-[#555555]">
                    Last payment: {selectedThread.lastPayment}
                  </p>
                )}
              </div>
            </div>
            <Badge variant="outline">{selectedThread.type}</Badge>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-xl p-3 ${
                    msg.isUser
                      ? 'bg-[#F7A654] text-white'
                      : 'bg-[#EFEAE5] text-[#1A1A1A]'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isUser ? 'text-white/80' : 'text-[#555555]'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* AI Suggested Reply */}
          <div className="p-4 bg-[#FFD9B3] border-t border-[#E5E0DA]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#F7A654]" />
              <span className="text-sm">AI Suggested Reply</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="flex-1 text-sm text-[#555555]">
                "Rent is due on the 1st of each month. You can pay via..."
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setMessage("Rent is due on the 1st of each month. You can pay via...")}
              >
                Insert
              </Button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#E5E0DA] flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setMessage('');
                }
              }}
            />
            <Button variant="outline" size="icon">
              <Mic size={18} />
            </Button>
            <Button
              size="icon"
              className="bg-[#F7A654] hover:bg-[#F58E3C] text-white"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
