import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LeaderboardEntry } from "@/lib/dummy-data";
import { Star } from "lucide-react";

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardCard({ entries }: LeaderboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Collectors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.rank} className="flex items-center gap-3">
              <span className="w-6 text-sm font-bold text-muted-foreground">
                #{entry.rank}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{entry.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{entry.completedPickups} pickups</span>
                  <span>·</span>
                  <span>{entry.coinsEarned} coins</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{entry.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}