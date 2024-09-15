import ProductListItem from "./ProductListItem";
import IProduct from "@/interfaces/IProduct";
import ICustomResponse from "@/interfaces/ICustomResponse";

const getProducts = async (): Promise<ICustomResponse<IProduct[]>> => {
  const response = await fetch(process.env.NEXT_PUBLIC_HOST + '/api/products', { cache: 'no-store' });
  const data = await response.json();
  return data;
};

export default async function ProductList() {

  const {data, error, message } = await getProducts();

  if (error) {
    return (
      <div className="bg-white min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500 text-lg font-bold">{message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[80vh]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Título de la sección */}
        <div className="mb-8 border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-bold text-black">Productos Destacados</h2>
        </div>
        {/* Lista de productos */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.map((product: IProduct) => (
            <ProductListItem product={product} key={product._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}


