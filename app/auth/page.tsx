'use client'
// pages/auth/signin.js
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <img src="/favicon.ico" alt="Parafarmacia" className="w-32 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Bienvenido a Parafarmacia</h1>
        <p className="text-gray-600 mb-8">Por favor, inicie sesión para continuar</p>
        
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex items-center justify-center w-full bg-white text-black border border-gray-300 py-2 px-4 rounded-lg mb-4 hover:bg-gray-100 transition duration-300"
        >
          <FcGoogle className="h-6 w-6 mr-2" />
          Iniciar sesión con Google
        </button>

        <p className="text-gray-500 mt-6">
          ¿No tienes cuenta?{' '}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
