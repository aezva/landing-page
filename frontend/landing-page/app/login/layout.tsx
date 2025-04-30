'use client';

import { LanguageProvider } from '../../context/LanguageContext';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {children}
      </div>
    </LanguageProvider>
  );
} 