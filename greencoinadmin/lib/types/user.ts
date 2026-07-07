export type UserRole = "admin" | "collector" | "csr_partner" | "citizen";
export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  city: string;
  coins: number;
  joinDate: string;
  avatarUrl?: string;
  lastActive: string;
}