'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import ICartItem from '@/interfaces/ICartItem';

interface CartContextProps {
  cart: ICartItem[];
  addToCart: (product: ICartItem) => void;
  removeFromCart: (id: string) => void;
  getItemCount: () => number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Este efecto asegura que el acceso a localStorage solo ocurra en el cliente
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);  

  const addToCart = (item: ICartItem) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    })
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const updateCart = prevCart.filter(item => item._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updateCart));
      return updateCart;
    });
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        getItemCount,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
