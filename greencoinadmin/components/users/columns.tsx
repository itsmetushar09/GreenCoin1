"use client"

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/types/user";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";


export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{user.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as User["role"];
      return <Badge variant="secondary" className="capitalize">{role.replace('_', ' ')}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as User["status"];
      const colorMap = {
        active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
        suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
      return (
        <Badge className={colorMap[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "coins",
    header: "Coins",
    cell: ({ row }) => row.getValue<number>("coins").toLocaleString(),
  },
  {
    accessorKey: "joinDate",
    header: "Joined",
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
  },
];