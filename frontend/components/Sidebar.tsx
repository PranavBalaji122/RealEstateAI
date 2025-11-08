import { Home, Building2, Mail, Calendar, GraduationCap, TrendingUp, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'properties', icon: Building2, label: 'Properties' },
    { id: 'inbox', icon: Mail, label: 'Inbox' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'coaching', icon: GraduationCap, label: 'Coaching' },
    { id: 'roi-explorer', icon: TrendingUp, label: 'ROI Explorer' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#F8F7F5] border-r border-[#E5E0DA] flex flex-col">
      <div className="p-6 border-b border-[#E5E0DA]">
        <h2 className="text-[#F7A654]">Proplicity</h2>
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                isActive
                  ? 'bg-[#FFD9B3] text-[#1A1A1A]'
                  : 'text-[#555555] hover:bg-[#EFEAE5]'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
