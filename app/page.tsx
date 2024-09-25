import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import WhatsappBtn from "@/components/WhatsAppBtn";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="sticky top-0 z-10 bg-white shadow-md">
          <Navbar />
        </header>

        {/* Botón de WhatsApp */}
        <WhatsappBtn />

        {/* Contenido principal */}
        <main className="flex-1 bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <Cart />
            <ProductList />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
}
