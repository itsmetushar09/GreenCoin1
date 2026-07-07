"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import { deleteUser } from "@/lib/api/users";
import { Row } from "@tanstack/react-table";

interface DeleteUserDialogProps {
  user: User | null; // null when bulk
  selectedRows?: Row<User>[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
  onBulkDeleted?: () => void;
}

export function DeleteUserDialog({
  user,
  selectedRows = [],
  open,
  onOpenChange,
  onDeleted,
  onBulkDeleted,
}: DeleteUserDialogProps) {
  const isBulk = selectedRows.length > 0 && user === null;
  const deleteCount = isBulk ? selectedRows.length : 1;

  const handleDelete = async () => {
    if (isBulk) {
      // Delete all selected
      for (const row of selectedRows) {
        await deleteUser(row.original.id);
      }
      onBulkDeleted?.();
    } else if (user) {
      await deleteUser(user.id);
      onDeleted();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            {isBulk
              ? `Are you sure you want to delete ${deleteCount} selected users? This action cannot be undone.`
              : `Are you sure you want to delete ${user?.name}? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}