import React, { useState } from 'react';
import Image from 'next/image';
import {
  Home, Building2, ClipboardList, BarChart3, Settings as SettingsIcon, Menu, Users, MessageSquare, Wrench, Calendar, DollarSign, ArrowLeft
} from 'lucide-react';

interface DarkSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const DarkSidebar: React.FC<DarkSidebarProps> = ({ 
  activeTab, 
  onTabChange,
  isCollapsed,
  onToggleCollapse
}) => {
  const [navigationView, setNavigationView] = useState<'main' | 'operations'>('main');

  const mainNavItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'properties', icon: Building2, label: 'Properties' },
    { id: 'tenants', icon: Users, label: 'Tenants' },
  ];

  const operationsItems = [
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'payments', icon: DollarSign, label: 'Payments' },
  ];

  const bottomNavItems = [
    { id: 'insights', icon: BarChart3, label: 'Insights' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  // Unified sidebar with smooth horizontal and vertical transitions
  return (
    <div className="fixed left-6 top-6 z-40">
      <div 
        className={`bg-[#E8EAF6] rounded-3xl flex flex-col shadow-[12px_12px_24px_#C8CADE,-12px_-12px_24px_#FFFFFF] transition-all duration-[400ms] ease-in-out ${
          isCollapsed 
            ? 'w-[56px] h-[56px]' 
            : 'w-[228px] h-[calc(100vh-48px)]'
        }`}
      >
        {/* Collapsed State - Just the Menu Button */}
        {isCollapsed && (
          <div className="w-full h-full flex items-center justify-center animate-in fade-in duration-300">
            <button
              onClick={onToggleCollapse}
              className="p-4 text-[#8B94A8] hover:text-[#FF8B65] transition-all"
              title="Expand sidebar"
            >
              <Menu size={20} />
            </button>
          </div>
        )}

        {/* Expanded State - Full Sidebar Content */}
        {!isCollapsed && (
          <>
            {/* Logo */}
            <div className="p-6 border-b border-[#D1D5E0] flex items-center justify-center animate-in fade-in slide-in-from-top-4 duration-500">
              <Image src="/images/logo.svg" alt="Propli.city" width={64} height={64} className="h-16 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
              {navigationView === 'main' ? (
                <div className="space-y-2">
                  {/* Main Navigation Items */}
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                            : 'text-[#8B94A8] hover:text-[#3E4C5E] bg-[#E8EAF6] shadow-[5px_5px_10px_#C8CADE,-5px_-5px_10px_#FFFFFF] hover:shadow-[3px_3px_8px_#C8CADE,-3px_-3px_8px_#FFFFFF] active:shadow-[inset_2px_2px_5px_#C8CADE,inset_-2px_-2px_5px_#FFFFFF]'
                        }`}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                        <span className="text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Operations Navigation Button */}
                  <button
                    onClick={() => setNavigationView('operations')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-[#8B94A8] hover:text-[#3E4C5E] bg-[#E8EAF6] shadow-[5px_5px_10px_#C8CADE,-5px_-5px_10px_#FFFFFF] hover:shadow-[3px_3px_8px_#C8CADE,-3px_-3px_8px_#FFFFFF] active:shadow-[inset_2px_2px_5px_#C8CADE,inset_-2px_-2px_5px_#FFFFFF]"
                  >
                    <ClipboardList size={18} className="flex-shrink-0" />
                    <span className="text-sm whitespace-nowrap">Operations</span>
                  </button>

                  {/* Bottom Navigation Items */}
                  {bottomNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                            : 'text-[#8B94A8] hover:text-[#3E4C5E] bg-[#E8EAF6] shadow-[5px_5px_10px_#C8CADE,-5px_-5px_10px_#FFFFFF] hover:shadow-[3px_3px_8px_#C8CADE,-3px_-3px_8px_#FFFFFF] active:shadow-[inset_2px_2px_5px_#C8CADE,inset_-2px_-2px_5px_#FFFFFF]'
                        }`}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                        <span className="text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Back Button */}
                  <button
                    onClick={() => setNavigationView('main')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-[#8B94A8] hover:text-[#3E4C5E] bg-[#E8EAF6] shadow-[5px_5px_10px_#C8CADE,-5px_-5px_10px_#FFFFFF] hover:shadow-[3px_3px_8px_#C8CADE,-3px_-3px_8px_#FFFFFF] active:shadow-[inset_2px_2px_5px_#C8CADE,inset_-2px_-2px_5px_#FFFFFF] mb-4"
                  >
                    <ArrowLeft size={18} className="flex-shrink-0" />
                    <span className="text-sm whitespace-nowrap">Back</span>
                  </button>

                  {/* Operations Title */}
                  <div className="px-4 py-2 mb-2">
                    <h3 className="text-xs uppercase tracking-wider text-[#B4BBCC]">Operations</h3>
                  </div>

                  {/* Operations Items */}
                  {operationsItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_4px_14px_rgba(255,139,101,0.4)]'
                            : 'text-[#8B94A8] hover:text-[#3E4C5E] bg-[#E8EAF6] shadow-[5px_5px_10px_#C8CADE,-5px_-5px_10px_#FFFFFF] hover:shadow-[3px_3px_8px_#C8CADE,-3px_-3px_8px_#FFFFFF] active:shadow-[inset_2px_2px_5px_#C8CADE,inset_-2px_-2px_5px_#FFFFFF]'
                        }`}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                        <span className="text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#D1D5E0] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              <div className="flex items-center gap-3 px-3 py-2 mb-3 rounded-2xl bg-[#E8EAF6] shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C4A1FF] to-[#B891EE] flex items-center justify-center text-sm text-white shadow-[0_3px_8px_rgba(196,161,255,0.4)]">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#3E4C5E]">John Doe</p>
                  <p className="text-xs text-[#B4BBCC]">Premium Plan</p>
                </div>
              </div>
              
              {/* Collapse Toggle Button */}
              <button
                onClick={onToggleCollapse}
                className="w-full px-4 py-3 flex items-center justify-center gap-2 text-[#8B94A8] hover:text-[#3E4C5E] bg-[#E8EAF6] rounded-2xl transition-all duration-200 shadow-[5px_5px_10px_#C8CADE,-5px_-5px_10px_#FFFFFF] hover:shadow-[3px_3px_8px_#C8CADE,-3px_-3px_8px_#FFFFFF] active:shadow-[inset_2px_2px_5px_#C8CADE,inset_-2px_-2px_5px_#FFFFFF]"
                title="Collapse sidebar"
              >
                <Menu size={18} />
                <span className="text-sm">Collapse</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
