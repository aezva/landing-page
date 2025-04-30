import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NIA Client Panel',
  description: 'Panel de control para clientes de NIA',
};

export const font = inter; 