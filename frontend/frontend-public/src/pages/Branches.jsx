import React, { useState, useEffect } from 'react';
import { FaBuilding, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    schedule: ''
  });

  const fetchBranches = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/branches");
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingBranch 
        ? `http://localhost:4000/api/branches/${editingBranch._id}`
        : "http://localhost:4000/api/branches";
      
      const method = editingBranch ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      fetchBranches();
      resetForm();
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta sucursal?')) {
      try {
        await fetch(`http://localhost:4000/api/branches/${id}`, {
          method: 'DELETE',
        });
        fetchBranches();
      } catch (error) {
        console.error("Error deleting branch:", error);
      }
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      telephone: branch.telephone,
      schedule: branch.schedule
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', telephone: '', schedule: '' });
    setEditingBranch(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          <FaBuilding className="inline mr-3" />
          Sucursales
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" />
          Nueva Sucursal
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingBranch ? 'Editar Sucursal' : 'Nueva Sucursal'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Teléfono
              </label>
              <input
                type="text"
                value={formData.telephone}
                onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Horario
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                {editingBranch ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch._id} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{branch.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(branch)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(branch._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-purple-500" />
                <span className="text-sm">{branch.address}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <FaPhone className="mr-2 text-purple-500" />
                <span className="text-sm">{branch.telephone}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2 text-purple-500" />
                <span className="text-sm">{branch.schedule}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {branches.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FaBuilding className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">No hay sucursales registradas</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Crear Primera Sucursal
          </button>
        </div>
      )}
    </div>
  );
};

export default Branches;