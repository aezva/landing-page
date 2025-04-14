import { useNIAStore } from '@/lib/agents/store';
import { Specialization } from '@/lib/agents/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export function SpecializationsList() {
  const { availableSpecializations, tenantNIA } = useNIAStore();

  const isSpecializationEnabled = (specializationId: string) => {
    return tenantNIA?.configuration.enabledSpecializations.includes(specializationId) || false;
  };

  const handleToggleSpecialization = (specialization: Specialization) => {
    // TODO: Implement API call to toggle specialization
    console.log('Toggle specialization:', specialization);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {availableSpecializations.map((specialization) => (
        <Card key={specialization.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {specialization.name}
              <Badge variant={isSpecializationEnabled(specialization.id) ? "default" : "secondary"}>
                {isSpecializationEnabled(specialization.id) ? "Activa" : "Inactiva"}
              </Badge>
            </CardTitle>
            <CardDescription>{specialization.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Costo mensual:</span>
                <span className="text-sm">${specialization.monthlyCost}</span>
              </div>
              <Button
                variant={isSpecializationEnabled(specialization.id) ? "destructive" : "default"}
                className="w-full"
                onClick={() => handleToggleSpecialization(specialization)}
              >
                {isSpecializationEnabled(specialization.id) ? (
                  <>
                    <Minus className="mr-2 h-4 w-4" />
                    Desactivar
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Activar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 