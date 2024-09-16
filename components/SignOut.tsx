'use client'
import { MenuItem } from "@headlessui/react"
import { signOut } from "next-auth/react"

const SignOutBtn = () => {
    return(
        <MenuItem>
            <span 
                onClick={() => signOut()} 
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
            >
              Sign out
            </span>
        </MenuItem>
    )
};

export default SignOutBtn;