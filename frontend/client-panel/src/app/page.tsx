'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importar el widget de NIA dinámicamente para evitar problemas de SSR
const NiaChatWidget = dynamic(() => import('nia-chat-widget'), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Panel de Cliente</h1>
        
        {isClient && (
          <div className="w-full max-w-2xl mx-auto">
            <NiaChatWidget
              apiUrl="http://localhost:8000/api/v1"
              context={{
                platform: 'client-panel',
                clientID: '123', // Esto debería venir de la autenticación
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
} 