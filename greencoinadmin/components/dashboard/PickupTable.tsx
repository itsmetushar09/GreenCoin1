"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pickup } from "@/lib/dummy-data";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface PickupTableProps {
  pickups: Pickup[];
}

const statusColorMap: Record<Pickup["status"], "default" | "secondary" | "outline" | "destructive"> = {
  Pending: "secondary",
  Accepted: "default",
  Picked: "outline",
  Delivered: "default",
  Verified: "outline",
  Cancelled: "destructive",
};

export function PickupTable({ pickups }: PickupTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return pickups.filter(
      (p) =>
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.citizen.toLowerCase().includes(search.toLowerCase())
    );
  }, [pickups, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Recent Pickups</CardTitle>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ID or citizen..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pickup ID</TableHead>
                <TableHead className="hidden sm:table-cell">Citizen</TableHead>
                <TableHead className="hidden md:table-cell">Collector</TableHead>
                <TableHead>Device</TableHead>
                <TableHead className="hidden sm:table-cell">Weight</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((pickup) => (
                <TableRow key={pickup.id}>
                  <TableCell className="font-medium">{pickup.id}</TableCell>
                  <TableCell className="hidden sm:table-cell">{pickup.citizen}</TableCell>
                  <TableCell className="hidden md:table-cell">{pickup.collector}</TableCell>
                  <TableCell>{pickup.device}</TableCell>
                  <TableCell className="hidden sm:table-cell">{pickup.weight}</TableCell>
                  <TableCell>
                    <Badge variant={statusColorMap[pickup.status]}>{pickup.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{pickup.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}