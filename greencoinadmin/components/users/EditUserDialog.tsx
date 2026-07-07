"use client"

import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@/lib/types/user";
import { updateUser } from "@/lib/api/users";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "collector", "csr_partner", "citizen"]),
  status: z.enum(["active", "inactive", "suspended"]),
  phone: z.string().optional(),
  city: z.string().min(1),
  coins: z.coerce.number().min(0),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export function EditUserDialog({ user, open, onOpenChange, onSaved }: EditUserDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        city: user.city,
        coins: user.coins,
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    await updateUser(user.id, data);
    onSaved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update information for {user?.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* Same fields as create, but no need to repeat all markup. We'll reuse similar grid. */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...form.register("email")} />
              {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={form.watch("role")}
                onValueChange={(value) => form.setValue("role", value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="collector">Collector</SelectItem>
                  <SelectItem value="csr_partner">CSR Partner</SelectItem>
                  <SelectItem value="citizen">Citizen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(value) => form.setValue("status", value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...form.register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...form.register("city")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coins">Coins</Label>
              <Input id="coins" type="number" {...form.register("coins")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" {...form.register("avatarUrl")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}