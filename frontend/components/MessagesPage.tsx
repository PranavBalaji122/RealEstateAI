import React, { useState } from 'react';
import { Search, Filter, Mail, MessageSquare, Phone, Send, Plus, Flag, Sparkles, Brain, Zap, Clock, Check, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

type MessageType = 'sms' | 'email' | 'voice';
type ContactType = 'tenant' | 'contractor' | 'ai-agent';
type FilterType = 'all' | 'unread' | 'flagged' | 'ai-only';
type MessageMode = 'coaching' | 'autopilot';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  type: MessageType;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  type: ContactType;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isFlagged: boolean;
  isAIGenerated: boolean;
  property?: string;
}

interface MessagesPageProps {
  sidebarCollapsed?: boolean;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({ sidebarCollapsed = true }) => {
  const [activeConversation, setActiveConversation] = useState<string>('1');
  const [messageMode, setMessageMode] = useState<MessageMode>('coaching');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      lastMessage: 'Thanks for fixing the heating so quickly!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 0,
      isFlagged: false,
      isAIGenerated: false,
      property: 'Unit 4B, Oak Street'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      type: 'contractor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      lastMessage: 'I can start the plumbing work on Monday',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      isFlagged: true,
      isAIGenerated: false,
      property: 'Unit 2A, Pine Avenue'
    },
    {
      id: '3',
      name: 'AI Assistant',
      type: 'ai-agent',
      lastMessage: 'I\'ve drafted responses for 3 pending messages',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      unreadCount: 1,
      isFlagged: false,
      isAIGenerated: true
    },
    {
      id: '4',
      name: 'Emma Chen',
      type: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      lastMessage: 'When is the lease renewal deadline?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      isFlagged: false,
      isAIGenerated: false,
      property: 'Unit 7C, Maple Drive'
    },
    {
      id: '5',
      name: 'Tom\'s Maintenance Co.',
      type: 'contractor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      lastMessage: 'Invoice for October work attached',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      unreadCount: 0,
      isFlagged: false,
      isAIGenerated: false
    }
  ];

  // Mock messages for active conversation
  const messages: Message[] = [
    {
      id: '1',
      text: 'Hi, the heating in my apartment isn\'t working properly. It\'s been quite cold the last few days.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isOwn: false,
      type: 'sms',
      status: 'read'
    },
    {
      id: '2',
      text: 'Hi Sarah, I\'m sorry to hear that. I\'ll send someone over to check it out today. What time works best for you?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      isOwn: true,
      type: 'sms',
      status: 'read'
    },
    {
      id: '3',
      text: 'Anytime after 2pm would be great, thanks!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
      isOwn: false,
      type: 'sms',
      status: 'read'
    },
    {
      id: '4',
      text: 'Perfect. I\'ve scheduled Mike to come at 3pm. He\'s our trusted HVAC specialist.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21),
      isOwn: true,
      type: 'email',
      status: 'read'
    },
    {
      id: '5',
      text: 'Thanks for fixing the heating so quickly!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isOwn: false,
      type: 'sms',
      status: 'read'
    }
  ];

  // AI-generated suggestions
  const aiSuggestions = [
    'You\'re welcome! Let me know if you need anything else.',
    'Glad we could help! Don\'t hesitate to reach out if any issues come up.',
    'Happy to help! Please let us know if the temperature is comfortable now.'
  ];

  const getContactTypeIcon = (type: ContactType) => {
    switch (type) {
      case 'tenant':
        return <MessageSquare size={14} className="text-[#FF6B35]" />;
      case 'contractor':
        return <Mail size={14} className="text-blue-400" />;
      case 'ai-agent':
        return <Sparkles size={14} className="text-purple-400" />;
    }
  };

  const getMessageTypeIcon = (type: MessageType) => {
    switch (type) {
      case 'sms':
        return <MessageSquare size={12} className="text-[#A3A3A3]" />;
      case 'email':
        return <Mail size={12} className="text-[#A3A3A3]" />;
      case 'voice':
        return <Phone size={12} className="text-[#A3A3A3]" />;
    }
  };

  const getMessageStatusIcon = (status?: 'sent' | 'delivered' | 'read') => {
    switch (status) {
      case 'sent':
        return <Check size={14} className="text-[#A3A3A3]" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-[#A3A3A3]" />;
      case 'read':
        return <CheckCheck size={14} className="text-[#FF6B35]" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv => {
    if (filterType === 'unread' && conv.unreadCount === 0) return false;
    if (filterType === 'flagged' && !conv.isFlagged) return false;
    if (filterType === 'ai-only' && conv.type !== 'ai-agent') return false;
    if (searchQuery && !conv.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeConv = conversations.find(c => c.id === activeConversation);

  return (
    <div className={`h-screen flex flex-col transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-1 text-[#3E4C5E]">Messages</h1>
            <p className="text-[#8B94A8]">AI-powered communication hub</p>
          </div>

          {/* AI Mode Toggle */}
          <div className="flex items-center gap-4 px-6 py-3 bg-[#E8EAF6] rounded-2xl shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF]">
            <div className="flex items-center gap-2">
              <Brain size={18} className={messageMode === 'coaching' ? 'text-[#FF8B65]' : 'text-[#8B94A8]'} />
              <span className={`text-sm ${messageMode === 'coaching' ? 'text-[#3E4C5E]' : 'text-[#8B94A8]'}`}>Coaching</span>
            </div>
            <Switch
              checked={messageMode === 'autopilot'}
              onCheckedChange={(checked) => setMessageMode(checked ? 'autopilot' : 'coaching')}
            />
            <div className="flex items-center gap-2">
              <Zap size={18} className={messageMode === 'autopilot' ? 'text-[#FF8B65]' : 'text-[#8B94A8]'} />
              <span className={`text-sm ${messageMode === 'autopilot' ? 'text-[#3E4C5E]' : 'text-[#8B94A8]'}`}>Autopilot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">
        {/* Left: Conversation List */}
        <div className="w-[380px] flex flex-col bg-[#E8EAF6] rounded-3xl overflow-hidden shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
          {/* Search and Filters */}
          <div className="p-4 border-b border-[#D1D5E0] space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B94A8]" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#E8EAF6] border-none text-[#3E4C5E] placeholder:text-[#B4BBCC] shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  filterType === 'all'
                    ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                    : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('unread')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  filterType === 'unread'
                    ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                    : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilterType('flagged')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  filterType === 'flagged'
                    ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                    : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                }`}
              >
                Flagged
              </button>
              <button
                onClick={() => setFilterType('ai-only')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 ${
                  filterType === 'ai-only'
                    ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                    : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                }`}
              >
                <Sparkles size={12} />
                AI Only
              </button>
            </div>
          </div>

          {/* Conversations */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  className={`w-full p-3 rounded-xl mb-2 transition-all text-left ${
                    activeConversation === conv.id
                      ? 'bg-[#E8EAF6] shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF]'
                      : 'bg-[#E8EAF6] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        {conv.avatar ? (
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-[#C4A1FF] to-[#B891EE] text-white">
                            {conv.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-[#E8EAF6] rounded-full p-0.5 shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                        {getContactTypeIcon(conv.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#3E4C5E] truncate">{conv.name}</span>
                        <span className="text-xs text-[#B4BBCC]">{formatTimestamp(conv.timestamp)}</span>
                      </div>
                      {conv.property && (
                        <p className="text-xs text-[#8B94A8] mb-1">{conv.property}</p>
                      )}
                      <p className="text-sm text-[#8B94A8] truncate">{conv.lastMessage}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white hover:from-[#FF8B65] hover:to-[#FFA07A] shadow-[0_2px_6px_rgba(255,139,101,0.4)]">
                          {conv.unreadCount}
                        </Badge>
                      )}
                      {conv.isFlagged && (
                        <Flag size={14} className="text-[#FF8B65] fill-[#FF8B65]" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right: Message Thread */}
        <div className="flex-1 flex flex-col bg-[#E8EAF6] rounded-3xl overflow-hidden shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
          {activeConv ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-[#D1D5E0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    {activeConv.avatar ? (
                      <AvatarImage src={activeConv.avatar} alt={activeConv.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-[#C4A1FF] to-[#B891EE] text-white">
                        {activeConv.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#3E4C5E]">{activeConv.name}</span>
                      {getContactTypeIcon(activeConv.type)}
                    </div>
                    {activeConv.property && (
                      <p className="text-xs text-[#8B94A8]">{activeConv.property}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg bg-[#E8EAF6] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] transition-all"
                    title="Flag conversation"
                  >
                    <Flag size={18} className={activeConv.isFlagged ? 'text-[#FF8B65] fill-[#FF8B65]' : 'text-[#8B94A8]'} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.isOwn
                            ? 'bg-gradient-to-br from-[#FF8B65]/20 to-[#FFA07A]/20 border border-[#FF8B65]/30'
                            : 'bg-[#E8EAF6] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF]'
                        } rounded-2xl p-4`}
                      >
                        <p className="text-[#3E4C5E] mb-2">{message.text}</p>
                        <div className="flex items-center gap-2 text-xs text-[#8B94A8]">
                          {getMessageTypeIcon(message.type)}
                          <Clock size={12} />
                          <span>{formatTimestamp(message.timestamp)}</span>
                          {message.isOwn && getMessageStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* AI Suggestions */}
              {messageMode === 'coaching' && aiSuggestions.length > 0 && (
                <div className="px-4 py-3 border-t border-[#D1D5E0] bg-[#E8EAF6]">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[#FF8B65]" />
                    <span className="text-xs text-[#8B94A8]">AI Suggestions</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {aiSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setMessageText(suggestion)}
                        className="px-3 py-2 bg-[#E8EAF6] text-sm text-[#8B94A8] hover:text-[#3E4C5E] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] rounded-lg transition-all whitespace-nowrap"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t border-[#D1D5E0]">
                <div className="flex gap-3">
                  <Textarea
                    placeholder={
                      messageMode === 'autopilot'
                        ? 'AI will automatically respond based on context...'
                        : 'Type your message...'
                    }
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    disabled={messageMode === 'autopilot'}
                    className="flex-1 bg-[#E8EAF6] border-none text-[#3E4C5E] placeholder:text-[#B4BBCC] resize-none min-h-[60px] shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <button
                    disabled={!messageText.trim() || messageMode === 'autopilot'}
                    className="px-6 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] hover:shadow-[0_6px_16px_rgba(255,139,101,0.5)] disabled:opacity-40 disabled:shadow-none text-white rounded-xl transition-all disabled:cursor-not-allowed flex items-center justify-center shadow-[0_4px_14px_rgba(255,139,101,0.4)]"
                  >
                    <Send size={20} />
                  </button>
                </div>
                {messageMode === 'autopilot' && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#FF8B65]">
                    <Zap size={12} />
                    <span>Autopilot mode active - AI is handling responses automatically</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={48} className="text-[#B4BBCC] mx-auto mb-4" />
                <p className="text-[#8B94A8]">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose New Message FAB */}
      <button
        className="fixed bottom-8 right-8 p-5 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-black rounded-full shadow-2xl transition-all hover:scale-110 z-40"
        title="Compose New Message"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};
