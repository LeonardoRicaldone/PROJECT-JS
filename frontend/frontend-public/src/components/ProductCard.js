import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const getStockStatus = (stock) => {
    if (stock > 10) return { color: 'bg-green-100 text-green-800 border-green-200', text: 'En Stock' };
    if (stock > 0) return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Poco Stock' };
    return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Sin Stock' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 mr-4">
            {product.name}
          </h3>
          
          <div className="flex space-x-2 flex-shrink-0">
            <button
              onClick={() => onEdit(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              title="Editar producto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            <button
              onClick={() => onDelete(product._id)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              title="Eliminar producto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 h-12 overflow-hidden text-sm leading-relaxed">
          {product.description || 'Sin descripción disponible'}
        </p>
        
        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-3xl font-bold text-green-600">
            ${product.price.toLocaleString('es-CO')}
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${stockStatus.color}`}>
            {stockStatus.text}: {product.stock}
          </div>
        </div>
        
        {/* Progress bar for stock */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              product.stock > 10 ? 'bg-green-500' : 
              product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
          ></div>
        </div>
        
        {/* Created date */}
        {product.createdAt && (
          <div className="mt-3 text-xs text-gray-400">
            Creado: {new Date(product.createdAt).toLocaleDateString('es-CO')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;