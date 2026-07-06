import { Button } from "@/components/ui/button";
import { CheckCircle, UserPlus, Gift, FileText, Users } from "lucide-react";

const actions = [
  { label: "Approve Pickups", icon: CheckCircle },
  { label: "Add Collector", icon: UserPlus },
  { label: "Create Reward", icon: Gift },
  { label: "Generate Report", icon: FileText },
  { label: "Invite CSR Partner", icon: Users },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="flex h-auto flex-col items-center gap-2 py-4 transition hover:bg-emerald-50 dark:hover:bg-emerald-950"
        >
          <action.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}