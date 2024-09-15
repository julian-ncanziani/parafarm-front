// lib/auth.ts (o config/auth.ts)
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Configuración de NextAuth
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth',
    },
    callbacks: {
        async jwt({ user, token, account }) {
            if (user && account) {
                try {
                    const response = await fetch('http://localhost:3001/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name
                        }),
                    });
                    const data = await response.json();

                    token.id = data._id;
                    token.rol = data.rol;
                } catch (error) {
                    console.error('Error al registrar el usuario:', error);
                    throw new Error('Error en la autenticación');
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.rol = token.rol as string;
            }
            return session;
        }
    }
};
