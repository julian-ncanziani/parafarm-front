'use client'
import React, { useState, useEffect } from 'react';
import IProduct from '@/interfaces/IProduct'; // Ajusta la ruta si es necesario
import ICartItem from '@/interfaces/ICartItem'; // Ajusta la ruta si es necesario


interface ProductListItemProps {
  product: IProduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    const itemInCart = cart.find(item => item._id === product._id);
    if (itemInCart) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [product._id]);

  const getCartFromLocalStorage = (): ICartItem[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const updateCartInLocalStorage = (cart: ICartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    const cart = getCartFromLocalStorage();
    const existingItemIndex = cart.findIndex(item => item._id === product._id);

    if (existingItemIndex !== -1) {
      // Increment quantity if item already in cart
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const cartItem: ICartItem = {
        _id: product._id,
        name: product.name,
        image: product.image,
        color: '', // Ajustar si es necesario
        price: product.price.toFixed(2),
        quantity: 1,
        imageSrc: product.image,
        imageAlt: product.description,
      };
      cart.push(cartItem);
    }

    updateCartInLocalStorage(cart);
    setIsAdded(true);
    console.log(`Producto ${product._id} agregado al carrito`);
  };

  return (
    <div className="flex flex-col h-full">
      <a href={`/${product.name}`} className="flex flex-col h-full">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            alt={product.description}
            src={product.image}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      </a>
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
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
