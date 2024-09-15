import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

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

// Exporta el handler para las solicitudes GET y POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
