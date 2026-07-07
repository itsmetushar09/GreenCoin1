"use client"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface UserDetailsDrawerProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDrawer({ user, open, onOpenChange }: UserDetailsDrawerProps) {
  if (!user) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="sm:max-w-md">
        <DrawerHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle>{user.name}</DrawerTitle>
              <DrawerDescription>{user.email}</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <Badge variant="secondary" className="capitalize">{user.role.replace('_', ' ')}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge
                className={
                  user.status === "active"
                    ? "bg-green-100 text-green-800"
                    : user.status === "suspended"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {user.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{user.phone || "—"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">City</p>
              <p>{user.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Coins</p>
              <p>{user.coins.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Joined</p>
              <p>{user.joinDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Active</p>
              <p>{user.lastActive}</p>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}