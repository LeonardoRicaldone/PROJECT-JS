import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaBuilding } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            Zona Digital
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-blue-200">
              <FaHome />
              <span>Inicio</span>
            </Link>
            <Link to="/products" className="flex items-center space-x-1 hover:text-blue-200">
              <FaBox />
              <span>Productos</span>
            </Link>
            <Link to="/employees" className="flex items-center space-x-1 hover:text-blue-200">
              <FaUsers />
              <span>Empleados</span>
            </Link>
            <Link to="/branches" className="flex items-center space-x-1 hover:text-blue-200">
              <FaBuilding />
              <span>Sucursales</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;