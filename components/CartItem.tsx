'use client'
import { useState } from "react";
import IProduct from "@/interfaces/IProduct";
import ICartItem from "@/interfaces/ICartItem";
import { useCart } from "@/context/CartContext";
import { MdDelete } from "react-icons/md";
import Image from "next/image";


interface CartItemProps {
    product: ICartItem;
  }

export default function CartItem({ product }: CartItemProps) {

    const { removeFromCart, addToCart } = useCart();
    const [inputQuantity, setInputQuantity] = useState<number>(1);
    return(
        <li key={product._id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                alt={''}
                src={'/images/magnesio.png'}
                className="h-full w-full object-cover object-center"
                width={80} // Proporciona el ancho de la imagen
                height={50} // Proporciona la altura de la imagen
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                    <a href={product.name}>{product.name}</a>                
                    </h3>
                    <p className="ml-4">${product.price}</p>
                </div>
                </div>
                
                {/* input div */}
                <div className="relative w-32 mt-2"> 
                <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md text-center appearance-none pl-10 pr-8" 
                    defaultValue={inputQuantity} 
                    onChange={(e) => setInputQuantity(Number(e.target.value))}
                />
                <button 
                    className="absolute left-0 inset-y-0 px-2 text-gray-500 hover:text-gray-700"
                    onClick={() => addToCart(product, - inputQuantity)}
                    disabled={inputQuantity >= product.quantity ? true : false}// Decrementar cantidad
                >
                    -
                </button>
                <button 
                    className="absolute right-0 inset-y-0 px-2 text-gray-500 hover:text-gray-700"
                    onClick={() => addToCart(product, inputQuantity)}
                    // Incrementar cantidad
                >
                    +
                </button>
                </div>

                <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Cantidad {product.quantity}</p>

                <div className="flex">
                    <button 
                    type="button" 
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={()=> removeFromCart(product._id)}
                    >
                    <MdDelete className="text-gray-500 w-7 h-7 hover:text-red-500 cursor-pointer"/>
                    </button>
                </div>
                </div>
            </div>
        </li>
    );
};