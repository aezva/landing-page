"use client";

import { Specialization } from "@/types/specialization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SpecializationListProps {
  specializations: Specialization[];
}

export function SpecializationList({ specializations }: SpecializationListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {specializations.map((specialization) => (
        <Card key={specialization.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{specialization.name}</span>
              <Badge variant={specialization.status === "active" ? "default" : "secondary"}>
                {specialization.status === "active" ? "Activa" : "Inactiva"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {specialization.description}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  specialization.status === "active"
                    ? "text-destructive hover:text-destructive"
                    : "text-green-600 hover:text-green-600"
                }
              >
                {specialization.status === "active" ? "Desactivar" : "Activar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 