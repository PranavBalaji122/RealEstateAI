import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, Save } from 'lucide-react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { PortfolioSnapshot } from '@/components/widgets/PortfolioSnapshot';
import { AIInsightsPanel } from '@/components/widgets/AIInsightsPanel';
import { ActiveMaintenanceTickets } from '@/components/widgets/ActiveMaintenanceTickets';
import { CalendarWidget } from '@/components/widgets/CalendarWidget';
import { MessageFeed } from '@/components/widgets/MessageFeed';
import { PropertyMap } from '@/components/widgets/PropertyMap';
import { RecentDocuments } from '@/components/widgets/RecentDocuments';
import { TenantAlerts } from '@/components/widgets/TenantAlerts';

interface Widget {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface DarkDashboardProps {
  sidebarCollapsed: boolean;
}

export const DarkDashboard: React.FC<DarkDashboardProps> = ({ sidebarCollapsed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isEditMode, setIsEditMode] = useState(false);

  const [widgets] = useState<Widget[]>([
    {
      id: 'portfolio',
      title: 'Portfolio Snapshot',
      component: <PortfolioSnapshot />
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      component: <AIInsightsPanel />
    },
    {
      id: 'maintenance',
      title: 'Active Maintenance',
      component: <ActiveMaintenanceTickets />
    },
    {
      id: 'calendar',
      title: 'Today\'s Schedule',
      component: <CalendarWidget />
    },
    {
      id: 'messages',
      title: 'Recent Messages',
      component: <MessageFeed />
    },
    {
      id: 'map',
      title: 'Property Locations',
      component: <PropertyMap />
    },
    {
      id: 'documents',
      title: 'Recent Documents',
      component: <RecentDocuments />
    },
    {
      id: 'alerts',
      title: 'Tenant Alerts',
      component: <TenantAlerts />
    }
  ]);

  const [layout, setLayout] = useState([
    { i: 'portfolio', x: 0, y: 0, w: 6, h: 2 },
    { i: 'ai-insights', x: 6, y: 0, w: 6, h: 1 },
    { i: 'maintenance', x: 6, y: 1, w: 6, h: 2 },
    { i: 'calendar', x: 0, y: 2, w: 6, h: 1 },
    { i: 'messages', x: 0, y: 3, w: 4, h: 1 },
    { i: 'map', x: 4, y: 3, w: 4, h: 1 },
    { i: 'documents', x: 8, y: 3, w: 2, h: 1 },
    { i: 'alerts', x: 10, y: 3, w: 2, h: 1 }
  ]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 64); // Subtract padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    // Also update when sidebar collapses/expands
    const timeout = setTimeout(updateWidth, 600);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timeout);
    };
  }, [sidebarCollapsed]);

  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const handleSaveLayout = () => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    // You could add a toast notification here
    console.log('Layout saved!');
  };

  return (
    <div 
      ref={containerRef}
      className={`p-8 space-y-8 min-h-screen transition-all duration-[400ms] ease-in-out ${
        sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle, #B4BBCC 2px, transparent 2px)',
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0'
      }}
    >
      {/* Floating Action Buttons - Top Right - Dashboard Only */}
      <div className="fixed top-6 right-6 flex items-center gap-3 z-30">
        {/* Save Widgets Button - Only visible in edit mode */}
        <button
          onClick={handleSaveLayout}
          className={`px-5 py-3 bg-[#E8EAF6] rounded-2xl text-[#8B94A8] hover:text-[#FF8B65] transition-all duration-300 ease-in-out flex items-center gap-2 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[4px_4px_10px_#C8CADE,-4px_-4px_10px_#FFFFFF] active:shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF] whitespace-nowrap ${
            isEditMode ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
          title="Save Widget Layout"
        >
          <Save size={18} />
          <span className="text-sm">Save Layout</span>
        </button>
        
        {/* Widget Configuration Button - Toggles edit mode */}
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`p-4 bg-[#E8EAF6] rounded-2xl transition-all duration-300 shadow-[6px_6px_12px_#C8CADE,-6px_-6px_12px_#FFFFFF] hover:shadow-[4px_4px_10px_#C8CADE,-4px_-4px_10px_#FFFFFF] active:shadow-[inset_3px_3px_6px_#C8CADE,inset_-3px_-3px_6px_#FFFFFF] ${
            isEditMode ? 'text-[#FF8B65]' : 'text-[#8B94A8] hover:text-[#FF8B65]'
          }`}
          title={isEditMode ? "Lock Widgets" : "Edit Widgets"}
        >
          <LayoutGrid size={20} />
        </button>
      </div>

      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="mb-2 text-[#3E4C5E]">Welcome back, John</h1>
        <p className="text-[#8B94A8]">Here's what's happening with your portfolio today</p>
      </div>

      {/* Widget Grid - Using react-grid-layout */}
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={200}
        width={containerWidth}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-drag-handle"
        compactType={null}
        preventCollision={false}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        isDraggable={isEditMode}
        isResizable={isEditMode}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <WidgetCard 
              title={widget.title}
              onRemove={() => {}}
              isDraggable={isEditMode}
              isEditMode={isEditMode}
            >
              {widget.component}
            </WidgetCard>
          </div>
        ))}
      </GridLayout>

      {/* Empty State if no widgets */}
      {widgets.length === 0 && (
        <div className="flex items-center justify-center h-[400px] neu-pressed rounded-3xl border border-[#D1D5E0] border-dashed">
          <div className="text-center">
            <p className="text-[#8B94A8] mb-4">No widgets added yet</p>
            <p className="text-sm text-[#B4BBCC]">Click "Add Widget" to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};
