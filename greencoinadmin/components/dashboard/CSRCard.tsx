import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CSRSummary } from "@/lib/dummy-data";
import { Leaf, DollarSign, Building2, Factory } from "lucide-react";

interface CSRCardProps {
  summary: CSRSummary;
}

export function CSRCard({ summary }: CSRCardProps) {
  const items = [
    { label: "Active Campaigns", value: summary.activeCampaigns, icon: Leaf },
    { label: "CSR Budget", value: summary.csrBudget, icon: DollarSign },
    { label: "Partner Companies", value: summary.partnerCompanies, icon: Building2 },
    { label: "Carbon Offset", value: summary.carbonOffset, icon: Factory },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSR Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}