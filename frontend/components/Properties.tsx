import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const properties = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIzMjA0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: '742 Evergreen Terrace',
    location: 'Springfield, IL',
    rent: '$2,400/mo',
    roi: 5.2,
    occupancy: 'Occupied' as const,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1599412965471-e5f860059f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25kbyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjM3NTAwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    address: '221B Baker Street',
    location: 'London, UK',
    rent: '$3,200/mo',
    roi: 6.8,
    occupancy: 'Occupied' as const,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc2MjM4OTg5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    address: '1600 Pennsylvania Ave',
    location: 'Washington, DC',
    rent: '$5,800/mo',
    roi: 4.1,
    occupancy: 'Partial' as const,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1673165432945-a62c1a82d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3dudG93biUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjIzMzY5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: '350 Fifth Avenue',
    location: 'New York, NY',
    rent: '$4,100/mo',
    roi: 7.2,
    occupancy: 'Occupied' as const,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW50YWwlMjBwcm9wZXJ0eXxlbnwxfHx8fDE3NjI0MjE0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    address: '1 Infinite Loop',
    location: 'Cupertino, CA',
    rent: '$6,200/mo',
    roi: 8.5,
    occupancy: 'Vacant' as const,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1739203545077-8a191237e941?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHByb3BlcnR5fGVufDF8fHx8MTc2MjQyMTQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    address: '221 Pine Street',
    location: 'San Francisco, CA',
    rent: '$4,800/mo',
    roi: 6.3,
    occupancy: 'Occupied' as const,
  },
];

const tenants = [
  { name: 'John Smith', unit: 'Unit A', lastPayment: 'Nov 1, 2025', status: 'On Time' },
  { name: 'Sarah Johnson', unit: 'Unit B', lastPayment: 'Oct 28, 2025', status: 'Late' },
  { name: 'Michael Chen', unit: 'Unit C', lastPayment: 'Nov 1, 2025', status: 'On Time' },
];

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  if (selectedProperty) {
    return (
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedProperty(null)}
          className="mb-4"
        >
          ← Back to Properties
        </Button>

        <div className="bg-[#F8F7F5] rounded-xl border border-[#E5E0DA] overflow-hidden">
          <div className="p-6 border-b border-[#E5E0DA]">
            <h2>742 Evergreen Terrace</h2>
            <p className="text-[#555555]">Springfield, IL</p>
          </div>

          <Tabs defaultValue="overview" className="p-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-[#EFEAE5] rounded-xl">
                    <p className="text-[#555555] text-sm mb-1">Purchase Price</p>
                    <p>$385,000</p>
                  </div>
                  <div className="p-4 bg-[#EFEAE5] rounded-xl">
                    <p className="text-[#555555] text-sm mb-1">Current Value</p>
                    <p>$428,000</p>
                  </div>
                  <div className="p-4 bg-[#EFEAE5] rounded-xl">
                    <p className="text-[#555555] text-sm mb-1">Monthly Rent</p>
                    <p>$2,400</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-[#EFEAE5] rounded-xl">
                    <p className="text-[#555555] text-sm mb-1">Annual ROI</p>
                    <p className="text-[#3CB371]">5.2%</p>
                  </div>
                  <div className="p-4 bg-[#EFEAE5] rounded-xl">
                    <p className="text-[#555555] text-sm mb-1">Occupancy</p>
                    <Badge className="bg-[#3CB371] text-white">100%</Badge>
                  </div>
                  <div className="p-4 bg-[#FFD9B3] rounded-xl">
                    <p className="text-[#555555] text-sm mb-1">AI Note</p>
                    <p className="text-sm">Vacancy risk predicted: Low</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="mt-6">
              <div className="space-y-3">
                {tenants.map((tenant, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-[#E5E0DA] rounded-xl flex items-center justify-between bg-[#F5F3F0]"
                  >
                    <div>
                      <h4 className="text-sm">{tenant.name}</h4>
                      <p className="text-xs text-[#555555]">{tenant.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Last Payment: {tenant.lastPayment}</p>
                      <Badge className={tenant.status === 'On Time' ? 'bg-[#3CB371] text-white' : 'bg-[#FBBF24] text-white'}>
                        {tenant.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-6">
              <p className="text-[#555555]">No pending maintenance requests</p>
            </TabsContent>

            <TabsContent value="expenses" className="mt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border-b border-[#E5E0DA]">
                  <span className="text-sm">Property Tax</span>
                  <span className="text-sm">$320/mo</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-[#E5E0DA]">
                  <span className="text-sm">HOA Fees</span>
                  <span className="text-sm">$150/mo</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-[#E5E0DA]">
                  <span className="text-sm">Insurance</span>
                  <span className="text-sm">$95/mo</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <p className="text-[#555555]">Lease agreements, tax documents, and property photos</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Properties</h2>
        <Button className="bg-[#F7A654] hover:bg-[#F58E3C] text-white">
          <Plus size={18} className="mr-2" />
          Add Property
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" size={18} />
          <Input
            placeholder="Search properties..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter size={18} className="mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onClick={() => setSelectedProperty(property.id)}
          />
        ))}
      </div>
    </div>
  );
}
