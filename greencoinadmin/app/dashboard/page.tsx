"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PickupTable } from "@/components/dashboard/PickupTable";
import { LeaderboardCard } from "@/components/dashboard/LeaderboardCard";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { CSRCard } from "@/components/dashboard/CSRCard";
import {
  Users,
  UserCheck,
  Truck,
  CheckCircle2,
  Coins,
  Leaf,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  kpiData,
  monthlyPickups,
  ewasteCategories,
  weeklyGrowth,
  monthlyGrowth,
  yearlyGrowth,
  recentActivities,
  recentPickups,
  leaderboard,
  notifications,
  csrSummary,
} from "@/lib/dummy-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const iconMap: Record<string, React.ElementType> = {
  "Total Users": Users,
  Collectors: UserCheck,
  "Pending Pickups": Truck,
  "Completed Pickups": CheckCircle2,
  "GreenCoins Issued": Coins,
  "Carbon Saved": Leaf,
};

const PIE_COLORS = ["#14532d", "#166534", "#15803d", "#16a34a", "#4ade80", "#bbf7d0"];

type GrowthPeriod = "weekly" | "monthly" | "yearly";
const growthDataMap: Record<GrowthPeriod, typeof weeklyGrowth> = {
  weekly: weeklyGrowth,
  monthly: monthlyGrowth,
  yearly: yearlyGrowth,
};

export default function DashboardPage() {
  const [growthPeriod, setGrowthPeriod] = useState<GrowthPeriod>("monthly");

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <DashboardHeader />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kpiData.map((kpi) => (
          <StatCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={iconMap[kpi.title] || Users}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Area Chart */}
        <ChartCard
          title="Monthly Pickup Requests"
          description="Total pickup requests processed per month"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyPickups}>
              <defs>
                <linearGradient id="colorPickups" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14532d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#14532d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#14532d"
                fillOpacity={1}
                fill="url(#colorPickups)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard
          title="E‑Waste Categories"
          description="Distribution of collected e‑waste by type"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ewasteCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {ewasteCategories.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Users Growth Chart */}
      <ChartCard
        title="Users Growth"
        description="Track user acquisition over time"
        className="mb-6"
      >
        <div className="mb-4">
          <Tabs
            value={growthPeriod}
            onValueChange={(v) => setGrowthPeriod(v as GrowthPeriod)}
          >
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthDataMap[growthPeriod]}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>
        <QuickActions />
      </div>

      {/* Pickup Table */}
      <PickupTable pickups={recentPickups} />

      {/* Leaderboard + Notifications + CSR */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <LeaderboardCard entries={leaderboard} />
        <NotificationCard notifications={notifications} />
        <CSRCard summary={csrSummary} />
      </div>
    </div>
  );
}