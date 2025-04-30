'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@shared/i18n/LanguageContext';
import { UserProvider } from '../context/UserContext';
import dynamic from 'next/dynamic';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Importar el widget de manera dinámica para evitar problemas de SSR
const NniaWidget = dynamic(() => import('../../../nnia_chat_widget/src/index').then(mod => mod.default), {
  ssr: false,
  loading: () => null
});

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        router.push('/login');
      } else if (user && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        router.push('/');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Alata&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AuthWrapper>
            <UserProvider>
              <LanguageProvider>
                <div className="h-screen bg-gray-50">
                  <Header />
                  <div className="flex h-[calc(100vh-3.5rem)]">
                    <Sidebar />
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
                        <div className="mx-auto max-w-7xl pt-0">
                          {children}
                        </div>
                      </main>
                    </div>
                  </div>
                  <NniaWidget 
                    apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} 
                    context={{ platform: "client-panel" }} 
                  />
                </div>
              </LanguageProvider>
            </UserProvider>
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
} 