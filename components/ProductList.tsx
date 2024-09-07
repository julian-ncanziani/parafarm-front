'use client'
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import ProductListItem from "./ProductListItem";
import IProduct from "@/interfaces/IProduct";


export default function ProductList() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['queryProducts'],
    queryFn: (): Promise<IProduct[]> =>
      fetch('https://parafarm-back.onrender.com/products', { cache: "no-store"} ).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <Loading></Loading>

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="bg-white min-h-[80vh]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Título de la sección */}
        <div className="mb-8 border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-bold text-black">Productos Destacados</h2>
        </div>
        {/* Lista de productos */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data?.map((product) => (
            <ProductListItem product={product} key={product._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}


