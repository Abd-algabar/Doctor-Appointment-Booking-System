// CancelLoadingSpinner.jsx
import React from 'react';

const CancelLoadingSpinner = ({ size = "small", color = "red" }) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-6 h-6 border-3",
    large: "w-8 h-8 border-4"
  };

  const colorClasses = {
    red: "border-red-200 border-t-red-600",
    white: "border-white/30 border-t-white",
    gray: "border-gray-200 border-t-gray-600",
    primary: "border-[#5f6fff] border-t-[#5f6fff]"
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          rounded-full 
          animate-spin
        `}
      />
    </div>
  );
};

export default CancelLoadingSpinner;