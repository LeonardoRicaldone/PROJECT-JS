import React from 'react';

const CardDashboard = ({ label, data, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600',
    green: 'from-green-500 to-green-600 text-green-600',
    purple: 'from-purple-500 to-purple-600 text-purple-600',
    orange: 'from-orange-500 to-orange-600 text-orange-600',
    red: 'from-red-500 to-red-600 text-red-600',
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-5`}></div>
      
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {label}
            </h3>
            <p className={`text-3xl font-bold ${colorClasses[color]} mt-2`}>
              {typeof data === 'number' ? data.toLocaleString() : data}
            </p>
          </div>
          
          {icon && (
            <div className={`p-3 rounded-full bg-gradient-to-r ${colorClasses[color]} bg-opacity-10`}>
              <div className={`w-8 h-8 ${colorClasses[color]}`}>
                {icon}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className={`h-1 bg-gradient-to-r ${colorClasses[color]} rounded-full`}></div>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;