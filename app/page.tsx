'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from "react";
import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

const queryClient = new QueryClient();

export default function Home() {

  const [showCart, setShowCart] = useState<boolean>(false);

  function openCart() {
    setShowCart(true);
  }

  function closeCart() {
    setShowCart(false);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className="">
        <Navbar openCart={openCart}/>
        <Cart open={showCart} onClose={closeCart}/>
        <ProductList/>
        <Footer/>
      </main>
    </QueryClientProvider>
  );
}
