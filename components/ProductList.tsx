'use client'
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";

interface IProduct {
  _id: string; 
  id: string;
  name: string;
  href: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  description: string;
  stock: number;
  category_id: string;
  image: string;
};


export default function ProductList() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['queryProducts'],
    queryFn: (): Promise<IProduct[]> =>
      fetch('https://parafarm-back.onrender.com/products').then((res) =>
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
            <a key={product._id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={'img'}
                  src={`${product.imageSrc}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}


