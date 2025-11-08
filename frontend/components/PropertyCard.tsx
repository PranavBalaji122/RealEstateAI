import { MapPin, TrendingUp, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  id: string;
  image: string;
  address: string;
  location: string;
  rent: string;
  roi: number;
  occupancy: 'Occupied' | 'Vacant' | 'Partial';
  onClick?: () => void;
}

export default function PropertyCard({ image, address, location, rent, roi, occupancy, onClick }: PropertyCardProps) {
  const occupancyColors = {
    Occupied: 'bg-[#3CB371] text-white',
    Vacant: 'bg-[#E57373] text-white',
    Partial: 'bg-[#FBBF24] text-white',
  };

  return (
    <div className="bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-[#EFEAE5]">
        <ImageWithFallback
          src={image}
          alt={address}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="mb-1">{address}</h4>
            <div className="flex items-center gap-1 text-[#555555] text-sm">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          </div>
          <Badge className={occupancyColors[occupancy]}>{occupancy}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#E5E0DA]">
          <div>
            <p className="text-[#555555] text-xs mb-1">Monthly Rent</p>
            <p className="text-sm">{rent}</p>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-[#F7A654]" />
              <p className="text-[#555555] text-xs mb-1">ROI</p>
            </div>
            <p className="text-sm">{roi}%</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onClick}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-[#F7A654] hover:bg-[#F58E3C] text-white"
          >
            Insights
          </Button>
        </div>
      </div>
    </div>
  );
}
