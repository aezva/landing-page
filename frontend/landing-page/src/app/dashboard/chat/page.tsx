import { NIAChat } from "@/components/nia/chat";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Chat con NIA</h1>
        <p className="text-muted-foreground">
          Interactúa con NIA para obtener asistencia en ventas y atención al cliente.
        </p>
      </div>
      <NIAChat />
    </div>
  );
} 