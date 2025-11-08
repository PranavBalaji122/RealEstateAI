import { useState, createElement } from 'react';
import { 
  Search, Filter, X, User, Home, Calendar, DollarSign, 
  AlertCircle, TrendingUp, TrendingDown, Phone, Mail, 
  MessageSquare, FileText, Wrench, Clock, ChevronRight,
  Download, Eye, Send, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  rentStatus: 'current' | 'late' | 'upcoming';
  daysLate?: number;
  riskScore: number; // 0-100, lower is better
  paymentHistory: { month: string; amount: number; status: 'paid' | 'late' | 'partial' }[];
  maintenanceRequests: number;
  avatar?: string;
}

interface TenantsPageProps {
  sidebarCollapsed?: boolean;
}

export function TenantsPage({ sidebarCollapsed = true }: TenantsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const tenants: Tenant[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      property: 'Oak Street Apartments',
      unit: 'A-101',
      leaseStart: '2024-01-15',
      leaseEnd: '2025-01-14',
      rentAmount: 1200,
      rentStatus: 'current',
      riskScore: 15,
      paymentHistory: [
        { month: 'Oct', amount: 1200, status: 'paid' },
        { month: 'Sep', amount: 1200, status: 'paid' },
        { month: 'Aug', amount: 1200, status: 'paid' },
        { month: 'Jul', amount: 1200, status: 'paid' },
        { month: 'Jun', amount: 1200, status: 'paid' },
        { month: 'May', amount: 1200, status: 'paid' },
      ],
      maintenanceRequests: 2,
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '(555) 234-5678',
      property: 'Maple Plaza',
      unit: 'B-205',
      leaseStart: '2023-06-01',
      leaseEnd: '2025-05-31',
      rentAmount: 1500,
      rentStatus: 'late',
      daysLate: 12,
      riskScore: 72,
      paymentHistory: [
        { month: 'Oct', amount: 0, status: 'late' },
        { month: 'Sep', amount: 1500, status: 'late' },
        { month: 'Aug', amount: 1500, status: 'paid' },
        { month: 'Jul', amount: 1500, status: 'late' },
        { month: 'Jun', amount: 1500, status: 'paid' },
        { month: 'May', amount: 1000, status: 'partial' },
      ],
      maintenanceRequests: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '(555) 345-6789',
      property: 'Pine View Condos',
      unit: 'C-302',
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      rentAmount: 1350,
      rentStatus: 'current',
      riskScore: 8,
      paymentHistory: [
        { month: 'Oct', amount: 1350, status: 'paid' },
        { month: 'Sep', amount: 1350, status: 'paid' },
        { month: 'Aug', amount: 1350, status: 'paid' },
        { month: 'Jul', amount: 1350, status: 'paid' },
        { month: 'Jun', amount: 1350, status: 'paid' },
        { month: 'May', amount: 1350, status: 'paid' },
      ],
      maintenanceRequests: 1,
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'dthompson@email.com',
      phone: '(555) 456-7890',
      property: 'Elm Street Lofts',
      unit: 'D-401',
      leaseStart: '2023-09-15',
      leaseEnd: '2024-09-14',
      rentAmount: 1800,
      rentStatus: 'upcoming',
      riskScore: 28,
      paymentHistory: [
        { month: 'Oct', amount: 1800, status: 'paid' },
        { month: 'Sep', amount: 1800, status: 'paid' },
        { month: 'Aug', amount: 1800, status: 'late' },
        { month: 'Jul', amount: 1800, status: 'paid' },
        { month: 'Jun', amount: 1800, status: 'paid' },
        { month: 'May', amount: 1800, status: 'paid' },
      ],
      maintenanceRequests: 3,
    },
    {
      id: 5,
      name: 'Jessica Williams',
      email: 'jwilliams@email.com',
      phone: '(555) 567-8901',
      property: 'Sunset Villas',
      unit: 'E-105',
      leaseStart: '2024-05-01',
      leaseEnd: '2025-04-30',
      rentAmount: 1900,
      rentStatus: 'current',
      riskScore: 5,
      paymentHistory: [
        { month: 'Oct', amount: 1900, status: 'paid' },
        { month: 'Sep', amount: 1900, status: 'paid' },
        { month: 'Aug', amount: 1900, status: 'paid' },
        { month: 'Jul', amount: 1900, status: 'paid' },
        { month: 'Jun', amount: 1900, status: 'paid' },
        { month: 'May', amount: 1900, status: 'paid' },
      ],
      maintenanceRequests: 0,
    },
    {
      id: 6,
      name: 'Robert Martinez',
      email: 'rmartinez@email.com',
      phone: '(555) 678-9012',
      property: 'Harbor View Residences',
      unit: 'F-203',
      leaseStart: '2023-11-01',
      leaseEnd: '2024-10-31',
      rentAmount: 2200,
      rentStatus: 'late',
      daysLate: 5,
      riskScore: 55,
      paymentHistory: [
        { month: 'Oct', amount: 0, status: 'late' },
        { month: 'Sep', amount: 2200, status: 'paid' },
        { month: 'Aug', amount: 2200, status: 'paid' },
        { month: 'Jul', amount: 2200, status: 'late' },
        { month: 'Jun', amount: 2200, status: 'paid' },
        { month: 'May', amount: 2200, status: 'paid' },
      ],
      maintenanceRequests: 4,
    },
  ];

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400';
    if (score < 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskBadge = (score: number) => {
    if (score < 30) return { label: 'Low Risk', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    if (score < 60) return { label: 'Medium Risk', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return { label: 'High Risk', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  };

  const getStatusBadge = (status: string, daysLate?: number) => {
    switch (status) {
      case 'current':
        return { label: 'Current', icon: CheckCircle, color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'late':
        return { label: `${daysLate} days late`, icon: XCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'upcoming':
        return { label: 'Due Soon', icon: Clock, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      default:
        return { label: 'Unknown', icon: AlertCircle, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === 'all' || tenant.property === selectedProperty;
    const matchesStatus = selectedStatus === 'all' || tenant.rentStatus === selectedStatus;
    const matchesRisk = selectedRisk === 'all' || 
                       (selectedRisk === 'low' && tenant.riskScore < 30) ||
                       (selectedRisk === 'medium' && tenant.riskScore >= 30 && tenant.riskScore < 60) ||
                       (selectedRisk === 'high' && tenant.riskScore >= 60);
    
    return matchesSearch && matchesProperty && matchesStatus && matchesRisk;
  });

  const handleTenantClick = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsProfileOpen(true);
  };

  return (
    <div className={`p-6 transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-[#3E4C5E] mb-2">Tenants</h1>
        <p className="text-[#8B94A8]">Manage tenant relationships and track payment health</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={20} />
          <input
            type="text"
            placeholder="Search tenants by name, unit, or property..."
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
          <div className="flex items-center gap-2 bg-[#E8EAF6] rounded-xl px-4 py-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF]">
            <Home size={16} className="text-[#8B94A8]" />
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="bg-transparent text-[#3E4C5E] text-sm outline-none cursor-pointer"
            >
              <option value="all">All Properties</option>
              <option value="Oak Street Apartments">Oak Street Apartments</option>
              <option value="Maple Plaza">Maple Plaza</option>
              <option value="Pine View Condos">Pine View Condos</option>
              <option value="Elm Street Lofts">Elm Street Lofts</option>
              <option value="Sunset Villas">Sunset Villas</option>
              <option value="Harbor View Residences">Harbor View Residences</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-[#E8EAF6] rounded-xl px-4 py-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF]">
            <DollarSign size={16} className="text-[#8B94A8]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-[#3E4C5E] text-sm outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="current">Current</option>
              <option value="late">Late</option>
              <option value="upcoming">Due Soon</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-[#E8EAF6] rounded-xl px-4 py-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF]">
            <AlertCircle size={16} className="text-[#8B94A8]" />
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-transparent text-[#3E4C5E] text-sm outline-none cursor-pointer"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#E8EAF6] rounded-2xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#8B94A8]">Total Tenants</p>
            <User size={18} className="text-[#FF8B65]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{tenants.length}</p>
        </div>

        <div className="bg-[#E8EAF6] rounded-2xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#8B94A8]">Current Payments</p>
            <CheckCircle size={18} className="text-[#6DD47E]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{tenants.filter(t => t.rentStatus === 'current').length}</p>
        </div>

        <div className="bg-[#E8EAF6] rounded-2xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#8B94A8]">Late Payments</p>
            <AlertTriangle size={18} className="text-[#FF6B7A]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{tenants.filter(t => t.rentStatus === 'late').length}</p>
        </div>

        <div className="bg-[#E8EAF6] rounded-2xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#8B94A8]">High Risk</p>
            <XCircle size={18} className="text-[#FF6B7A]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{tenants.filter(t => t.riskScore >= 60).length}</p>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-[#E8EAF6] rounded-2xl overflow-hidden shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#D1D5E0] hover:bg-transparent">
              <TableHead className="text-[#8B94A8]">Tenant</TableHead>
              <TableHead className="text-[#8B94A8]">Property / Unit</TableHead>
              <TableHead className="text-[#8B94A8]">Lease Dates</TableHead>
              <TableHead className="text-[#8B94A8]">Rent</TableHead>
              <TableHead className="text-[#8B94A8]">Status</TableHead>
              <TableHead className="text-[#8B94A8]">AI Risk Score</TableHead>
              <TableHead className="text-[#8B94A8]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => {
              const statusBadge = getStatusBadge(tenant.rentStatus, tenant.daysLate);
              const riskBadge = getRiskBadge(tenant.riskScore);
              const StatusIcon = statusBadge.icon;

              return (
                <TableRow
                  key={tenant.id}
                  onClick={() => handleTenantClick(tenant)}
                  className="border-b border-[#D1D5E0]/50 hover:bg-[#E8EAF6] hover:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] cursor-pointer transition-all"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] flex items-center justify-center text-white">
                        {tenant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[#3E4C5E]">{tenant.name}</p>
                        <p className="text-sm text-[#8B94A8]">{tenant.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-[#3E4C5E]">{tenant.property}</p>
                      <p className="text-sm text-[#8B94A8]">Unit {tenant.unit}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-[#8B94A8]">{new Date(tenant.leaseStart).toLocaleDateString()}</p>
                      <p className="text-[#8B94A8]">to {new Date(tenant.leaseEnd).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-[#3E4C5E]">${tenant.rentAmount.toLocaleString()}/mo</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${statusBadge.color} border flex items-center gap-1.5 w-fit`}>
                      <StatusIcon size={12} />
                      {statusBadge.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="h-2 bg-[#E8EAF6] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
                          <div
                            className={`h-full ${
                              tenant.riskScore < 30 ? 'bg-[#6DD47E]' :
                              tenant.riskScore < 60 ? 'bg-[#FFB84D]' :
                              'bg-[#FF6B7A]'
                            }`}
                            style={{ width: `${tenant.riskScore}%` }}
                          />
                        </div>
                      </div>
                      <Badge className={`${riskBadge.color} border text-xs`}>
                        {tenant.riskScore}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ChevronRight size={18} className="text-[#8B94A8]" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Tenant Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="bg-[#E8EAF6] border border-[#D1D5E0] max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTenant && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] flex items-center justify-center text-white text-xl">
                      {selectedTenant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <DialogTitle className="text-[#3E4C5E] text-2xl">{selectedTenant.name}</DialogTitle>
                      <DialogDescription className="text-[#8B94A8]">
                        {selectedTenant.property} - Unit {selectedTenant.unit}
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getRiskBadge(selectedTenant.riskScore).color} border mb-2`}>
                      {getRiskBadge(selectedTenant.riskScore).label}
                    </Badge>
                    <p className="text-sm text-[#8B94A8]">Risk Score: <span className={getRiskColor(selectedTenant.riskScore)}>{selectedTenant.riskScore}</span></p>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Lease Details */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-[#FFB380]" />
                      Lease Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#A3A3A3] mb-1">Lease Start</p>
                        <p className="text-white">{new Date(selectedTenant.leaseStart).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#A3A3A3] mb-1">Lease End</p>
                        <p className="text-white">{new Date(selectedTenant.leaseEnd).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#A3A3A3] mb-1">Monthly Rent</p>
                        <p className="text-[#FFB380] text-xl">${selectedTenant.rentAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#A3A3A3] mb-1">Rent Status</p>
                        <Badge className={`${getStatusBadge(selectedTenant.rentStatus, selectedTenant.daysLate).color} border flex items-center gap-1.5 w-fit`}>
                          {createElement(getStatusBadge(selectedTenant.rentStatus, selectedTenant.daysLate).icon, { size: 12 })}
                          {getStatusBadge(selectedTenant.rentStatus, selectedTenant.daysLate).label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white mb-4 flex items-center gap-2">
                      <User size={20} className="text-[#FFB380]" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-[#A3A3A3]" />
                        <div className="flex-1">
                          <p className="text-sm text-[#A3A3A3]">Email</p>
                          <p className="text-white">{selectedTenant.email}</p>
                        </div>
                        <button className="px-4 py-2 bg-[#FFB380] text-[#0A0A0A] rounded-xl hover:bg-[#FFB380]/90 transition-all flex items-center gap-2 text-sm">
                          <Send size={14} />
                          Send Email
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-[#A3A3A3]" />
                        <div className="flex-1">
                          <p className="text-sm text-[#A3A3A3]">Phone</p>
                          <p className="text-white">{selectedTenant.phone}</p>
                        </div>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/15 transition-all flex items-center gap-2 text-sm border border-white/10">
                          <MessageSquare size={14} />
                          Send SMS
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                      <Wrench size={24} className="text-[#FFB380] mx-auto mb-2" />
                      <p className="text-2xl text-white mb-1">{selectedTenant.maintenanceRequests}</p>
                      <p className="text-sm text-[#A3A3A3]">Maintenance Requests</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                      <Calendar size={24} className="text-[#FFB380] mx-auto mb-2" />
                      <p className="text-2xl text-white mb-1">
                        {Math.ceil((new Date(selectedTenant.leaseEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                      </p>
                      <p className="text-sm text-[#A3A3A3]">Days Until Lease End</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                      <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
                      <p className="text-2xl text-white mb-1">
                        {selectedTenant.paymentHistory.filter(p => p.status === 'paid').length}
                      </p>
                      <p className="text-sm text-[#A3A3A3]">On-Time Payments</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments" className="space-y-6">
                  {/* Payment History Chart */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white mb-4">Payment History (Last 6 Months)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={[...selectedTenant.paymentHistory].reverse()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="#A3A3A3" />
                        <YAxis stroke="#A3A3A3" />
                        <RechartsTooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(10, 10, 10, 0.95)', 
                            border: '1px solid rgba(255, 179, 128, 0.3)',
                            borderRadius: '12px',
                            color: '#fff'
                          }}
                        />
                        <Bar 
                          dataKey="amount" 
                          fill="#FFB380"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Payment Details Table */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white mb-4">Payment Details</h3>
                    <div className="space-y-3">
                      {selectedTenant.paymentHistory.map((payment, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                          <div className="flex items-center gap-3">
                            {payment.status === 'paid' ? (
                              <CheckCircle size={20} className="text-green-400" />
                            ) : payment.status === 'late' ? (
                              <XCircle size={20} className="text-red-400" />
                            ) : (
                              <AlertCircle size={20} className="text-yellow-400" />
                            )}
                            <div>
                              <p className="text-white">{payment.month} 2024</p>
                              <p className="text-sm text-[#A3A3A3] capitalize">{payment.status}</p>
                            </div>
                          </div>
                          <p className="text-white text-lg">
                            {payment.amount > 0 ? `$${payment.amount.toLocaleString()}` : 'Unpaid'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white mb-4">Lease Documents</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-[#FFB380]/20 rounded-xl">
                            <FileText size={24} className="text-[#FFB380]" />
                          </div>
                          <div>
                            <p className="text-white">Lease Agreement</p>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border text-xs">
                                Active
                              </Badge>
                              <p className="text-sm text-[#A3A3A3]">Signed: {new Date(selectedTenant.leaseStart).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-all" title="View">
                            <Eye size={18} className="text-[#A3A3A3]" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-all" title="Download">
                            <Download size={18} className="text-[#A3A3A3]" />
                          </button>
                        </div>
                      </div>

                      {/* AI Extracted Metadata */}
                      <div className="p-4 bg-gradient-to-br from-[#FFB380]/10 to-transparent border border-[#FFB380]/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-[#FFB380] rounded-full animate-pulse" />
                          <p className="text-sm text-[#FFB380]">AI-Extracted Metadata</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-[#A3A3A3]">Security Deposit</p>
                            <p className="text-white">${selectedTenant.rentAmount * 1.5}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#A3A3A3]">Pets Allowed</p>
                            <p className="text-white">Yes (2 max)</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#A3A3A3]">Utilities Included</p>
                            <p className="text-white">Water, Trash</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#A3A3A3]">Renewal Option</p>
                            <p className="text-white">Available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Maintenance Tab */}
                <TabsContent value="maintenance" className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white mb-4">Maintenance Requests</h3>
                    {selectedTenant.maintenanceRequests > 0 ? (
                      <div className="space-y-3">
                        {[...Array(selectedTenant.maintenanceRequests)].map((_, idx) => (
                          <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Wrench size={20} className="text-yellow-400" />
                                <div>
                                  <p className="text-white">
                                    {idx === 0 ? 'Leaking Faucet' : 
                                     idx === 1 ? 'AC Not Cooling' : 
                                     idx === 2 ? 'Light Fixture Broken' :
                                     idx === 3 ? 'Door Lock Issue' :
                                     'Window Screen Damaged'}
                                  </p>
                                  <p className="text-sm text-[#A3A3A3]">
                                    Submitted: {new Date(Date.now() - idx * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge className={
                                idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border' :
                                idx === 1 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 border' :
                                'bg-green-500/20 text-green-400 border-green-500/30 border'
                              }>
                                {idx === 0 ? 'In Progress' : idx === 1 ? 'Scheduled' : 'Completed'}
                              </Badge>
                            </div>
                            {idx < 2 && (
                              <p className="text-sm text-[#A3A3A3] pl-8">
                                {idx === 0 ? 'Plumber scheduled for tomorrow at 2 PM' : 
                                 'HVAC technician will arrive Friday'}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                        <p className="text-white mb-2">No Maintenance Requests</p>
                        <p className="text-sm text-[#A3A3A3]">This tenant has no active or recent maintenance requests</p>
                      </div>
                    )}
                  </div>

                  {/* Late Rent Flags */}
                  {selectedTenant.rentStatus === 'late' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-red-400 mb-2">Late Rent Alert</h3>
                          <p className="text-white mb-3">Payment is {selectedTenant.daysLate} days overdue</p>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 text-sm">
                              <Send size={14} />
                              Send Reminder
                            </button>
                            <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/15 transition-all flex items-center gap-2 text-sm border border-white/10">
                              <Phone size={14} />
                              Call Tenant
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
