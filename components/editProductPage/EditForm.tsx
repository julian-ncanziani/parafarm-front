'use client'
import { useState, ChangeEvent } from 'react';
import IProduct from '@/interfaces/IProduct';
import ICustomResponse from '@/interfaces/ICustomResponse';

interface IEditProductFormProps {
  product: IProduct | null;
}

interface IUpdateField {
  field: string;
  value?: string | boolean;
  valueNumber?: number;
}

const EditProductForm: React.FC<IEditProductFormProps> = ({ product }) => {

  const [editedFields, setEditedFields] = useState<IUpdateField[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isActive, setIsActive] = useState(product?.active || false);  // Estado para active
  const [loading, setLoading] = useState(false);  // Estado de carga


  // Maneja el cambio de todos los inputs, incluido el toggle de 'active'
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, checked } = e.target as HTMLInputElement;

    // Verifica si el campo es un número
    const isNumericField = name === 'price' || name === 'stock';
    const parsedValue = isNumericField ? Number(value) : value;

    const updatedField: IUpdateField = isNumericField
      ? { field: name, valueNumber: parsedValue as number }
      : { field: name, value: parsedValue as string };

    // Si el campo es el toggle (activo o inactivo), maneja el booleano
    if (name === 'active') {
      const toggleValue = checked ? true : false;
      setIsActive(checked);  // Actualiza el estado del toggle
      setEditedFields((prevFields) => {
        const existingFieldIndex = prevFields.findIndex((field) => field.field === 'active');
        if (existingFieldIndex !== -1) {
          const updatedFields = [...prevFields];
          updatedFields[existingFieldIndex] = { field: 'active', value: toggleValue };
          return updatedFields;
        } else {
          return [...prevFields, { field: 'active', value: toggleValue }];
        }
      });
    } else {
      // Para todos los otros campos
      setEditedFields((prevFields) => {
        const existingFieldIndex = prevFields.findIndex((field) => field.field === name);
        if (existingFieldIndex !== -1) {
          const updatedFields = [...prevFields];
          updatedFields[existingFieldIndex] = updatedField;
          return updatedFields;
        } else {
          return [...prevFields, updatedField];
        }
      });
    }
    setIsChanged(true);
  };

  const handleSaveChanges = async () => {
    setLoading(true);  // Activa el estado de carga

    try {
      const res = await fetch(`/api/admin/product?id=${product?._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFields),
        cache: 'no-store',
      });      
      const api_response: ICustomResponse<IProduct> = await res.json();
      const { data, error, message} = api_response
      setIsChanged(false); // Resetea el estado de cambios una vez guardado
      setEditedFields([]);  // Limpia los campos editados
      if(error) throw(message)
      alert(message);  // Mensaje de error
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert(error);  // Mensaje de error
    } finally {
      setLoading(false);  // Desactiva el estado de carga
    }
  };

  return (
    <div>
      <div className="px-4 sm:px-0 relative">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información del producto</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
        <button
          onClick={handleSaveChanges}
          disabled={!isChanged || loading}
          className={`absolute top-0 right-0 text-sm px-4 py-2 rounded-md 
            ${isChanged && !loading ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 4v1.5c4.2 0 7.5 3.3 7.5 7.5S16.2 20 12 20v1.5c5.8 0 10.5-4.7 10.5-10.5S17.8 4 12 4z" fill="none" />
              </svg>
              Cargando...
            </span>
          ) : 'Guardar cambios'}
        </button>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Campo Nombre */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="name"
                defaultValue={product?.name || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </dd>
          </div>

          {/* Campo Active (Toggle Button) */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Activo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="relative inline-block w-14 h-8 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="active"
                  id="toggleActive"
                  checked={isActive}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label
                  htmlFor="toggleActive"
                  className={`flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <span
                    className={`block w-6 h-6 bg-white rounded-full border-2 border-gray-400 shadow-md transform transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </label>
              </div>
            </dd>
          </div>

          {/* Campo Precio */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Precio</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="price"
                defaultValue={product?.price || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </dd>
          </div>

          {/* Campo Stock */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Stock</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                name="stock"
                defaultValue={product?.stock || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </dd>
          </div>

          {/* Campo Categoría */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Categoría</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                disabled
                type="text"
                name="category"
                defaultValue={product?.category_id}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Imagen</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <img
                src={product?.image}
                alt="Product Image"
                className="w-32 h-32 object-cover"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default EditProductForm;
