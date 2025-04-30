'use client';

import { LanguageProvider } from '../context/LanguageContext';
import Layout from '../components/Layout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Layout>
        {children}
      </Layout>
    </LanguageProvider>
  );
} 