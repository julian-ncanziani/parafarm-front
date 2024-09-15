'use client'
import React from 'react'; // Agrega esta línea
import { MenuItem } from "@headlessui/react";
import { signIn } from "next-auth/react";

interface SignInBtnProps {
    text: string;
    textColor: string;
}

const SignInBtn: React.FC<SignInBtnProps> = ({ text, textColor }) => {
    return (
        <>
            <span 
                onClick={() => signIn()} // Puedes pasar un proveedor si lo necesitas: signIn('google')
                className={`block px-4 py-2 text-sm text-gray-700 text-${textColor} data-[focus]:bg-gray-100 cursor-pointer`}
            >
                {text}
            </span>
        </>
    )
}

export default SignInBtn;
