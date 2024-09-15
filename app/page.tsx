'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";



const queryClient = new QueryClient();

export default function Home() {

  

  return (
    <QueryClientProvider client={queryClient}>
        <Navbar/>
        <Cart/>
        <ProductList/>
        <Footer/>
    </QueryClientProvider>
  );
}
