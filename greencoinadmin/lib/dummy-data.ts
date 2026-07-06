
// lib/dummy-data.ts

export interface KPI {
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const kpiData: KPI[] = [
  { title: "Total Users", value: "12,458", trend: { value: "+12%", positive: true } },
  { title: "Collectors", value: "428", trend: { value: "+6%", positive: true } },
  { title: "Pending Pickups", value: "97", trend: { value: "-8%", positive: false } },
  { title: "Completed Pickups", value: "8,942", trend: { value: "+18%", positive: true } },
  { title: "GreenCoins Issued", value: "2.3M" },
  { title: "Carbon Saved", value: "187 Tons" },
];

export const monthlyPickups = [
  { month: "Jan", requests: 650 },
  { month: "Feb", requests: 590 },
  { month: "Mar", requests: 800 },
  { month: "Apr", requests: 810 },
  { month: "May", requests: 960 },
  { month: "Jun", requests: 1020 },
  { month: "Jul", requests: 1100 },
  { month: "Aug", requests: 1150 },
  { month: "Sep", requests: 1200 },
  { month: "Oct", requests: 1050 },
  { month: "Nov", requests: 980 },
  { month: "Dec", requests: 1250 },
];

export const ewasteCategories = [
  { name: "Laptop", value: 35 },
  { name: "Phone", value: 25 },
  { name: "Battery", value: 15 },
  { name: "Monitor", value: 12 },
  { name: "TV", value: 8 },
  { name: "Printer", value: 5 },
];

export interface GrowthDataPoint {
  date: string;
  users: number;
}

export const weeklyGrowth: GrowthDataPoint[] = [
  { date: "Mon", users: 1200 },
  { date: "Tue", users: 1350 },
  { date: "Wed", users: 1280 },
  { date: "Thu", users: 1420 },
  { date: "Fri", users: 1550 },
  { date: "Sat", users: 1600 },
  { date: "Sun", users: 1720 },
];

export const monthlyGrowth: GrowthDataPoint[] = [
  { date: "Jan", users: 8200 },
  { date: "Feb", users: 8500 },
  { date: "Mar", users: 8900 },
  { date: "Apr", users: 9100 },
  { date: "May", users: 9400 },
  { date: "Jun", users: 9800 },
  { date: "Jul", users: 10200 },
  { date: "Aug", users: 10600 },
  { date: "Sep", users: 11000 },
  { date: "Oct", users: 11400 },
  { date: "Nov", users: 11800 },
  { date: "Dec", users: 12458 },
];

export const yearlyGrowth: GrowthDataPoint[] = [
  { date: "2020", users: 2000 },
  { date: "2021", users: 4500 },
  { date: "2022", users: 7000 },
  { date: "2023", users: 9800 },
  { date: "2024", users: 11200 },
  { date: "2025", users: 12458 },
];

export interface Activity {
  id: string;
  message: string;
  time: string;
  status: "completed" | "assigned" | "redeemed" | "started";
  avatar: string;
}

export const recentActivities: Activity[] = [
  {
    id: "1",
    message: "Pickup completed for Rajesh Kumar",
    time: "2 min ago",
    status: "completed",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    message: "Collector Ravi assigned to #PU-2309",
    time: "15 min ago",
    status: "assigned",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    message: "Reward 'Eco Warrior' redeemed by Priya",
    time: "1 hour ago",
    status: "redeemed",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    message: "CSR campaign 'Green Future' started",
    time: "3 hours ago",
    status: "started",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    message: "Pickup verified for Amit Singh",
    time: "5 hours ago",
    status: "completed",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
];

export interface Pickup {
  id: string;
  citizen: string;
  collector: string;
  device: string;
  weight: string;
  status: "Pending" | "Accepted" | "Picked" | "Delivered" | "Verified" | "Cancelled";
  created: string;
}

export const recentPickups: Pickup[] = [
  { id: "PU-2301", citizen: "Amit Sharma", collector: "Ravi Kumar", device: "Laptop", weight: "2.3 kg", status: "Delivered", created: "2025-07-04" },
  { id: "PU-2302", citizen: "Sneha Patel", collector: "Anita Das", device: "Phone", weight: "0.4 kg", status: "Verified", created: "2025-07-04" },
  { id: "PU-2303", citizen: "Vikram Rao", collector: "Sunil Verma", device: "Monitor", weight: "5.1 kg", status: "Picked", created: "2025-07-03" },
  { id: "PU-2304", citizen: "Priya Menon", collector: "Ravi Kumar", device: "Battery", weight: "1.0 kg", status: "Accepted", created: "2025-07-03" },
  { id: "PU-2305", citizen: "Rajesh Gupta", collector: "Anita Das", device: "TV", weight: "12.0 kg", status: "Pending", created: "2025-07-02" },
  { id: "PU-2306", citizen: "Divya Nair", collector: "Sunil Verma", device: "Printer", weight: "3.6 kg", status: "Cancelled", created: "2025-07-02" },
  { id: "PU-2307", citizen: "Karan Joshi", collector: "Ravi Kumar", device: "Laptop", weight: "2.1 kg", status: "Verified", created: "2025-07-01" },
  { id: "PU-2308", citizen: "Ananya Reddy", collector: "Anita Das", device: "Phone", weight: "0.3 kg", status: "Delivered", created: "2025-07-01" },
  { id: "PU-2309", citizen: "Manoj Tiwari", collector: "Ravi Kumar", device: "Monitor", weight: "5.8 kg", status: "Picked", created: "2025-06-30" },
  { id: "PU-2310", citizen: "Lakshmi Iyer", collector: "Sunil Verma", device: "Laptop", weight: "2.9 kg", status: "Pending", created: "2025-06-30" },
  // Duplicate a few to show pagination
  { id: "PU-2311", citizen: "Rohit Sen", collector: "Anita Das", device: "Tablet", weight: "0.8 kg", status: "Accepted", created: "2025-06-29" },
  { id: "PU-2312", citizen: "Neha Kapoor", collector: "Ravi Kumar", device: "Phone", weight: "0.4 kg", status: "Verified", created: "2025-06-28" },
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  completedPickups: number;
  coinsEarned: string;
  rating: number;
  avatar: string;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Ravi Kumar", completedPickups: 342, coinsEarned: "12,450", rating: 4.9, avatar: "https://i.pravatar.cc/150?u=collector1" },
  { rank: 2, name: "Anita Das", completedPickups: 298, coinsEarned: "10,230", rating: 4.8, avatar: "https://i.pravatar.cc/150?u=collector2" },
  { rank: 3, name: "Sunil Verma", completedPickups: 275, coinsEarned: "9,800", rating: 4.7, avatar: "https://i.pravatar.cc/150?u=collector3" },
  { rank: 4, name: "Mohan Rao", completedPickups: 210, coinsEarned: "7,560", rating: 4.6, avatar: "https://i.pravatar.cc/150?u=collector4" },
  { rank: 5, name: "Priya Sharma", completedPickups: 187, coinsEarned: "6,400", rating: 4.5, avatar: "https://i.pravatar.cc/150?u=collector5" },
];

export interface Notification {
  id: string;
  message: string;
  time: string;
  type: "warning" | "info" | "success" | "error";
}

export const notifications: Notification[] = [
  { id: "1", message: "Approval required for Pickup #PU-2305", time: "5 min ago", type: "warning" },
  { id: "2", message: "Reward redeemed by Priya Menon", time: "1 hour ago", type: "success" },
  { id: "3", message: "New collector registered: Vikram Seth", time: "2 hours ago", type: "info" },
  { id: "4", message: "Pickup delayed for #PU-2308", time: "3 hours ago", type: "error" },
];

export interface CSRSummary {
  activeCampaigns: number;
  csrBudget: string;
  partnerCompanies: number;
  carbonOffset: string;
}

export const csrSummary: CSRSummary = {
  activeCampaigns: 5,
  csrBudget: "₹85,00,000",
  partnerCompanies: 12,
  carbonOffset: "450 Tons",
};