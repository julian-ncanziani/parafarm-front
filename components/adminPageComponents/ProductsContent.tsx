'use client';
import { useState, useEffect } from 'react';
import ICustomResponse from '@/interfaces/ICustomResponse';
import { useRouter } from 'next/navigation';
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

  const router = useRouter();
  const [state, setState] = useState<ICustomResponse<IProduct[]>>({ data: [], error: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [inputfilter, setInputfilter] = useState('');
  const [checkboxEdit, setCheckboxEdit] = useState<string[]>([]); // Estado para los IDs seleccionados
  const [selectAll, setSelectAll] = useState(false); // Estado para el checkbox de "Select All"


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

  const handleCheckboxChange = (productId: string) => {
    setCheckboxEdit(prevState =>
      prevState.includes(productId)
        ? prevState.filter(id => id !== productId) // Eliminar si ya está seleccionado
        : [...prevState, productId] // Agregar si no está seleccionado
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Seleccionar todos
      const allProductIds = filteredProducts?.map(product => product._id) || [];
      setCheckboxEdit(allProductIds);
    } else {
      // Deseleccionar todos
      setCheckboxEdit([]);
    }
  };

  const handleEditSelected = () => {
    // Aquí puedes manejar la lógica de edición de los productos seleccionados
    console.log("Productos seleccionados para editar:", checkboxEdit);
  };

  const handleRedirectToEditPage = (id: string) => {
    router.push(`/admin/products/${id}`);
  };


  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <p className="text-gray-600 mb-4">A list of all the products in your inventory including their name, description, stock, and price.</p>    
      {/* Search input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={inputfilter}
          onChange={(e) => setInputfilter(e.target.value)}
          className="mb-4 md:mb-0 p-2 border border-gray-300 rounded w-full md:w-64" // Adjust width as needed
        />
      </div>
      {/* Select All Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
          className="mr-2"
        />
        <label htmlFor="select-all" className="text-sm text-gray-600">Select All</label>
        {/* Botón de Editar */}
        <button
          onClick={handleEditSelected}
          disabled={checkboxEdit.length === 0}
          className={`ml-4 px-2 py-1 text-sm text-white rounded-lg transition-all duration-200 
            ${checkboxEdit.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Editar
        </button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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
                    <td className="px-5 py-4 ">
                      <input 
                      type="checkbox" 
                      checked={checkboxEdit.includes(product._id)}
                      onChange={() => handleCheckboxChange(product._id)}
                      />
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">$ {product.price.toFixed(2)}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleRedirectToEditPage(product._id)} className="text-indigo-600 hover:text-indigo-900">Full Edit</button>
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
