import { Link2, CreditCard, Users, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const integrations = [
  {
    id: '1',
    name: 'Google Calendar',
    description: 'Sync events and reminders',
    icon: '📅',
    connected: true,
  },
  {
    id: '2',
    name: 'Plaid',
    description: 'Connect bank accounts for rent collection',
    icon: '🏦',
    connected: true,
  },
  {
    id: '3',
    name: 'QuickBooks',
    description: 'Sync expenses and income',
    icon: '📊',
    connected: false,
  },
  {
    id: '4',
    name: 'Zillow',
    description: 'Import property data and market analysis',
    icon: '🏠',
    connected: false,
  },
];

const autopilotSettings = [
  {
    id: '1',
    title: 'Auto Rent Reminders',
    description: 'Send automated reminders 3 days before rent is due',
    enabled: true,
  },
  {
    id: '2',
    title: 'Maintenance Scheduling',
    description: 'Automatically schedule routine maintenance',
    enabled: true,
  },
  {
    id: '3',
    title: 'Market Analysis',
    description: 'Weekly ROI and market trend reports',
    enabled: false,
  },
  {
    id: '4',
    title: 'Lease Renewals',
    description: 'Auto-generate renewal offers 60 days before expiry',
    enabled: true,
  },
];

const teamMembers = [
  { name: 'You', email: 'owner@example.com', role: 'Owner', access: 'Full Access' },
  { name: 'Jane Doe', email: 'jane@example.com', role: 'Manager', access: 'Limited' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Assistant', access: 'View Only' },
];

export default function Settings() {
  return (
    <div className="p-6">
      <h2 className="mb-6">Settings</h2>

      <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
        <Tabs defaultValue="integrations" className="p-6">
          <TabsList className="mb-6">
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="autopilot">Autopilot</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Integrations */}
          <TabsContent value="integrations">
            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="p-6 border border-[#E0E0E0] rounded-xl hover:border-[#F7A654] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h4>{integration.name}</h4>
                        <p className="text-sm text-[#555555]">{integration.description}</p>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge className="bg-[#3CB371] text-white">Connected</Badge>
                    )}
                  </div>
                  <Button
                    variant={integration.connected ? 'outline' : 'default'}
                    className={
                      integration.connected
                        ? ''
                        : 'bg-[#F7A654] hover:bg-[#F58E3C] text-white'
                    }
                    size="sm"
                  >
                    <Link2 size={14} className="mr-2" />
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Autopilot */}
          <TabsContent value="autopilot">
            <div className="space-y-4">
              {autopilotSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="p-4 border border-[#E0E0E0] rounded-xl flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{setting.title}</h4>
                    <p className="text-sm text-[#555555]">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#FFD9B3] rounded-xl">
              <p className="text-sm">
                💡 <span className="text-[#555555]">Autopilot features use AI to automate routine tasks. You can customize 
                triggers and actions for each automation.</span>
              </p>
            </div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <div className="p-6 border border-[#E0E0E0] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3>Pro Plan</h3>
                    <p className="text-[#555555]">Billed monthly</p>
                  </div>
                  <div className="text-right">
                    <h2>$49</h2>
                    <p className="text-sm text-[#555555]">/month</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-[#F7A654] hover:bg-[#F58E3C] text-white">
                    <CreditCard size={16} className="mr-2" />
                    Manage Subscription
                  </Button>
                  <Button variant="outline">Upgrade to Enterprise</Button>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Billing History</h4>
                <div className="border border-[#E0E0E0] rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#FAFAFA]">
                      <tr>
                        <th className="text-left p-3 text-sm">Date</th>
                        <th className="text-left p-3 text-sm">Amount</th>
                        <th className="text-left p-3 text-sm">Status</th>
                        <th className="text-right p-3 text-sm">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#E0E0E0]">
                        <td className="p-3 text-sm">Nov 1, 2025</td>
                        <td className="p-3 text-sm">$49.00</td>
                        <td className="p-3">
                          <Badge className="bg-[#3CB371] text-white">Paid</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-t border-[#E0E0E0]">
                        <td className="p-3 text-sm">Oct 1, 2025</td>
                        <td className="p-3 text-sm">$49.00</td>
                        <td className="p-3">
                          <Badge className="bg-[#3CB371] text-white">Paid</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Roles */}
          <TabsContent value="roles">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4>Team Members</h4>
                <Button className="bg-[#F7A654] hover:bg-[#F58E3C] text-white">
                  <Users size={16} className="mr-2" />
                  Invite Member
                </Button>
              </div>

              <div className="border border-[#E0E0E0] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#FAFAFA]">
                    <tr>
                      <th className="text-left p-3 text-sm">Name</th>
                      <th className="text-left p-3 text-sm">Email</th>
                      <th className="text-left p-3 text-sm">Role</th>
                      <th className="text-left p-3 text-sm">Access</th>
                      <th className="text-right p-3 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, idx) => (
                      <tr key={idx} className="border-t border-[#E0E0E0]">
                        <td className="p-3 text-sm">{member.name}</td>
                        <td className="p-3 text-sm text-[#555555]">{member.email}</td>
                        <td className="p-3">
                          <Badge variant="outline">{member.role}</Badge>
                        </td>
                        <td className="p-3 text-sm text-[#555555]">{member.access}</td>
                        <td className="p-3 text-right">
                          {member.role !== 'Owner' && (
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="space-y-4">
              <div className="p-4 border border-[#E0E0E0] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-[#F7A654]" />
                  <div>
                    <h4 className="text-sm">Email Notifications</h4>
                    <p className="text-sm text-[#555555]">Receive updates via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="p-4 border border-[#E0E0E0] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-[#F7A654]" />
                  <div>
                    <h4 className="text-sm">Push Notifications</h4>
                    <p className="text-sm text-[#555555]">Get instant alerts</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="p-4 border border-[#E0E0E0] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-[#F7A654]" />
                  <div>
                    <h4 className="text-sm">Weekly Reports</h4>
                    <p className="text-sm text-[#555555]">Summary of portfolio performance</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="p-4 border border-[#E0E0E0] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-[#F7A654]" />
                  <div>
                    <h4 className="text-sm">Payment Reminders</h4>
                    <p className="text-sm text-[#555555]">Alerts for late payments</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
