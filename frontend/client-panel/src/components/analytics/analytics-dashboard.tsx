'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export function AnalyticsDashboard() {
  const metrics: Metric[] = [
    {
      title: "Ingresos Totales",
      value: "$45,231.89",
      change: "+20.1%",
      trend: 'up'
    },
    {
      title: "Clientes Nuevos",
      value: "2350",
      change: "+180.1%",
      trend: 'up'
    },
    {
      title: "Tasa de Conversión",
      value: "12.5%",
      change: "-2.3%",
      trend: 'down'
    },
    {
      title: "Tiempo Promedio de Respuesta",
      value: "2.3h",
      change: "-12.5%",
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analítica</h2>
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 días</SelectItem>
            <SelectItem value="30">Últimos 30 días</SelectItem>
            <SelectItem value="90">Últimos 90 días</SelectItem>
            <SelectItem value="365">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.change} desde el período anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ventas por Día</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Aquí iría un gráfico de ventas */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de ventas por día
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribución de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Aquí iría un gráfico de distribución */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de distribución
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 