'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, TrendingUp, MessageSquare } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export function DashboardOverview() {
  const metrics: Metric[] = [
    {
      title: "Clientes Activos",
      value: "1,234",
      change: "+12%",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Interacciones Hoy",
      value: "89",
      change: "+5%",
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      title: "Tasa de Conversión",
      value: "24%",
      change: "+3%",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Actividad Total",
      value: "456",
      change: "+8%",
      icon: <Activity className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 