import React, { useState, useEffect } from 'react';
import { FaBox, FaUsers, FaBuilding, FaChartBar } from 'react-icons/fa';

const Home = () => {
  const [data, setData] = useState({
    products: 0,
    employees: 0,
    branches: 0
  });

  const fetchData = async () => {
    try {
      const productsResponse = await fetch("http://localhost:4000/api/products");
      const employeesResponse = await fetch("http://localhost:4000/api/employees");
      const branchesResponse = await fetch("http://localhost:4000/api/branches");

      const productsData = await productsResponse.json();
      const employeesData = await employeesResponse.json();
      const branchesData = await branchesResponse.json();

      setData({
        products: productsData.length,
        employees: employeesData.length,
        branches: branchesData.length
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <FaChartBar className="inline mr-3" />
          Dashboard
        </h1>
        <p className="text-gray-600">Resumen general del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Productos</p>
              <p className="text-2xl font-bold text-gray-800">{data.products}</p>
            </div>
            <FaBox className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Empleados</p>
              <p className="text-2xl font-bold text-gray-800">{data.employees}</p>
            </div>
            <FaUsers className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sucursales</p>
              <p className="text-2xl font-bold text-gray-800">{data.branches}</p>
            </div>
            <FaBuilding className="text-3xl text-purple-500" />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bienvenido al Sistema</h2>
        <p className="text-gray-600">
          Gestion de datos
        </p>
      </div>
    </div>
  );
};

export default Home;