import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

  // Si el usuario no está autenticado y no está en la página de login o registro,
  // redirigir a la página de login
  if (!session && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Si el usuario está autenticado y está en la página de login o registro,
  // redirigir al dashboard
  if (session && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 