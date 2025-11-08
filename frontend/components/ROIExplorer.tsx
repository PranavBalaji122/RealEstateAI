import { useState } from 'react';
import { MapPin, TrendingUp, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

const properties = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIzMjA0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: '123 Market Street',
    location: 'Austin, TX',
    price: '$425,000',
    expectedROI: 8.2,
    paybackPeriod: '12.2 years',
    confidence: 85,
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1599412965471-e5f860059f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25kbyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjM3NTAwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    address: '456 Oak Avenue',
    location: 'Denver, CO',
    price: '$385,000',
    expectedROI: 7.5,
    paybackPeriod: '13.3 years',
    confidence: 78,
    lat: 39.7392,
    lng: -104.9903,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc2MjM4OTg5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    address: '789 Pine Drive',
    location: 'Nashville, TN',
    price: '$310,000',
    expectedROI: 9.1,
    paybackPeriod: '11.0 years',
    confidence: 92,
    lat: 36.1627,
    lng: -86.7816,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1673165432945-a62c1a82d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3dudG93biUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjIzMzY5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: '321 River Road',
    location: 'Portland, OR',
    price: '$445,000',
    expectedROI: 6.8,
    paybackPeriod: '14.7 years',
    confidence: 71,
    lat: 45.5152,
    lng: -122.6784,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW50YWwlMjBwcm9wZXJ0eXxlbnwxfHx8fDE3NjI0MjE0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: '654 Elm Street',
    location: 'Raleigh, NC',
    price: '$295,000',
    expectedROI: 8.9,
    paybackPeriod: '11.2 years',
    confidence: 88,
    lat: 35.7796,
    lng: -78.6382,
  },
];

export default function ROIExplorer() {
  const [roiRange, setRoiRange] = useState([0]);
  const [budgetRange, setBudgetRange] = useState([500000]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>ROI Explorer</h2>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-6 border border-[#E0E0E0] mb-6">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="text-sm text-[#555555] mb-2 block">Location</label>
            <input
              type="text"
              placeholder="City, State"
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7A654]"
            />
          </div>
          <div>
            <label className="text-sm text-[#555555] mb-2 block">
              Max Budget: ${budgetRange[0].toLocaleString()}
            </label>
            <Slider
              value={budgetRange}
              onValueChange={setBudgetRange}
              max={1000000}
              step={10000}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm text-[#555555] mb-2 block">
              Min ROI: {roiRange[0]}%
            </label>
            <Slider
              value={roiRange}
              onValueChange={setRoiRange}
              max={15}
              step={0.5}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm text-[#555555] mb-2 block">Cap Rate</label>
            <Slider defaultValue={[0]} max={10} step={0.5} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Map View */}
        <div className="col-span-2 bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
          <div className="h-[600px] bg-[#FAFAFA] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-[#F7A654] mx-auto mb-3" />
                <p className="text-[#555555]">Interactive Map View</p>
                <p className="text-sm text-[#555555]">Properties marked by ROI potential</p>
              </div>
            </div>
            
            {/* Mock Map Markers */}
            {properties.map((property, idx) => (
              <div
                key={property.id}
                className="absolute bg-[#F7A654] text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#F58E3C] transition-colors shadow-lg"
                style={{
                  top: `${20 + idx * 15}%`,
                  left: `${30 + idx * 10}%`,
                }}
              >
                <span className="text-xs">{property.expectedROI}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative h-32 bg-[#FAFAFA]">
                <ImageWithFallback
                  src={property.image}
                  alt={property.address}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star size={14} />
                </Button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{property.address}</h4>
                    <div className="flex items-center gap-1 text-[#555555] text-xs">
                      <MapPin size={12} />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <Badge className="bg-[#3CB371] text-white">
                    {property.expectedROI}%
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-[#E0E0E0]">
                  <div>
                    <p className="text-xs text-[#555555]">Price</p>
                    <p className="text-sm">{property.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#555555]">Payback</p>
                    <p className="text-sm">{property.paybackPeriod}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#555555]">AI Confidence</span>
                    <span className="text-xs">{property.confidence}%</span>
                  </div>
                  <div className="h-2 bg-[#FAFAFA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F7A654] to-[#F58E3C] rounded-full"
                      style={{ width: `${property.confidence}%` }}
                    />
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-[#F7A654] hover:bg-[#F58E3C] text-white"
                >
                  Add to Watchlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
