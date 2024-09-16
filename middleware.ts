import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  // Si el usuario no está autenticado, redirige al home
  if (!token) {
    url.pathname = '/'; // Redirigir al home si no hay token (no autenticado)
    return NextResponse.redirect(url);
  }

  // Verifica si el rol no es 'admin'
  if (token.rol !== 'admin') {
    url.pathname = '/'; // Redirigir al home si no es admin
    return NextResponse.redirect(url);
  }

  // Permitir acceso si es administrador
  return NextResponse.next();
}

// Especifica a qué rutas se aplica el middleware
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], // Middleware aplicado a estas rutas
};
