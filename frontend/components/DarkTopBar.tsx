import React, { useState } from 'react';
import { Search, Bell, Plus, Save } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

interface DarkTopBarProps {
  showLayoutControls?: boolean;
  onAddWidget?: () => void;
  onSaveLayout?: () => void;
  sidebarCollapsed?: boolean;
}

export const DarkTopBar: React.FC<DarkTopBarProps> = ({ 
  showLayoutControls = false,
  onAddWidget,
  onSaveLayout,
  sidebarCollapsed = false
}) => {
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);

  return (
    <div 
      className={`fixed top-0 right-0 h-16 bg-[#171717] border-b border-[#404040] flex items-center justify-between px-6 z-10 transition-all duration-300 ${
        sidebarCollapsed ? 'left-[64px]' : 'left-[240px]'
      }`}
    >
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={18} />
          <input
            type="text"
            placeholder="Search properties, tenants, documents..."
            className="w-full pl-10 pr-4 py-2 bg-[#262626] border border-[#404040] rounded-lg text-sm text-[#FAFAFA] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFB380] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">
        {/* Layout Controls (only show on dashboard) */}
        {showLayoutControls && (
          <>
            <Button
              onClick={onAddWidget}
              size="sm"
              className="bg-[#262626] text-[#FAFAFA] hover:bg-[#404040] border border-[#404040]"
            >
              <Plus size={16} className="mr-2" />
              Add Widget
            </Button>
            <Button
              onClick={onSaveLayout}
              size="sm"
              className="bg-[#FFB380] text-[#0A0A0A] hover:bg-[#FF9B5E]"
            >
              <Save size={16} className="mr-2" />
              Save Layout
            </Button>
            <div className="w-px h-6 bg-[#404040]" />
          </>
        )}

        {/* Autopilot Toggle */}
        <div className="flex items-center gap-3 px-3 py-2 bg-[#262626] rounded-lg border border-[#404040]">
          <span className="text-sm text-[#A3A3A3]">Autopilot</span>
          <Switch 
            checked={autopilotEnabled}
            onCheckedChange={setAutopilotEnabled}
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#262626] rounded-lg transition-colors">
          <Bell size={20} className="text-[#A3A3A3]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFB380] rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-1.5 hover:bg-[#262626] rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center border border-[#404040]">
            <span className="text-sm">JD</span>
          </div>
        </button>
      </div>
    </div>
  );
};
