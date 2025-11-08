import { Search, Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-[#F8F7F5] border-b border-[#E5E0DA] flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" size={18} />
          <input
            type="text"
            placeholder="Search properties, tenants... (⌘ + K)"
            className="w-full pl-10 pr-4 py-2 bg-[#EFEAE5] border border-[#E5E0DA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7A654]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#555555] text-sm">Autopilot</span>
          <Switch />
        </div>

        <button className="relative p-2 hover:bg-[#EFEAE5] rounded-xl">
          <Bell size={20} className="text-[#555555]" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#F7A654] text-white text-xs">
            3
          </Badge>
        </button>

        <Avatar>
          <AvatarFallback className="bg-[#F7A654] text-white">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
