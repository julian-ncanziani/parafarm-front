import axios from 'axios';
import ProductListItem from "./ProductListItem";
import IProduct from "@/interfaces/IProduct";
import ICustomResponse from "@/interfaces/ICustomResponse";

const getProducts = async (): Promise<ICustomResponse<IProduct[]>> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/productsv2', {timeout: 180000});
  const data = response.data;
  return data;
};

export default async function ProductList() {
  const { data, error, message } = await getProducts();

  if (error) {
    return (
      <div className="bg-white min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500 text-lg font-bold">{message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[80vh] py-16">
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-black">Productos Destacados</h2>
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((product: IProduct) => (
            <ProductListItem product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
