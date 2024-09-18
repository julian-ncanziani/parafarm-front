'use client';
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
  const [inputfilter, setInputfilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products');
        const data: ICustomResponse<IProduct[]> = await response.json();
        setState(data);
      } catch (error) {
        setState({ data: [], error: true, message: 'Error fetching products' });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = state.data?.filter(product =>
    product.name.toLowerCase().includes(inputfilter.toLowerCase())
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <p className="text-gray-600 mb-4">A list of all the products in your inventory including their name, description, stock, and price.</p>
      {/* Search and Table container */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={inputfilter}
          onChange={(e) => setInputfilter(e.target.value)}
          className="mb-4 md:mb-0 p-2 border border-gray-300 rounded w-full md:w-64" // Adjust width as needed
        />
      </div>
      <div className="flex-1 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-h-[calc(100vh-160px)] p-6"> {/* Adjust height based on header and other content */}
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden mb-1">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts?.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$ {product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductContent;
