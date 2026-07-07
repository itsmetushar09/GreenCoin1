"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Trash2, Columns } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { User } from "@/lib/types/user";
import { Row } from "@tanstack/react-table";

interface UsersHeaderProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  table: Table<User>;
  selectedRows: Row<User>[];
  onCreate: () => void;
  onBulkDelete: () => void;
}

export function UsersHeader({
  globalFilter,
  setGlobalFilter,
  table,
  selectedRows,
  onCreate,
  onBulkDelete,
}: UsersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">Manage all GreenCoin members.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name or email..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 w-full sm:w-64"
          />
        </div>

        {/* Role Filter */}
        <Select
          value={(table.getColumn("role")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) => table.getColumn("role")?.setFilterValue(value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="collector">Collector</SelectItem>
            <SelectItem value="csr_partner">CSR Partner</SelectItem>
            <SelectItem value="citizen">Citizen</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        {/* Column Visibility - fixed nesting */}
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
            <Columns className="mr-2 h-4 w-4" /> View
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Create User Button */}
        <Button onClick={onCreate} className="bg-emerald-700 hover:bg-emerald-800">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>

        {/* Bulk Delete */}
        {selectedRows.length > 0 && (
          <Button variant="destructive" onClick={onBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete {selectedRows.length}
          </Button>
        )}
      </div>
    </div>
  );
}