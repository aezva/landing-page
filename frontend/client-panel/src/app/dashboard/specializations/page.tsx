import { SpecializationsList } from "@/components/nia/specializations";

export default function SpecializationsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Especialidades de NIA</h1>
        <p className="text-muted-foreground">
          Gestiona las especialidades de NIA para tu empresa. Activa o desactiva las especialidades según tus necesidades.
        </p>
      </div>
      <SpecializationsList />
    </div>
  );
} 