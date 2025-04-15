'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SettingsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Nombre del Negocio</Label>
            <Input placeholder="Ingresa el nombre de tu negocio" />
          </div>
          <div className="space-y-2">
            <Label>Idioma</Label>
            <Select defaultValue="es">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Zona Horaria</Label>
            <Select defaultValue="America/Mexico_City">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una zona horaria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                <SelectItem value="America/Bogota">Bogotá</SelectItem>
                <SelectItem value="America/Santiago">Santiago</SelectItem>
                <SelectItem value="America/Buenos_Aires">Buenos Aires</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones importantes por correo electrónico
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones Push</Label>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones en tiempo real en tu dispositivo
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recordatorios de Citas</Label>
              <p className="text-sm text-muted-foreground">
                Recibe recordatorios de citas programadas
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seguridad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Autenticación de Dos Factores</Label>
            <div className="flex items-center space-x-2">
              <Switch />
              <span className="text-sm text-muted-foreground">
                Activar autenticación de dos factores
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Cambiar Contraseña</Label>
            <div className="space-y-4">
              <Input type="password" placeholder="Contraseña actual" />
              <Input type="password" placeholder="Nueva contraseña" />
              <Input type="password" placeholder="Confirmar nueva contraseña" />
            </div>
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
} 