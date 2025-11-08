import { useState } from 'react';
import { TrendingUp, TrendingDown, HelpCircle, Zap, Brain } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const roiData = [
  { month: 'Jan', roi: 12.5 },
  { month: 'Feb', roi: 13.2 },
  { month: 'Mar', roi: 14.1 },
  { month: 'Apr', roi: 13.8 },
  { month: 'May', roi: 15.2 },
  { month: 'Jun', roi: 16.3 },
];

const cashFlowData = [
  { month: 'Jan', income: 18500, expenses: 12200 },
  { month: 'Feb', income: 19200, expenses: 11800 },
  { month: 'Mar', income: 20100, expenses: 13500 },
  { month: 'Apr', income: 19800, expenses: 12900 },
  { month: 'May', income: 21200, expenses: 13200 },
  { month: 'Jun', income: 22500, expenses: 14100 },
];

const occupancyData = [
  { property: 'Oak St', occupancy: 95, income: 12500 },
  { property: 'Maple', occupancy: 87, income: 15200 },
  { property: 'Pine', occupancy: 100, income: 9800 },
  { property: 'Elm', occupancy: 78, income: 18900 },
];

interface InsightsProps {
  sidebarCollapsed?: boolean;
}

export function Insights({ sidebarCollapsed = true }: InsightsProps) {
  const [isAutopilot, setIsAutopilot] = useState(false);

  const aiSuggestions = [
    {
      title: 'Raise rent on Unit 2B by 7%',
      description: 'Market analysis shows 7-9% increase is viable based on recent comps in your area.',
      impact: '+$126/month',
      confidence: 92,
    },
    {
      title: 'High turnover zone detected',
      description: 'Oak Street Apartments has 40% higher turnover than portfolio average. Consider 12-month lease incentives.',
      impact: 'Est. -$4,200 savings/year',
      confidence: 88,
    },
    {
      title: 'Maintenance cost spike alert',
      description: 'Maple Plaza HVAC spending up 35% YoY. Recommend scheduling preventative review.',
      impact: 'Prevent est. $2,800 future repairs',
      confidence: 76,
    },
  ];

  return (
    <div className={`p-6 transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Page Header */}
      <div className="mb-6">
        <div className="text-center mb-6">
          <h1 className="text-[#3E4C5E] mb-2">Insights</h1>
          <p className="text-[#8B94A8]">AI-powered portfolio analytics and recommendations</p>
        </div>

        {/* Autopilot Toggle */}
        <div className="flex items-center justify-center gap-4 bg-[#E8EAF6] rounded-2xl p-4 max-w-md mx-auto shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center gap-2">
            <Brain size={20} className="text-[#FF8B65]" />
            <span className="text-sm text-[#3E4C5E]">Coaching Mode</span>
          </div>
          <Switch
            checked={isAutopilot}
            onCheckedChange={setIsAutopilot}
          />
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-[#FF8B65]" />
            <span className="text-sm text-[#3E4C5E]">Autopilot</span>
          </div>
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <div className="mb-6 bg-[#E8EAF6] border border-[#FF8B65]/30 rounded-2xl p-6 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={20} className="text-[#FF8B65]" />
          <h2 className="text-[#3E4C5E]">AI Suggestions</h2>
          {isAutopilot && (
            <span className="ml-auto px-3 py-1 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-full text-xs shadow-[0_2px_6px_rgba(255,139,101,0.3)]">
              Autopilot Active
            </span>
          )}
        </div>

        <div className="space-y-3">
          {aiSuggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="bg-[#E8EAF6] rounded-xl p-4 transition-all shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[#3E4C5E]">{suggestion.title}</h4>
                    <Popover>
                      <PopoverTrigger>
                        <HelpCircle size={16} className="text-[#8B94A8] hover:text-[#3E4C5E] transition-all cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="bg-[#E8EAF6] border-[#D1D5E0] text-[#3E4C5E]">
                        <p className="text-sm">
                          This insight is based on machine learning analysis of market trends,
                          your historical data, and comparable properties in your area.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-sm text-[#8B94A8] mb-2">{suggestion.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#FF8B65]">{suggestion.impact}</span>
                    <span className="text-xs text-[#8B94A8]">
                      {suggestion.confidence}% confidence
                    </span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-xl transition-all text-sm whitespace-nowrap shadow-[0_2px_6px_rgba(255,139,101,0.3)] hover:shadow-[0_4px_10px_rgba(255,139,101,0.4)]">
                  {isAutopilot ? 'Review' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* ROI Over Time */}
        <div className="bg-[#E8EAF6] rounded-2xl p-6 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#3E4C5E]">ROI Over Time</h3>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#6DD47E]" />
              <span className="text-sm text-[#6DD47E]">+28.5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C8CADE" />
              <XAxis dataKey="month" stroke="#8B94A8" />
              <YAxis stroke="#8B94A8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#E8EAF6',
                  border: '1px solid #D1D5E0',
                  borderRadius: '12px',
                  color: '#3E4C5E'
                }}
              />
              <Line type="monotone" dataKey="roi" stroke="#FF8B65" strokeWidth={3} dot={{ fill: '#FF8B65', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow */}
        <div className="bg-[#E8EAF6] rounded-2xl p-6 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <h3 className="text-[#3E4C5E] mb-4">Cash Flow Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C8CADE" />
              <XAxis dataKey="month" stroke="#8B94A8" />
              <YAxis stroke="#8B94A8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#E8EAF6',
                  border: '1px solid #D1D5E0',
                  borderRadius: '12px',
                  color: '#3E4C5E'
                }}
              />
              <Legend />
              <Bar dataKey="income" fill="#6DD47E" name="Income" />
              <Bar dataKey="expenses" fill="#FF6B7A" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupancy vs Income */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#E8EAF6] rounded-2xl p-6 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <h3 className="text-[#3E4C5E] mb-4">Occupancy vs Income</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C8CADE" />
              <XAxis dataKey="property" stroke="#8B94A8" />
              <YAxis stroke="#8B94A8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#E8EAF6',
                  border: '1px solid #D1D5E0',
                  borderRadius: '12px',
                  color: '#3E4C5E'
                }}
              />
              <Bar dataKey="occupancy" fill="#FF8B65" name="Occupancy %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tenant Risk Scores */}
        <div className="bg-[#E8EAF6] rounded-2xl p-6 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <h3 className="text-[#3E4C5E] mb-4">Tenant Risk Scores</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Chen - Unit 2B', score: 95, trend: 'up' },
              { name: 'Mike Johnson - Unit 4A', score: 87, trend: 'stable' },
              { name: 'Emma Davis - Unit 1C', score: 72, trend: 'down' },
              { name: 'Tom Wilson - Unit 3D', score: 91, trend: 'up' },
            ].map((tenant, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-[#3E4C5E]">{tenant.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-[#E8EAF6] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <div
                      className={`h-full ${
                        tenant.score >= 90 ? 'bg-[#6DD47E]' :
                        tenant.score >= 75 ? 'bg-[#FFB84D]' :
                        'bg-[#FF6B7A]'
                      }`}
                      style={{ width: `${tenant.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-[#8B94A8] w-8">{tenant.score}</span>
                  {tenant.trend === 'up' ? (
                    <TrendingUp size={16} className="text-[#6DD47E]" />
                  ) : tenant.trend === 'down' ? (
                    <TrendingDown size={16} className="text-[#FF6B7A]" />
                  ) : (
                    <div className="w-4"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
