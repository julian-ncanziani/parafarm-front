import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";


export default function Home() {

  return (
    <>
        <Navbar/>
        <Cart/>
        <ProductList/>
        <Footer/>
    </>
  );
}
