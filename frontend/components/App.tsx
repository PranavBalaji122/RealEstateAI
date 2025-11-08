'use client';

import { useState } from 'react';
import { DarkSidebar } from '@/components/DarkSidebar';
import { DarkDashboard } from '@/components/DarkDashboard';
import { PropertiesPage } from '@/components/PropertiesPage';
import { TenantsPage } from '@/components/TenantsPage';
import { MessagesPage } from '@/components/MessagesPage';
import { MaintenancePage } from '@/components/MaintenancePage';
import { CalendarPage } from '@/components/CalendarPage';
import { PaymentsPage } from '@/components/PaymentsPage';
import { Insights } from '@/components/Insights';
import { SettingsPage } from '@/components/SettingsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DarkDashboard sidebarCollapsed={sidebarCollapsed} />;
      case 'properties':
        return <PropertiesPage sidebarCollapsed={sidebarCollapsed} />;
      case 'tenants':
        return <TenantsPage sidebarCollapsed={sidebarCollapsed} />;
      case 'messages':
        return <MessagesPage sidebarCollapsed={sidebarCollapsed} />;
      case 'maintenance':
        return <MaintenancePage sidebarCollapsed={sidebarCollapsed} />;
      case 'calendar':
        return <CalendarPage sidebarCollapsed={sidebarCollapsed} />;
      case 'payments':
        return <PaymentsPage sidebarCollapsed={sidebarCollapsed} />;
      case 'insights':
        return <Insights sidebarCollapsed={sidebarCollapsed} />;
      case 'settings':
        return <SettingsPage sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <DarkDashboard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EAF6] relative overflow-hidden">
      {/* Soft gradient orbs for neumorphic depth */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#C4A1FF]/20 to-transparent blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#FF9ECE]/15 to-transparent blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FFB84D]/10 to-transparent blur-3xl rounded-full pointer-events-none"></div>
      
      <DarkSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className="min-h-screen w-full">
        {renderContent()}
      </main>
    </div>
  );
}

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-[#3E4C5E]">{title}</h1>
      <div className="neu-card rounded-3xl p-12 text-center">
        <p className="text-[#8B94A8] mb-2">This page is under construction</p>
        <p className="text-sm text-[#B4BBCC]">Check back soon for updates</p>
      </div>
    </div>
  );
}
