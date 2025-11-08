import { useState } from 'react';
import { Sparkles, Volume2, Send, Lightbulb, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const aiMessages = [
  {
    id: '1',
    type: 'insight',
    title: 'ROI Analysis',
    message: 'Your ROI dropped 1.3% this month. This appears to be due to increased maintenance costs at 742 Evergreen Terrace.',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Action Recommended',
    message: 'Consider contacting Vendor X for a maintenance contract. Historical data shows this could reduce costs by 15-20%.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    type: 'insight',
    title: 'Rent Optimization',
    message: 'Market analysis suggests you could increase rent by 4% at 221B Baker Street without risking tenant turnover.',
    timestamp: '11:15 AM',
  },
];

const userMessages = [
  {
    id: '1',
    message: 'Why did my ROI drop this month?',
    timestamp: '10:29 AM',
  },
  {
    id: '2',
    message: 'What can I do about the maintenance costs?',
    timestamp: '10:33 AM',
  },
];

export default function Coaching() {
  const [autopilot, setAutopilot] = useState(false);
  const [userInput, setUserInput] = useState('');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FFD9B3] rounded-xl">
            <Sparkles className="text-[#F7A654]" size={24} />
          </div>
          <h2>AI Coaching Assistant</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#555555]">Autopilot Mode</span>
          <Switch checked={autopilot} onCheckedChange={setAutopilot} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* AI Messages */}
        <div className="bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] p-6">
          <h3 className="mb-4">AI Insights & Recommendations</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {aiMessages.map((msg) => (
              <div key={msg.id} className="p-4 bg-[#EFEAE5] rounded-xl">
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 bg-[#FFD9B3] rounded-3xl">
                    <Sparkles size={16} className="text-[#F7A654]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm">{msg.title}</h4>
                      <span className="text-xs text-[#555555]">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#555555]">{msg.message}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="ghost" className="text-[#F7A654]">
                    <Volume2 size={14} className="mr-1" />
                    Listen
                  </Button>
                  <Button size="sm" variant="ghost">
                    <HelpCircle size={14} className="mr-1" />
                    Why?
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Conversation */}
        <div className="bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] p-6">
          <h3 className="mb-4">Your Questions</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
            {userMessages.map((msg, idx) => (
              <div key={msg.id}>
                <div className="flex justify-end mb-3">
                  <div className="max-w-[80%] bg-[#F7A654] text-white rounded-xl p-3">
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-white/80 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
                {idx < aiMessages.length && (
                  <div className="flex justify-start mb-3">
                    <div className="max-w-[80%] bg-[#EFEAE5] rounded-xl p-3">
                      <p className="text-sm">{aiMessages[idx].message}</p>
                      <p className="text-xs text-[#555555] mt-1">
                        {aiMessages[idx].timestamp}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E0DA] pt-4">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask the AI assistant anything..."
              className="mb-3"
              rows={3}
            />
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-[#F7A654] hover:bg-[#F58E3C] text-white"
                onClick={() => setUserInput('')}
              >
                <Send size={16} className="mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] p-6">
        <h3 className="mb-4">Quick Actions</h3>
        <div className="flex gap-3">
          <Button className="bg-[#F7A654] hover:bg-[#F58E3C] text-white">
            <Lightbulb size={16} className="mr-2" />
            Generate Call Script
          </Button>
          <Button variant="outline">
            <HelpCircle size={16} className="mr-2" />
            Ask Why
          </Button>
          <Button variant="outline">
            <Volume2 size={16} className="mr-2" />
            Voice Playback
          </Button>
        </div>

        <div className="mt-6 p-4 bg-[#FFD9B3] rounded-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="text-[#F7A654] flex-shrink-0" size={20} />
            <div>
              <h4 className="text-sm mb-1">AI Reasoning</h4>
              <p className="text-sm text-[#555555]">
                This recommendation is based on analysis of 1,247 similar properties. 
                Implementing automated reminders has historically improved rent timeliness by 18% 
                while maintaining positive tenant relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
