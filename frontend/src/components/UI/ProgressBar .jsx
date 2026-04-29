import React from 'react'

function ProgressBar ({percent}) {
    const formattedPercent = percent.toFixed(1);
   return (
    <div className="relative bg-gray-200 rounded-full h-6">
      <div 
        className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
        style={{ width: `${percent}%` }}
      >
        {percent > 15 && (
          <span className="text-xs font-medium text-white">{formattedPercent}%</span>
        )}
      </div>
      {percent <= 15 && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-700">
          {formattedPercent}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar 
