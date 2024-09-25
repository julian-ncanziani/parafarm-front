'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import IProduct from '@/interfaces/IProduct';
import ICartItem from '@/interfaces/ICartItem';

interface ProductListItemProps {
  product: IProduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const itemInCart = cart.some(item => item._id === product._id);
    setIsAdded(itemInCart);
  }, [cart, product._id]);

  const handleAddCart = () => {
    const newItem: ICartItem = {
      _id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    addToCart(newItem);
  };

  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {/* Imagen del producto */}
      <a href={`/${product.name}`} className="block relative h-48 rounded-lg overflow-hidden">
        <Image
          alt={product.description || 'Imagen del producto'}
          src={"/images/magnesio.png"}
          layout="fill"
          objectFit="cover"
        />
      </a>

      {/* Información del producto */}
      <div className="mt-4 flex flex-col items-start justify-between h-full">
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
        <p className="text-lg font-semibold text-gray-900 mt-1">${product.price.toFixed(2)}</p>

        {/* Botón para agregar al carrito */}
        <button
          onClick={handleAddCart}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white ${isAdded ? 'bg-green-500' : 'bg-blue-500'} 
            hover:${isAdded ? 'bg-green-600' : 'bg-blue-600'} transition-all focus:outline-none`}
          disabled={isAdded}
        >
          {isAdded ? 'Agregado al carrito' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
