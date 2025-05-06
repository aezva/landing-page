'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { UserProvider } from '../context/UserContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EmailVerificationBanner from '../components/EmailVerificationBanner';
import LoadingSpinner from '../components/LoadingSpinner';

const inter = Inter({ subsets: ['latin'] });

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
    return <LoadingSpinner />;
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
        <EmailVerificationBanner />
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
                </div>
              </LanguageProvider>
            </UserProvider>
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
} 