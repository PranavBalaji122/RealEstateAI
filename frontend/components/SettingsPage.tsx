import { User, Bell, CreditCard, Calendar, LayoutGrid, Zap, Users, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SettingsPageProps {
  sidebarCollapsed?: boolean;
}

export function SettingsPage({ sidebarCollapsed = true }: SettingsPageProps) {
  return (
    <div className={`p-6 transition-all duration-[400ms] ease-in-out ${
      sidebarCollapsed ? 'ml-0' : 'ml-[240px]'
    }`}>
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-[#3E4C5E] mb-2">Settings</h1>
        <p className="text-[#8B94A8]">Manage your account and preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#E8EAF6] p-1 mb-6 shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
          <TabsTrigger 
            value="profile"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#FF8B65] data-[state=active]:to-[#FFA07A] data-[state=active]:text-white data-[state=active]:shadow-[0_2px_8px_rgba(255,139,101,0.4)] text-[#8B94A8]"
          >
            <User size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#FF8B65] data-[state=active]:to-[#FFA07A] data-[state=active]:text-white data-[state=active]:shadow-[0_2px_8px_rgba(255,139,101,0.4)] text-[#8B94A8]"
          >
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="integrations"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <Zap size={16} className="mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="team"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <Users size={16} className="mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger 
            value="ai"
            className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-[#0A0A0A] text-[#A3A3A3]"
          >
            <LayoutGrid size={16} className="mr-2" />
            AI & Widgets
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="max-w-2xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-white mb-6">Profile Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#A3A3A3] mb-2 block">Full Name</label>
                  <Input 
                    defaultValue="John Doe" 
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#A3A3A3] mb-2 block">Email</label>
                  <Input 
                    defaultValue="john@propli.city" 
                    type="email"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#A3A3A3] mb-2 block">Phone</label>
                  <Input 
                    defaultValue="+1 (555) 123-4567" 
                    type="tel"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-[#FF6B35] text-[#0A0A0A] hover:bg-[#FF6B35]/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-6">
              <h3 className="text-white mb-6">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#A3A3A3] mb-2 block">Current Password</label>
                  <Input 
                    type="password"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#A3A3A3] mb-2 block">New Password</label>
                  <Input 
                    type="password"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#A3A3A3] mb-2 block">Confirm New Password</label>
                  <Input 
                    type="password"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-[#FF6B35] text-[#0A0A0A] hover:bg-[#FF6B35]/90">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="max-w-2xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Rent payment reminders', description: 'Get notified when rent is due', checked: true },
                  { label: 'Maintenance requests', description: 'Alerts for new maintenance tickets', checked: true },
                  { label: 'Lease expiration warnings', description: 'Reminders 60 days before lease ends', checked: true },
                  { label: 'AI insights', description: 'Weekly summary of AI recommendations', checked: true },
                  { label: 'Late payment alerts', description: 'Immediate notifications for late rent', checked: true },
                  { label: 'Monthly reports', description: 'Portfolio performance summaries', checked: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <div className="flex-1">
                      <p className="text-white mb-1">{item.label}</p>
                      <p className="text-sm text-[#A3A3A3]">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="max-w-2xl space-y-4">
            {[
              { 
                name: 'Stripe', 
                icon: CreditCard, 
                description: 'Accept rent payments and manage payouts',
                connected: true,
                color: 'text-purple-400'
              },
              { 
                name: 'Google Calendar', 
                icon: Calendar, 
                description: 'Sync lease dates and maintenance schedules',
                connected: true,
                color: 'text-blue-400'
              },
              { 
                name: 'Outlook Calendar', 
                icon: Calendar, 
                description: 'Alternative calendar sync option',
                connected: false,
                color: 'text-blue-500'
              },
            ].map((integration, idx) => {
              const Icon = integration.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-white/5 rounded-xl ${integration.color}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-white mb-1">{integration.name}</h4>
                        <p className="text-sm text-[#A3A3A3]">{integration.description}</p>
                        {integration.connected && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs">
                            Connected
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant={integration.connected ? "outline" : "default"}
                      className={integration.connected 
                        ? "border-white/10 text-[#A3A3A3] hover:text-white" 
                        : "bg-[#FF6B35] text-[#0A0A0A] hover:bg-[#FF6B35]/90"
                      }
                    >
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <div className="max-w-2xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white">Team Members</h3>
                <Button className="bg-[#FF6B35] text-[#0A0A0A] hover:bg-[#FF6B35]/90">
                  Invite Member
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'John Doe', email: 'john@propli.city', role: 'Owner' },
                  { name: 'Jane Smith', email: 'jane@propli.city', role: 'Property Manager' },
                  { name: 'Mike Johnson', email: 'mike@propli.city', role: 'Maintenance' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white">{member.name}</p>
                        <p className="text-sm text-[#A3A3A3]">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-sm text-[#A3A3A3]">
                        {member.role}
                      </span>
                      {idx > 0 && (
                        <button className="text-sm text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* AI & Widgets Tab */}
        <TabsContent value="ai">
          <div className="max-w-2xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-white mb-6">AI Automation Thresholds</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Auto-send rent reminders', description: 'Days before due date', value: '3' },
                  { label: 'Late fee grace period', description: 'Days after due date', value: '5' },
                  { label: 'Maintenance priority threshold', description: 'Cost above which requires approval', value: '$500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <div className="flex-1">
                      <p className="text-white mb-1">{item.label}</p>
                      <p className="text-sm text-[#A3A3A3]">{item.description}</p>
                    </div>
                    <Input 
                      defaultValue={item.value}
                      className="w-24 bg-white/5 border-white/10 text-white text-right"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-white mb-6">Widget Layout Presets</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {['Default', 'Analytics Focus', 'Operations Focus', 'Minimal'].map((preset, idx) => (
                  <button
                    key={idx}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#FF6B35]/30 transition-all text-left"
                  >
                    <p className="text-white mb-1">{preset}</p>
                    <p className="text-xs text-[#A3A3A3]">Custom layout preset</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
