import axios from 'axios'; // only used as interface; we'll fake it
import { User } from '@/lib/types/user';

// Realistic GreenCoin users
const users: User[] = [
  {
    id: 'usr_1',
    name: 'Rajesh Kumar',
    email: 'rajesh@greencoin.in',
    role: 'citizen',
    status: 'active',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    coins: 1240,
    joinDate: '2024-03-15',
    avatarUrl: 'https://i.pravatar.cc/150?u=rajesh',
    lastActive: '2025-07-06',
  },
  {
    id: 'usr_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@greencoin.in',
    role: 'collector',
    status: 'active',
    phone: '+91 87654 32109',
    city: 'Delhi',
    coins: 5230,
    joinDate: '2023-11-22',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya',
    lastActive: '2025-07-06',
  },
  {
    id: 'usr_3',
    name: 'Amitabh Das',
    email: 'amitabh.das@greentech.com',
    role: 'csr_partner',
    status: 'active',
    phone: '+91 99887 76655',
    city: 'Bangalore',
    coins: 0,
    joinDate: '2024-06-01',
    lastActive: '2025-07-05',
  },
  {
    id: 'usr_4',
    name: 'Sunita Reddy',
    email: 'sunita.reddy@greencoin.in',
    role: 'admin',
    status: 'active',
    phone: '+91 91234 56789',
    city: 'Hyderabad',
    coins: 0,
    joinDate: '2022-01-10',
    avatarUrl: 'https://i.pravatar.cc/150?u=sunita',
    lastActive: '2025-07-07',
  },
  {
    id: 'usr_5',
    name: 'Ravi Verma',
    email: 'ravi.verma@greencoin.in',
    role: 'collector',
    status: 'inactive',
    phone: '+91 80123 45678',
    city: 'Chennai',
    coins: 3100,
    joinDate: '2024-01-20',
    avatarUrl: 'https://i.pravatar.cc/150?u=ravi',
    lastActive: '2025-06-15',
  },
  // ... add 10-15 more realistic users to fill the table
  {
    id: 'usr_6',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@greencoin.in',
    role: 'citizen',
    status: 'active',
    phone: '+91 77880 12345',
    city: 'Mumbai',
    coins: 870,
    joinDate: '2025-02-14',
    lastActive: '2025-07-06',
  },
  {
    id: 'usr_7',
    name: 'Vikram Singh',
    email: 'vikram.singh@csr.org',
    role: 'csr_partner',
    status: 'active',
    phone: '+91 99876 54321',
    city: 'Delhi',
    coins: 0,
    joinDate: '2024-09-05',
    lastActive: '2025-07-05',
  },
  {
    id: 'usr_8',
    name: 'Mohan Rao',
    email: 'mohan.rao@greencoin.in',
    role: 'collector',
    status: 'suspended',
    phone: '+91 88991 22334',
    city: 'Pune',
    coins: 0,
    joinDate: '2023-05-18',
    lastActive: '2025-06-01',
  },
  {
    id: 'usr_9',
    name: 'Divya Menon',
    email: 'divya.menon@greencoin.in',
    role: 'citizen',
    status: 'active',
    phone: '+91 76543 21098',
    city: 'Kochi',
    coins: 2100,
    joinDate: '2024-12-01',
    avatarUrl: 'https://i.pravatar.cc/150?u=divya',
    lastActive: '2025-07-07',
  },
  {
    id: 'usr_10',
    name: 'Karan Kapoor',
    email: 'karan.kapoor@greencoin.in',
    role: 'admin',
    status: 'active',
    phone: '+91 98701 23456',
    city: 'Bangalore',
    coins: 0,
    joinDate: '2022-08-12',
    lastActive: '2025-07-07',
  },
  {
    id: 'usr_11',
    name: 'Lakshmi Nair',
    email: 'lakshmi.nair@greencoin.in',
    role: 'citizen',
    status: 'inactive',
    phone: '+91 81234 56780',
    city: 'Thiruvananthapuram',
    coins: 340,
    joinDate: '2025-05-20',
    lastActive: '2025-06-30',
  },
  {
    id: 'usr_12',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@greensolutions.com',
    role: 'csr_partner',
    status: 'active',
    phone: '+91 65432 10987',
    city: 'Jaipur',
    coins: 0,
    joinDate: '2025-03-11',
    lastActive: '2025-07-06',
  },
];

// Simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUsers(): Promise<User[]> {
  await delay(600);
  return [...users];
}

export async function getUserById(id: string): Promise<User | undefined> {
  await delay(300);
  return users.find(u => u.id === id);
}

export async function createUser(data: Omit<User, 'id' | 'joinDate' | 'lastActive'>): Promise<User> {
  await delay(500);
  const newUser: User = {
    ...data,
    id: `usr_${users.length + 1}`,
    joinDate: new Date().toISOString().split('T')[0],
    lastActive: new Date().toISOString().split('T')[0],
  };
  users.push(newUser);
  return newUser;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  await delay(400);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) throw new Error('User not found');
  users[index] = { ...users[index], ...data };
  return users[index];
}

export async function deleteUser(id: string): Promise<void> {
  await delay(300);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) users.splice(index, 1);
}