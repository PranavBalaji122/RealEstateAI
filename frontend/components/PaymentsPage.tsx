import React, { useState } from 'react';
import { DollarSign, Search, Download, Send, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type PaymentStatus = 'Paid' | 'Late' | 'Upcoming' | 'Processing';

interface Payment {
  id: string;
  tenant: string;
  property: string;
  unit: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: PaymentStatus;
  method?: string;
  invoiceId: string;
}

interface PaymentsPageProps {
  sidebarCollapsed?: boolean;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({ sidebarCollapsed = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all');

  const payments: Payment[] = [
    {
      id: '1',
      tenant: 'Sarah Johnson',
      property: 'Oak Street Apartments',
      unit: '2B',
      amount: 1800,
      dueDate: new Date(2025, 10, 1),
      paidDate: new Date(2025, 10, 1),
      status: 'Paid',
      method: 'ACH Transfer',
      invoiceId: 'INV-2025-001'
    },
    {
      id: '2',
      tenant: 'Mike Rodriguez',
      property: 'Maple Plaza',
      unit: '4A',
      amount: 2200,
      dueDate: new Date(2025, 10, 1),
      status: 'Late',
      invoiceId: 'INV-2025-002'
    },
    {
      id: '3',
      tenant: 'Emma Chen',
      property: 'Pine View',
      unit: '1C',
      amount: 1950,
      dueDate: new Date(2025, 10, 15),
      status: 'Upcoming',
      invoiceId: 'INV-2025-003'
    },
    {
      id: '4',
      tenant: 'Lisa Anderson',
      property: 'Maple Plaza',
      unit: '3B',
      amount: 2100,
      dueDate: new Date(2025, 10, 1),
      paidDate: new Date(2025, 10, 2),
      status: 'Paid',
      method: 'Credit Card',
      invoiceId: 'INV-2025-004'
    },
    {
      id: '5',
      tenant: 'Michael Torres',
      property: 'Oak Street Apartments',
      unit: '7C',
      amount: 1750,
      dueDate: new Date(2025, 10, 5),
      status: 'Processing',
      method: 'ACH Transfer',
      invoiceId: 'INV-2025-005'
    }
  ];

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#4CAF50]/20 text-[#4CAF50]';
      case 'Late':
        return 'bg-[#FF6B7A]/20 text-[#FF6B7A]';
      case 'Upcoming':
        return 'bg-[#C4A1FF]/20 text-[#8B7AB8]';
      case 'Processing':
        return 'bg-[#FFB84D]/20 text-[#FF8B65]';
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle size={14} />;
      case 'Late':
        return <AlertCircle size={14} />;
      case 'Upcoming':
        return <Clock size={14} />;
      case 'Processing':
        return <Clock size={14} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredPayments = payments.filter(payment => {
    if (filterStatus !== 'all' && payment.status !== filterStatus) return false;
    if (searchQuery && !payment.tenant.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !payment.property.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const lateAmount = payments.filter(p => p.status === 'Late').reduce((sum, p) => sum + p.amount, 0);
  const upcomingAmount = payments.filter(p => p.status === 'Upcoming').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className={`p-8 space-y-6 transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-[#3E4C5E]">Payments</h1>
          <p className="text-[#8B94A8]">Track and manage rent payments</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-[#E8EAF6] text-[#8B94A8] rounded-xl transition-all flex items-center gap-2 shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]">
            <Download size={18} />
            Export
          </button>
          <button className="px-5 py-3 bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white rounded-xl transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,139,101,0.4)] hover:shadow-[0_6px_16px_rgba(255,139,101,0.5)]">
            <Send size={18} />
            Send Reminder
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#E8EAF6] rounded-xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#8B94A8] text-sm">Total Expected</p>
            <DollarSign size={18} className="text-[#3E4C5E]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{formatCurrency(totalAmount)}</p>
        </div>

        <div className="bg-[#E8EAF6] rounded-xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#6DD47E] text-sm">Collected</p>
            <CheckCircle size={18} className="text-[#6DD47E]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{formatCurrency(paidAmount)}</p>
        </div>

        <div className="bg-[#E8EAF6] rounded-xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#FF6B7A] text-sm">Late Payments</p>
            <AlertCircle size={18} className="text-[#FF6B7A]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{formatCurrency(lateAmount)}</p>
        </div>

        <div className="bg-[#E8EAF6] rounded-xl p-5 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#C4A1FF] text-sm">Upcoming</p>
            <Clock size={18} className="text-[#C4A1FF]" />
          </div>
          <p className="text-[#3E4C5E] text-2xl">{formatCurrency(upcomingAmount)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
          <Input
            placeholder="Search by tenant or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#E8EAF6] text-[#3E4C5E] placeholder:text-[#B4BBCC] shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'Paid', 'Late', 'Upcoming', 'Processing'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as PaymentStatus | 'all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filterStatus === status
                  ? 'bg-gradient-to-br from-[#FF8B65] to-[#FFA07A] text-white shadow-[0_2px_8px_rgba(255,139,101,0.4)]'
                  : 'bg-[#E8EAF6] text-[#8B94A8] shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF]'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#E8EAF6] rounded-2xl overflow-hidden shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF]">
        <table className="w-full">
          <thead className="bg-[#E8EAF6] border-b border-[#D1D5E0]">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Invoice ID</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Tenant</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Property</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Amount</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Due Date</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Paid Date</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Method</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Status</th>
              <th className="px-6 py-4 text-left text-sm text-[#8B94A8]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-[#D1D5E0]/50 hover:bg-[#E8EAF6] hover:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF] transition-all">
                <td className="px-6 py-4 text-sm text-[#8B94A8]">{payment.invoiceId}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-[#3E4C5E]">{payment.tenant}</p>
                    <p className="text-xs text-[#8B94A8]">Unit {payment.unit}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#8B94A8]">{payment.property}</td>
                <td className="px-6 py-4 text-sm text-[#3E4C5E]">{formatCurrency(payment.amount)}</td>
                <td className="px-6 py-4 text-sm text-[#8B94A8]">{formatDate(payment.dueDate)}</td>
                <td className="px-6 py-4 text-sm text-[#8B94A8]">
                  {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-[#8B94A8]">{payment.method || '-'}</td>
                <td className="px-6 py-4">
                  <Badge className={getStatusColor(payment.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(payment.status)}
                      <span className="text-xs">{payment.status}</span>
                    </div>
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {payment.status === 'Late' && (
                      <button className="text-sm text-[#FF8B65] hover:text-[#FF8B65]/80 transition-all">
                        Remind
                      </button>
                    )}
                    <button className="text-sm text-[#3E4C5E] hover:text-[#8B94A8] transition-all">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
