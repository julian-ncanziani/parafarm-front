'use client'
// context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import IProduct from '@/interfaces/IProduct';
import ICartItem from '@/interfaces/ICartItem';



interface CartContextProps {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<IProduct[]>([]);

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(product => product._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
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
