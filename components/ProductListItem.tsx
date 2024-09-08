'use client'
import React, { useState, useEffect } from 'react';
import IProduct from '@/interfaces/IProduct'; // Ajusta la ruta si es necesario
import ICartItem from '@/interfaces/ICartItem'; // Ajusta la ruta si es necesario
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductListItemProps {
  product: IProduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    // Verifica si el producto está en el carrito y actualiza el estado
    const itemInCart = cart.some(item => item._id === product._id);
    setIsAdded(itemInCart);
  }, [cart, product._id]);

  function handleAddCart() {
    const newItem: ICartItem = {
      _id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: 1
    };
    addToCart(newItem);
  };
  

  return (
    <div className="flex flex-col h-full">
      <a href={`/${product.name}`} className="flex flex-col h-full">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <Image
            alt={product.description}
            src={"/" + product.image}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            width={500} // Proporciona el ancho de la imagen
            height={300} // Proporciona la altura de la imagen
          />
        </div>
      </a>
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddCart}
          className={`mt-4 w-full ${isAdded ? 'bg-green-500' : 'bg-blue-500'} text-white py-2 px-4 rounded-md hover:${isAdded ? 'bg-green-600' : 'bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={isAdded}
        >
          {isAdded ? 'Agregado al carrito' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
