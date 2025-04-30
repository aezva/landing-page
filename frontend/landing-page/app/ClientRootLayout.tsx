'use client';

import { usePathname } from 'next/navigation';
import ClientLayout from './ClientLayout';
import { LanguageProvider } from '../context/LanguageContext';

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/register' || pathname === '/login';
  
  return (
    <LanguageProvider>
      {isAuthPage ? children : <ClientLayout>{children}</ClientLayout>}
    </LanguageProvider>
  );
} 