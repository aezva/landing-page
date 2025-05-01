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

  // Si el usuario no está autenticado y no está en una ruta pública, redirigir a login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Si el usuario está autenticado y está en una ruta de autenticación
  if (session && isAuthRoute) {
    // Obtener el client_id del usuario
    const { data: userData } = await supabase
      .from('users')
      .select('client_id')
      .eq('id', session.user.id)
      .single();

    if (userData?.client_id) {
      return NextResponse.redirect(new URL(`/client-panel/${userData.client_id}`, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 