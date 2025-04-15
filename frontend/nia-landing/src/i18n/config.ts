import { getRequestConfig } from 'next-intl/server';

export const locales = ['es', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale = 'es' as const;

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
})); 