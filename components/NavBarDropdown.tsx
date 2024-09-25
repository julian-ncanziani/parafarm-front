'use client'; 
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Overlay que oscurece el fondo */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={handleToggle} // Cierra el dropdown al hacer clic en el overlay
        />
      )}

      <div>
        <button
          onClick={handleToggle}
          onMouseEnter={() => {
            if(isOpen) return;
            else setIsOpen(true)}
          }
          className="flex items-center text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Catalogo
          <ChevronDownIcon className="w-5 h-5 ml-2 transition-transform" />
        </button>
      </div>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-30 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        
        onMouseLeave={() => setIsOpen(false)}
      >
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
          Suplementos
        </a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
          Cosmetica
        </a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
          Hierbas Naturales
        </a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
          Tintura Madre
        </a>
      </div>
    </div>
  );
}
