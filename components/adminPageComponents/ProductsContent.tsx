'use client'
import { useState, useEffect } from 'react';
import ICustomResponse from '@/interfaces/ICustomResponse';
import { FC } from 'react';

interface IProduct {
    _id: string;
    name: string;
    description: string;
    stock: number;
    active: boolean;
    price: number;
}

const ProductContent: FC = () => {
  const [state, setState] = useState<ICustomResponse<IProduct[]>>({ data: [], error: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const data: ICustomResponse<IProduct[]> = await response.json();
        setState(data);
      } catch (error) {
        setState({ data: [], error: true, message: 'Error fetching users' });
      } finally {
        setLoading(false);
        setShowItems(true); // Start showing items after loading
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className={`space-y-4 transform transition-transform duration-500 ease-in-out ${showItems ? 'animate-slideDown' : 'opacity-0'}`}>
          {state.data?.map((product) => (
            <li key={product._id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                <div className="flex-shrink-0">
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500 truncate">{product.description}</p>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate">$ {product.price}</p>
                    <p className="text-sm text-gray-500 truncate">{product.stock} unidades en stock</p>
                </div>
                <div>
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {product.active ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductContent;