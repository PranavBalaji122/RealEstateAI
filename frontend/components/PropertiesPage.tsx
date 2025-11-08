import { useState } from 'react';
import { MapPin, List, Building2, TrendingUp, TrendingDown, AlertCircle, Wrench, Plus, Filter, Search, X, Grid3x3, Clock, FileText, Eye, Upload, UserPlus, Home } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface PropertiesPageProps {
  sidebarCollapsed?: boolean;
}

export function PropertiesPage({ sidebarCollapsed = true }: PropertiesPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const properties = [
    {
      id: 1,
      name: 'Oak Street Apartments',
      address: '123 Oak St, Portland, OR',
      occupancy: { current: 3, total: 4 },
      income: 4800,
      roi: 12.5,
      trend: 'up',
      alerts: [
        { type: 'maintenance', label: 'Maintenance Needed' }
      ],
      tags: ['Multi-Family', 'Long-Term'],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      lat: 45.5231,
      lng: -122.6765,
      status: 'warning',
    },
    {
      id: 2,
      name: 'Maple Plaza',
      address: '456 Maple Ave, Portland, OR',
      occupancy: { current: 8, total: 8 },
      income: 12200,
      roi: 15.8,
      trend: 'up',
      alerts: [],
      tags: ['Multi-Family', 'Premium'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      lat: 45.5155,
      lng: -122.6789,
      status: 'good',
    },
    {
      id: 3,
      name: 'Pine View Condos',
      address: '789 Pine Rd, Portland, OR',
      occupancy: { current: 5, total: 6 },
      income: 7800,
      roi: 9.2,
      trend: 'down',
      alerts: [
        { type: 'rent', label: 'Late Rent Payment' },
        { type: 'lease', label: 'Lease Expiring Soon' }
      ],
      tags: ['Multi-Family', 'Downtown'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      lat: 45.5289,
      lng: -122.6625,
      status: 'issue',
    },
    {
      id: 4,
      name: 'Elm Street Lofts',
      address: '321 Elm Blvd, Portland, OR',
      occupancy: { current: 10, total: 12 },
      income: 18900,
      roi: 14.3,
      trend: 'up',
      alerts: [],
      tags: ['Multi-Family', 'Renovated'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      lat: 45.5198,
      lng: -122.6890,
      status: 'good',
    },
    {
      id: 5,
      name: 'Sunset Villas',
      address: '555 Sunset Dr, Portland, OR',
      occupancy: { current: 4, total: 5 },
      income: 9500,
      roi: 11.2,
      trend: 'up',
      alerts: [
        { type: 'maintenance', label: 'Routine Inspection Due' }
      ],
      tags: ['Short-Term', 'Vacation Rental'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      lat: 45.5102,
      lng: -122.6945,
      status: 'warning',
    },
    {
      id: 6,
      name: 'Harbor View Residences',
      address: '890 Harbor Blvd, Portland, OR',
      occupancy: { current: 6, total: 6 },
      income: 14500,
      roi: 16.7,
      trend: 'up',
      alerts: [],
      tags: ['Multi-Family', 'Waterfront'],
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
      lat: 45.5342,
      lng: -122.6698,
      status: 'good',
    },
  ];

  const handlePinClick = (property: any) => {
    setSelectedProperty(property);
    setIsDrawerOpen(true);
  };

  return (
    <div className={`transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    } ${viewMode === 'map' ? '' : 'p-6'}`}>
      {/* Page Header - Only show in Grid view */}
      {viewMode === 'grid' && (
        <>
          <div className="mb-6">
            <div className="text-center mb-6">
              <h1 className="text-[#3E4C5E] mb-2">Properties</h1>
              <p className="text-[#8B94A8]">Manage your real estate portfolio</p>
            </div>
          </div>

          {/* Search Bar and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B94A8]" size={20} />
              <input
                type="text"
                placeholder="Search properties by name, address, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-[#E8EAF6] rounded-2xl text-[#3E4C5E] placeholder:text-[#B4BBCC] focus:outline-none shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B94A8] hover:text-[#3E4C5E] transition-all"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button className="px-4 py-2 bg-[#E8EAF6] rounded-xl text-sm text-[#8B94A8] hover:text-[#3E4C5E] transition-all flex items-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                <MapPin size={16} />
                All Locations
              </button>
              <button className="px-4 py-2 bg-[#E8EAF6] rounded-xl text-sm text-[#8B94A8] hover:text-[#3E4C5E] transition-all flex items-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                <Home size={16} />
                Occupancy: All
              </button>
              <button className="px-4 py-2 bg-[#E8EAF6] rounded-xl text-sm text-[#8B94A8] hover:text-[#3E4C5E] transition-all flex items-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                <Building2 size={16} />
                All Tags
              </button>
              <button className="px-4 py-2 bg-[#E8EAF6] rounded-xl text-sm text-[#8B94A8] hover:text-[#3E4C5E] transition-all flex items-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                <AlertCircle size={16} />
                Alerts: All
              </button>
            </div>

            {/* View Toggle and Add Property */}
            <div className="flex items-center justify-center gap-3">
              {/* View Toggle */}
              <div className="flex gap-2 bg-[#E8EAF6] rounded-xl p-1 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_2px_8px_rgba(255,139,101,0.4)]'
                      : 'text-[#8B94A8] hover:text-[#3E4C5E]'
                  }`}
                >
                  <Grid3x3 size={16} />
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_2px_8px_rgba(255,139,101,0.4)]'
                      : 'text-[#8B94A8] hover:text-[#3E4C5E]'
                  }`}
                >
                  <MapPin size={16} />
                  Map View
                </button>
              </div>

              {/* Add Property Button */}
              <button className="px-5 py-2.5 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-xl transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,139,101,0.4)] hover:shadow-[0_6px_16px_rgba(255,139,101,0.5)]">
                <Plus size={18} />
                Add Property
              </button>
            </div>
          </div>
        </>
      )}

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-[#E8EAF6] rounded-2xl overflow-hidden transition-all group shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[4px_4px_10px_#C8CADE,-4px_-4px_10px_#FFFFFF]"
            >
              {/* Property Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Alert Icons */}
                {property.alerts.length > 0 && (
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {property.alerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg backdrop-blur-xl border shadow-lg ${
                          alert.type === 'rent'
                            ? 'bg-red-500/90 border-red-400'
                            : alert.type === 'maintenance'
                            ? 'bg-yellow-500/90 border-yellow-400'
                            : 'bg-orange-500/90 border-orange-400'
                        }`}
                        title={alert.label}
                      >
                        {alert.type === 'rent' ? (
                          <AlertCircle size={16} className="text-white" />
                        ) : alert.type === 'maintenance' ? (
                          <Wrench size={16} className="text-white" />
                        ) : (
                          <Clock size={16} className="text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                  {property.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-5">
                <h3 className="text-[#3E4C5E] mb-1">{property.name}</h3>
                <p className="text-sm text-[#8B94A8] mb-4 flex items-center gap-1.5">
                  <MapPin size={14} />
                  {property.address}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-[#E8EAF6] rounded-xl p-3 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <p className="text-xs text-[#8B94A8] mb-1">Occupancy</p>
                    <p className="text-[#3E4C5E]">
                      {property.occupancy.current}/{property.occupancy.total}
                    </p>
                  </div>
                  <div className="bg-[#E8EAF6] rounded-xl p-3 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <p className="text-xs text-[#8B94A8] mb-1">Monthly</p>
                    <p className="text-[#FF8B65]">${(property.income / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="bg-[#E8EAF6] rounded-xl p-3 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <p className="text-xs text-[#8B94A8] mb-1 flex items-center gap-1">
                      ROI
                      {property.trend === 'up' ? (
                        <TrendingUp size={12} className="text-[#6DD47E]" />
                      ) : (
                        <TrendingDown size={12} className="text-[#FF6B7A]" />
                      )}
                    </p>
                    <p className="text-[#3E4C5E]">{property.roi}%</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-3 py-2.5 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm shadow-[0_2px_6px_rgba(255,139,101,0.3)] hover:shadow-[0_4px_10px_rgba(255,139,101,0.4)]">
                    <Eye size={14} />
                    View
                  </button>
                  <button className="px-3 py-2.5 bg-[#E8EAF6] text-[#8B94A8] rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                    <UserPlus size={14} />
                    Unit
                  </button>
                  <button className="px-3 py-2.5 bg-[#E8EAF6] text-[#8B94A8] rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                    <Upload size={14} />
                    Doc
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Property Card */}
          <div className="bg-[#E8EAF6] border-dashed rounded-2xl transition-all flex items-center justify-center min-h-[500px] cursor-pointer group shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[4px_4px_10px_#C8CADE,-4px_-4px_10px_#FFFFFF] border-2 border-[#D1D5E0]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#E8EAF6] rounded-2xl flex items-center justify-center transition-all shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] group-hover:shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF]">
                <Plus size={28} className="text-[#8B94A8] group-hover:text-[#FF8B65] transition-all" />
              </div>
              <p className="text-[#8B94A8] group-hover:text-[#3E4C5E] transition-all">Add New Property</p>
            </div>
          </div>
        </div>
      ) : (
        // Map View - Full Screen
        <div className="relative h-screen w-full">
          {/* Map Container */}
          <div className="absolute inset-0 bg-[#E8EAF6]">
            {/* Simulated Map Background - Dark Theme */}
            <div className="w-full h-full relative" style={{
              backgroundImage: `
                linear-gradient(rgba(255, 179, 128, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 179, 128, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}>
              
              {/* Property Pins */}
              {properties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => handlePinClick(property)}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${((property.lng + 122.69) / 0.03) * 100}%`,
                    top: `${((45.53 - property.lat) / 0.02) * 100}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  {/* Pin Shadow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 rounded-full blur-sm group-hover:w-6 transition-all" />
                  
                  {/* Pin */}
                  <div className={`relative transition-all group-hover:scale-125 ${
                    property.status === 'good'
                      ? 'text-green-400'
                      : property.status === 'warning'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}>
                    <MapPin size={32} fill="currentColor" className="drop-shadow-lg" />
                    
                    {/* Pin Center Dot */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Hover Label */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                    <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-2 shadow-2xl">
                      <p className="text-white text-sm">{property.name}</p>
                      <p className="text-xs text-[#A3A3A3]">{property.roi}% ROI</p>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <div className="border-4 border-transparent border-t-black/90" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Top Controls Bar */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex gap-2 bg-[#E8EAF6] rounded-2xl p-1.5 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
              <button
                onClick={() => setViewMode('grid')}
                className="px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-[#8B94A8] hover:text-[#3E4C5E]"
              >
                <Grid3x3 size={16} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className="px-4 py-2 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-xl transition-all flex items-center gap-2 shadow-[0_2px_8px_rgba(255,139,101,0.4)]"
              >
                <MapPin size={16} />
                Map
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-[#E8EAF6] rounded-2xl px-4 py-2.5 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
              <Filter size={16} className="text-[#8B94A8]" />
              <select className="bg-transparent text-[#3E4C5E] text-sm outline-none cursor-pointer">
                <option>All Cities</option>
                <option>Portland, OR</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#E8EAF6] rounded-2xl px-4 py-2.5 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF]">
              <Home size={16} className="text-[#8B94A8]" />
              <select className="bg-transparent text-[#3E4C5E] text-sm outline-none cursor-pointer">
                <option>All Occupancy</option>
                <option>Full</option>
                <option>Partial</option>
              </select>
            </div>
          </div>

          {/* Floating Add Property Button */}
          <button className="absolute bottom-8 right-8 px-6 py-4 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-2xl transition-all flex items-center gap-2 shadow-[0_6px_20px_rgba(255,139,101,0.5)] z-20 hover:shadow-[0_8px_24px_rgba(255,139,101,0.6)] hover:scale-105">
            <Plus size={20} />
            Add Property
          </button>

          {/* Map Legend */}
          <div className="absolute bottom-8 left-8 bg-[#E8EAF6] rounded-2xl p-4 shadow-[8px_8px_16px_#C8CADE,-8px_-8px_16px_#FFFFFF] z-20">
            <p className="text-[#3E4C5E] text-sm mb-3">Property Status</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#6DD47E] rounded-full" />
                <span className="text-sm text-[#8B94A8]">All Good</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#FFB84D] rounded-full" />
                <span className="text-sm text-[#8B94A8]">Needs Attention</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#FF6B7A] rounded-full" />
                <span className="text-sm text-[#8B94A8]">Urgent Issue</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Drawer for Property Details */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="bg-[#E8EAF6] border-l border-[#D1D5E0] w-[400px]">
          {selectedProperty && (
            <>
              <SheetHeader>
                <SheetTitle className="text-[#3E4C5E]">{selectedProperty.name}</SheetTitle>
                <SheetDescription className="text-[#8B94A8] flex items-center gap-1.5">
                  <MapPin size={14} />
                  {selectedProperty.address}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Property Image */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Tags Overlay */}
                  <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                    {selectedProperty.tags.map((tag: string, idx: number) => (
                      <Badge key={idx} className="bg-black/60 backdrop-blur-xl border border-white/20 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#E8EAF6] rounded-xl p-4 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <p className="text-xs text-[#8B94A8] mb-1">Occupancy</p>
                    <p className="text-[#3E4C5E] text-lg">
                      {selectedProperty.occupancy.current}/{selectedProperty.occupancy.total}
                    </p>
                  </div>
                  <div className="bg-[#E8EAF6] rounded-xl p-4 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <p className="text-xs text-[#8B94A8] mb-1">Monthly</p>
                    <p className="text-[#FF8B65] text-lg">${(selectedProperty.income / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="bg-[#E8EAF6] rounded-xl p-4 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                    <p className="text-xs text-[#8B94A8] mb-1">ROI</p>
                    <p className="text-[#3E4C5E] text-lg flex items-center gap-1">
                      {selectedProperty.roi}%
                      {selectedProperty.trend === 'up' ? (
                        <TrendingUp size={14} className="text-[#6DD47E]" />
                      ) : (
                        <TrendingDown size={14} className="text-[#FF6B7A]" />
                      )}
                    </p>
                  </div>
                </div>

                {/* Alerts */}
                {selectedProperty.alerts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[#3E4C5E] text-sm">Active Alerts</p>
                    {selectedProperty.alerts.map((alert: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#E8EAF6] rounded-xl flex items-center gap-3 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF]"
                      >
                        {alert.type === 'rent' ? (
                          <AlertCircle size={18} className="text-[#FF6B7A]" />
                        ) : alert.type === 'maintenance' ? (
                          <Wrench size={18} className="text-[#FFB84D]" />
                        ) : (
                          <Clock size={18} className="text-[#FF8B65]" />
                        )}
                        <span className="text-sm text-[#8B94A8]">{alert.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-[#D1D5E0]">
                  <button className="w-full px-4 py-3 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,139,101,0.4)] hover:shadow-[0_6px_16px_rgba(255,139,101,0.5)]">
                    <Eye size={18} />
                    View Full Details
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-3 bg-[#E8EAF6] text-[#8B94A8] rounded-xl transition-all flex items-center justify-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                      <UserPlus size={16} />
                      Add Unit
                    </button>
                    <button className="px-4 py-3 bg-[#E8EAF6] text-[#8B94A8] rounded-xl transition-all flex items-center justify-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
                      <Upload size={16} />
                      Upload Doc
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
