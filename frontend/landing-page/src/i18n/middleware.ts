import createMiddleware from 'next-intl/middleware';
import { locales } from './config';

export default createMiddleware({
  // Lista de locales soportados
  locales,
  // Locale por defecto
  defaultLocale: 'es',
  // Rutas que no requieren internacionalización
  localePrefix: 'as-needed'
});

export const config = {
  // Patrones de ruta que coincidirán con el middleware
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 