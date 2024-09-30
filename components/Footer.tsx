import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Información del comercio */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Comercio XYZ</h2>
          <p className="mt-2">
            123 Calle Principal<br />
            Ciudad, País 12345
          </p>
          <p className="mt-2">Tel: (123) 456-7890</p>
          <p className="mt-2">Email: info@comercioxyz.com</p>
        </div>

        {/* Enlaces importantes */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Enlaces</h2>
          <ul>
            <li className="mt-2">
              <a href="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</a>
            </li>
            <li className="mt-2">
              <a href="/services" className="text-gray-400 hover:text-white">Servicios</a>
            </li>
            <li className="mt-2">
              <a href="/contact" className="text-gray-400 hover:text-white">Contacto</a>
            </li>
            <li className="mt-2">
              <a href="/privacy" className="text-gray-400 hover:text-white">Política de Privacidad</a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Síguenos</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white" aria-label="Facebook">
              <FaFacebookF className="h-5 w-5" />
            </a>
            {/**
            <a href="https://twitter.com" className="text-gray-400 hover:text-white" aria-label="Twitter">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
             */}
            <a href="https://instagram.com" className="text-gray-400 hover:text-white" aria-label="Instagram">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 py-4 mt-6 text-center">
      <p className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Parafarmacia Argentina. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
