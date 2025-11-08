import React from 'react';
import { MapPin, Home } from 'lucide-react';

export const PropertyMap: React.FC = () => {
  const properties = [
    { name: '742 Evergreen', occupancy: 100, status: 'occupied' },
    { name: '1060 W Addison', occupancy: 100, status: 'occupied' },
    { name: '456 Oak Ave', occupancy: 75, status: 'partial' },
    { name: '123 Fake St', occupancy: 0, status: 'vacant' },
  ];

  const statusColors = {
    occupied: 'bg-[#FFB380]',
    partial: 'bg-[#FBBF24]',
    vacant: 'bg-[#EF4444]'
  };

  return (
    <div className="h-full flex flex-col">
      {/* Map Placeholder */}
      <div className="relative flex-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-3 overflow-hidden min-h-[200px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-white/20 mx-auto mb-2" />
            <p className="text-sm text-[#A3A3A3]">Map View</p>
          </div>
        </div>
        
        {/* Simulated map pins */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-[#FFB380] rounded-full border-2 border-white/20 animate-pulse shadow-lg" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#FFB380] rounded-full border-2 border-white/20 animate-pulse shadow-lg" />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-[#FBBF24] rounded-full border-2 border-white/20 animate-pulse shadow-lg" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#EF4444] rounded-full border-2 border-white/20 animate-pulse shadow-lg" />
      </div>

      {/* Property List */}
      <div className="grid grid-cols-2 gap-2">
        {properties.map((prop, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className={`w-2 h-2 rounded-full ${statusColors[prop.status as keyof typeof statusColors]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs truncate text-white">{prop.name}</p>
              <p className="text-xs text-[#A3A3A3]">{prop.occupancy}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
