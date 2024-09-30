'use client';
import { useState, useEffect, FC } from "react";
import { updatemanyproductsBody } from "@/app/api/admin/products/route";
import axios from "axios";
import ICustomResponse from "@/interfaces/ICustomResponse";

interface EditProductModalProps {
  productsIds: string[];
  isOpen: boolean;
  closemodal: () => void;
}

interface Field {
  name: string;
  label: string;
  value: string | number | boolean;
}

const EditProductModal: FC<EditProductModalProps> = ({ productsIds, isOpen, closemodal }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState<Field[]>([]);
  const [values, setValues] = useState({
    active: false,
    price: 0,
    pricePercentage: 0,
    percentage: false,  // Propiedad para controlar si el cambio es por porcentaje
    priceUpdateMode: 'fixed', // 'fixed' o 'percentage'
  });

  const availableFields: Field[] = [
    { name: 'active', label: 'Activo', value: false },
    { name: 'price', label: 'Precio', value: 0 }
  ];

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setTimeout(() => setShowModal(false), 300);
    }
  }, [isOpen]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldName = event.target.value;
    const selectedField = availableFields.find(field => field.name === fieldName);

    if (selectedField) {
      setSelectedFields([...selectedFields, { ...selectedField }]);
      event.target.value = ""; 
    }
  };

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setValues(prevValues => ({
      ...prevValues,
      [fieldName]: fieldName === 'price' || fieldName === 'pricePercentage' ? parseFloat(value as string) : value
    }));
  };

  const removeField = (fieldName: string) => {
    setSelectedFields(selectedFields.filter(field => field.name !== fieldName));
  };

  const fieldsNotSelected = availableFields.filter(field => 
    !selectedFields.some(selected => selected.name === field.name)
  );

  /** Envio los datos al backend para guardar los cambios de los campos que acabo de modificar */
  const saveChanges = async () => {
    // Inicializa un objeto vacío para almacenar los cambios
    const updatedData: updatemanyproductsBody = {
      productIds: productsIds,  // IDs de los productos que estás modificando
    };
  
    // Procesamos los campos seleccionados
    selectedFields.forEach(field => {
      if (field.name === 'active') {
        // Solo añade 'active' si su valor es diferente a undefined
        updatedData.active = values.active;
      } else if (field.name === 'price') {
        // Solo añade 'price' si se ha seleccionado
        updatedData.price = {
          amount: values.percentage ? values.pricePercentage : values.price,
          percentaje: values.percentage,
        };
      }
    });
    // Verificamos si hay cambios antes de hacer la llamada
    if (Object.keys(updatedData).length === 1) {
      alert('No se han realizado cambios para enviar.');
      return; // No hacemos nada si no hay cambios
    }   
    const response = await axios.patch('/api/admin/products', updatedData); 
    const data: ICustomResponse<null> = response.data;
    alert(data.message);
    closemodal();  // Cierra el modal
    window.location.reload(); // Recarga la página
    
  };
  

  if (!showModal) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-lg p-8 shadow-lg max-w-lg w-full transform transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        {/* Select para elegir qué campo modificar */}
        {fieldsNotSelected.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Selecciona el campo a modificar:</label>
            <select
              onChange={handleFieldChange}
              className="p-2 border rounded w-full"
              defaultValue=""
            >
              <option value="" disabled>Selecciona una opción</option>
              {fieldsNotSelected.map(field => (
                <option key={field.name} value={field.name}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Tabla que muestra los campos seleccionados */}
        {selectedFields.length > 0 && (
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="p-2 border">Campo</th>
                <th className="p-2 border">Valor</th>
                <th className="p-2 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              {selectedFields.map(field => (
                <tr key={field.name}>
                  <td className="p-2 border">{field.label}</td>
                  <td className="p-2 border">
                    {field.name === 'active' ? (
                      <select
                        value={String(values.active)}
                        onChange={(e) => handleInputChange('active', e.target.value === 'true')}
                        className="p-2 border rounded w-full"
                      >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                    ) : (
                      <>
                        <div className="mb-2 flex flex-col">
                          <label className="mb-1">
                            <input
                              type="radio"
                              name="priceUpdateMode"
                              value="fixed"
                              checked={values.priceUpdateMode === 'fixed'}
                              onChange={(e) => handleInputChange('priceUpdateMode', e.target.value)}
                              onClick={() => handleInputChange('percentage', false)}
                            />
                            Valor fijo
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="priceUpdateMode"
                              value="percentage"
                              checked={values.priceUpdateMode === 'percentage'}
                              onChange={(e) => handleInputChange('priceUpdateMode', e.target.value)}
                              onClick={() => handleInputChange('percentage', true)}
                            />
                            Modificar por porcentaje
                          </label>
                        </div>

                        {values.priceUpdateMode === 'fixed' ? (
                          <input
                            type="number"
                            value={values.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className="p-2 border rounded w-full"
                            placeholder="Ingrese el precio"
                          />
                        ) : (
                          <input
                            type="number"
                            value={values.pricePercentage}
                            onChange={(e) => handleInputChange('pricePercentage', e.target.value)}
                            className="p-2 border rounded w-full"
                            placeholder="Ingrese el porcentaje (ej. 10 para +10%)"
                          />
                        )}
                      </>
                    )}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => removeField(field.name)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={saveChanges}
          >
            Guardar Cambios
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={closemodal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
