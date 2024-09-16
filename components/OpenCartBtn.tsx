'use client'
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
const OpenCartBtn = () => {

    const { openCart, getItemCount } = useCart();
    return(
        <button
            onClick={openCart}
            type="button"
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white mr-5 ml-5"
        >
        {/* Icono del carrito */}
        <FaShoppingCart aria-hidden="true" className="h-7 w-7" />           
        {/* Contador de ítems */}
        {getItemCount() > 0 && (
            <span
                className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold"
                style={{ transform: 'translate(50%, -50%)' }}
            >
                {getItemCount()}
            </span>
            )}
        </button>
    )
};

export default OpenCartBtn;