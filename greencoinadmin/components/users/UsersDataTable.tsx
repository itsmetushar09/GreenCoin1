"use client"

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import { User } from "@/lib/types/user";
import { userColumns } from "./columns";
import { fetchUsers } from "@/lib/api/users";
import { UsersHeader } from "./UsersHeader";
import { UserDetailsDrawer } from "./UserDetailsDrawer";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { CreateUserDialog } from "./CreateUserDialog";

interface UsersDataTableProps {}

export function UsersDataTable({}: UsersDataTableProps) {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const columns = useMemo<ColumnDef<User>[]>(() => userColumns, []);

  useEffect(() => {
    setLoading(true);
    fetchUsers().then(users => {
      setData(users);
      setLoading(false);
    });
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedRows.length > 0) {
      setSelectedUser(null);
      setDeleteDialogOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <UsersHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        selectedRows={selectedRows}
        onCreate={() => setCreateDialogOpen(true)}
        onBulkDelete={handleBulkDelete}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon">
    <MoreHorizontal className="h-4 w-4" />
  </Button>
</DropdownMenuTrigger>

<DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
  <MoreHorizontal className="h-4 w-4" />
</DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(row.original)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(row.original)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(row.original)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <UserDetailsDrawer user={selectedUser} open={drawerOpen} onOpenChange={setDrawerOpen} />
      <EditUserDialog
        user={selectedUser}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSaved={() => fetchUsers().then(setData)}
      />
      <DeleteUserDialog
        user={selectedUser}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleted={() => fetchUsers().then(setData)}
        selectedRows={selectedRows}
        onBulkDeleted={() => {
          setRowSelection({});
          fetchUsers().then(setData);
        }}
      />
      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreated={() => fetchUsers().then(setData)}
      />
    </div>
  );
}