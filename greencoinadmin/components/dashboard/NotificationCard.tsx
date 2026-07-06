import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "@/lib/dummy-data";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notifications: Notification[];
}

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
  error: XCircle,
};

const colorMap = {
  warning: "text-yellow-600 dark:text-yellow-400",
  info: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
};

export function NotificationCard({ notifications }: NotificationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <div key={n.id} className="flex items-start gap-3">
                <Icon className={cn("mt-0.5 h-4 w-4", colorMap[n.type])} />
                <div className="space-y-1">
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}