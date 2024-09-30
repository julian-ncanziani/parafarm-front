import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black-100">
      <div className="flex space-x-2">
        {/* Primer punto */}
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce1"></div>
        {/* Segundo punto */}
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce2"></div>
        {/* Tercer punto */}
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce3"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;