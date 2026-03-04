import { useState } from "react";
import Header from "@/components/Header";
import HeatmapView from "@/components/HeatmapView";
import CrowdIndicator from "@/components/CrowdIndicator";
import { adminStats, temples, slots } from "@/data/mockData";
import { festivals, staffAllocations, crowdPredictions } from "@/data/festivalData";
import { Users, Calendar, TrendingUp, Clock, AlertTriangle, Megaphone, Zap, Shield, UserCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const statCards = [
  { label: "Total Visitors", value: adminStats.totalVisitors.toLocaleString(), icon: Users, color: "gradient-saffron" },
  { label: "Today's Bookings", value: adminStats.todayBookings, icon: Calendar, color: "gradient-saffron" },
  { label: "Active Temples", value: adminStats.activeTemples, icon: TrendingUp, color: "gradient-saffron" },
  { label: "Peak Hour", value: adminStats.peakHour, icon: Clock, color: "gradient-saffron" },
];

const AdminDashboard = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [festivalModes, setFestivalModes] = useState<Record<string, boolean>>({});

  const handleEmergency = () => {
    setEmergencyActive(!emergencyActive);
    toast({
      title: emergencyActive ? "Emergency Cleared ✅" : "🚨 Emergency Alert Activated",
      description: emergencyActive
        ? "All slots are now back to normal."
        : "All temples notified. Crowd control measures activated. New bookings paused.",
      variant: emergencyActive ? "default" : "destructive",
    });
  };

  const toggleFestival = (id: string) => {
    setFestivalModes((prev) => ({ ...prev, [id]: !prev[id] }));
    const festival = festivals.find((f) => f.id === id);
    toast({
      title: festivalModes[id] ? "Festival Mode Deactivated" : "🎉 Festival Mode Activated",
      description: `${festival?.name} - ${festivalModes[id] ? "Normal operations resumed." : "Extended hours and increased capacity are now live!"}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Manage temples, slots, and monitor crowd flow</p>
          </div>
          <Button
            onClick={handleEmergency}
            variant={emergencyActive ? "outline" : "destructive"}
            className={`gap-2 ${emergencyActive ? "border-destructive text-destructive" : ""}`}
          >
            <AlertTriangle className="h-4 w-4" />
            {emergencyActive ? "Clear Emergency" : "Emergency Block"}
          </Button>
        </div>

        {/* Emergency Banner */}
        {emergencyActive && (
          <div className="mt-4 rounded-xl border border-destructive bg-destructive/10 p-4 flex items-center gap-3 animate-pulse">
            <Megaphone className="h-6 w-6 text-destructive shrink-0" />
            <div>
              <p className="font-semibold text-destructive">🚨 EMERGENCY MODE ACTIVE</p>
              <p className="text-sm text-destructive/80">All new bookings are paused. Crowd control measures are in effect. Staff has been notified.</p>
            </div>
          </div>
        )}

        {/* Stat Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabbed Sections */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground">Weekly Visitors</h3>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adminStats.weeklyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(32, 20%, 88%)" />
                      <XAxis dataKey="day" tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="visitors" fill="hsl(32, 95%, 44%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-display text-lg font-semibold text-foreground">Hourly Distribution</h3>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={adminStats.hourlyDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(32, 20%, 88%)" />
                      <XAxis dataKey="hour" tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="hsl(0, 72%, 42%)" strokeWidth={2} dot={{ fill: "hsl(0, 72%, 42%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Live Slot Status */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground">Live Slot Status</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Temple</th>
                      <th className="pb-3 font-medium">Time</th>
                      <th className="pb-3 font-medium">Capacity</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.slice(0, 8).map((slot) => {
                      const temple = temples.find((t) => t.id === slot.templeId);
                      return (
                        <tr key={slot.id} className="border-b border-border last:border-0">
                          <td className="py-3 font-medium text-foreground">{temple?.name}</td>
                          <td className="py-3 text-muted-foreground">{slot.startTime} - {slot.endTime}</td>
                          <td className="py-3 text-muted-foreground">{slot.bookedCount}/{slot.maxCapacity}</td>
                          <td className="py-3"><CrowdIndicator level={slot.crowdLevel} size="sm" /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Heatmap Tab */}
          <TabsContent value="heatmap" className="mt-6">
            <HeatmapView />
          </TabsContent>

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="mt-6">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Festival Management</h3>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Zap className="h-4 w-4" /> Add Festival
                </Button>
              </div>
              <div className="space-y-3">
                {festivals.map((f) => {
                  const temple = temples.find((t) => t.id === f.templeId);
                  const active = festivalModes[f.id] || false;
                  return (
                    <div key={f.id} className={`flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 ${active ? "border-primary bg-primary/5" : "border-border"}`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{f.name}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            f.status === "completed" ? "bg-muted text-muted-foreground" : active ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"
                          }`}>
                            {active ? "ACTIVE" : f.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{temple?.name} · {f.date} · Expected: {f.expectedCrowd.toLocaleString()} visitors</p>
                      </div>
                      {f.status !== "completed" && (
                        <Button
                          size="sm"
                          variant={active ? "outline" : "default"}
                          onClick={() => toggleFestival(f.id)}
                          className={active ? "border-primary text-primary" : "gradient-saffron border-0 text-primary-foreground"}
                        >
                          {active ? "Deactivate" : "Activate Festival Mode"}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="mt-6">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Staff Allocation</h3>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <UserCheck className="h-4 w-4" /> Add Staff
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Zone</th>
                      <th className="pb-3 font-medium">Shift</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffAllocations.map((s) => (
                      <tr key={s.id} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium text-foreground">{s.name}</td>
                        <td className="py-3 text-muted-foreground">{s.role}</td>
                        <td className="py-3 text-muted-foreground">{s.zone}</td>
                        <td className="py-3 text-muted-foreground">{s.shift}</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            s.status === "on-duty" ? "bg-primary/10 text-primary" :
                            s.status === "break" ? "bg-secondary text-secondary-foreground" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* AI Predictions Tab */}
          <TabsContent value="predictions" className="mt-6">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">AI Crowd Prediction vs Actual</h3>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={crowdPredictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(32, 20%, 88%)" />
                    <XAxis dataKey="hour" tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(20, 10%, 45%)", fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="predicted" stroke="hsl(32, 95%, 44%)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                    <Line type="monotone" dataKey="actual" stroke="hsl(0, 72%, 42%)" strokeWidth={2} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">🤖 AI prediction accuracy: <span className="font-semibold text-foreground">94.2%</span> over the last 30 days</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
