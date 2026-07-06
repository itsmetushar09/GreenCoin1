import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Activity } from "@/lib/dummy-data";

interface RecentActivityProps {
  activities: Activity[];
}

const statusVariant: Record<Activity["status"], "default" | "secondary" | "outline" | "destructive"> = {
  completed: "default",
  assigned: "secondary",
  redeemed: "outline",
  started: "secondary",
};

const statusLabel: Record<Activity["status"], string> = {
  completed: "Completed",
  assigned: "Assigned",
  redeemed: "Redeemed",
  started: "Started",
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>
                  {activity.message.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{activity.message}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.time}</span>
                  <Badge variant={statusVariant[activity.status]} className="text-xs px-1 py-0">
                    {statusLabel[activity.status]}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}