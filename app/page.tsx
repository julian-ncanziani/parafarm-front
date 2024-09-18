import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import WhatsappBtn from "@/components/WhatsAppBtn";
export default function Home() {


  return (
    <>
      <Navbar/>
      <WhatsappBtn></WhatsappBtn>
      <Cart/>
      <ProductList/>
      <Footer/>
    </>
  );
}
