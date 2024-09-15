import axios from 'axios';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

// Extender la interfaz de la sesión
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            rol: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

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
            // Verifica si hay un objeto `user` y `account`, lo que indica un nuevo inicio de sesión
            if (user && account) {
                try {
                    // Realiza una solicitud al servidor para registrar o actualizar al usuario
                    const response = await axios.post('http://localhost:3001/users', {
                        email: user.email,
                        name: user.name
                    });
                    const data = response.data;

                    // Añade propiedades personalizadas al token JWT
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
            // Verifica si `session.user` está definido y asigna los valores del token a la sesión
            
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

// Exporta el handler para las solicitudes GET y POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
