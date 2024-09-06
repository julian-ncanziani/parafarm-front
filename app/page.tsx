'use client'
import { useState } from "react";
import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

export default function Home() {

  const [showCart, setShowCart] = useState<boolean>(false);

  function openCart() {
    setShowCart(true);
  }

  function closeCart() {
    setShowCart(false);
  }

  return (
    <main className="">
      <Navbar openCart={openCart}/>
      <Cart open={showCart} onClose={closeCart}/>
      <ProductList/>
      <Footer/>
    </main>
  );
}
