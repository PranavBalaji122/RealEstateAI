import { DollarSign, TrendingUp, Home, Plus } from 'lucide-react';
import KPICard from '@/components/KPICard';
import AIInsightCard from '@/components/AIInsightCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const roiData = [
  { month: 'Jan', value: 4.2 },
  { month: 'Feb', value: 4.5 },
  { month: 'Mar', value: 4.3 },
  { month: 'Apr', value: 4.8 },
  { month: 'May', value: 5.1 },
  { month: 'Jun', value: 5.4 },
];

const cashflowData = [
  { month: 'Jan', value: 12500 },
  { month: 'Feb', value: 13200 },
  { month: 'Mar', value: 12800 },
  { month: 'Apr', value: 14100 },
  { month: 'May', value: 15200 },
  { month: 'Jun', value: 16100 },
];

const properties = [
  {
    id: '1',
    address: '742 Evergreen Terrace',
    location: 'Springfield, IL',
    rent: '$2,400/mo',
    occupancy: 100,
  },
  {
    id: '2',
    address: '221B Baker Street',
    location: 'London, UK',
    rent: '$3,200/mo',
    occupancy: 100,
  },
  {
    id: '3',
    address: '1600 Pennsylvania Ave',
    location: 'Washington, DC',
    rent: '$5,800/mo',
    occupancy: 50,
  },
  {
    id: '4',
    address: '350 Fifth Avenue',
    location: 'New York, NY',
    rent: '$4,100/mo',
    occupancy: 100,
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="Portfolio Value"
          value="$2.4M"
          change="+8.2%"
          changeType="positive"
          icon={DollarSign}
        />
        <KPICard
          title="Monthly ROI"
          value="5.4%"
          change="+0.6%"
          changeType="positive"
          icon={TrendingUp}
        />
        <KPICard
          title="Active Leases"
          value="12"
          change="2 expiring soon"
          changeType="neutral"
          icon={Home}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* My Properties */}
        <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
          <div className="flex items-center justify-between mb-4">
            <h3>My Properties</h3>
            <Button variant="ghost" size="sm" className="text-[#F7A654]">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {properties.map((property) => (
              <div
                key={property.id}
                className="p-4 rounded-xl border border-[#E5E0DA] hover:border-[#F7A654] transition-colors cursor-pointer bg-[#F5F3F0]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{property.address}</h4>
                    <p className="text-xs text-[#555555]">{property.location}</p>
                  </div>
                  <span className="text-sm">{property.rent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#EFEAE5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F7A654] rounded-full"
                      style={{ width: `${property.occupancy}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#555555]">{property.occupancy}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-[#FFD9B3] rounded-3xl">
              <span className="text-sm">🧠</span>
            </div>
            <h3>AI Insights</h3>
          </div>
          
          <div className="space-y-3">
            <AIInsightCard
              type="warning"
              title="2 tenants behind on rent"
              description="Automated reminders sent. Historical data shows 85% pay within 3 days."
            />
            <AIInsightCard
              type="success"
              title="ROI trending +4.8%"
              description="Your portfolio is outperforming the market average by 2.3 percentage points."
            />
            <AIInsightCard
              type="insight"
              title="Maintenance optimization"
              description="Vendor consolidation could save $420/month across 3 properties."
            />
            <AIInsightCard
              type="insight"
              title="Lease renewal opportunity"
              description="742 Evergreen lease expires in 45 days. Suggest 3% increase based on market."
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* ROI Chart */}
        <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
          <h3 className="mb-4">ROI Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
              <XAxis dataKey="month" stroke="#555555" />
              <YAxis stroke="#555555" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F7A654"
                strokeWidth={3}
                dot={{ fill: '#F7A654', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cashflow Chart */}
        <div className="bg-[#F8F7F5] rounded-xl p-6 border border-[#E5E0DA]">
          <h3 className="mb-4">Monthly Cashflow</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
              <XAxis dataKey="month" stroke="#555555" />
              <YAxis stroke="#555555" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F7A654"
                strokeWidth={3}
                dot={{ fill: '#F7A654', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#F7A654] hover:bg-[#F58E3C] text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
        <Plus size={24} />
      </button>
    </div>
  );
}
