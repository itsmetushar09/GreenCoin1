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
import { createUser } from "@/lib/api/users";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "collector", "csr_partner", "citizen"]),
  status: z.enum(["active", "inactive", "suspended"]),
  phone: z.string().optional(),
  city: z.string().min(1, "City is required"),
  coins: z.coerce.number().min(0).default(0),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function CreateUserDialog({ open, onOpenChange, onCreated }: CreateUserDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "citizen",
      status: "active",
      phone: "",
      city: "",
      coins: 0,
      avatarUrl: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    await createUser(data);
    onCreated();
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>Add a member to GreenCoin platform.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
              {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select onValueChange={(value) => form.setValue("role", value as any)} defaultValue={form.getValues("role")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
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
              <Select onValueChange={(value) => form.setValue("status", value as any)} defaultValue={form.getValues("status")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
              {form.formState.errors.city && <p className="text-xs text-red-500">{form.formState.errors.city.message}</p>}
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
            <Button type="submit">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}