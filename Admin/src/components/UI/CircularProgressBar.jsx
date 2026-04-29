import React from 'react'

const CircularProgressBar = ({ percent, color = "#3b82f6" }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const formattedPercent = percent.toFixed(1);
  
  return (
    <div className="inline-flex items-center justify-center">
      <svg width="120" height="120">
        {/* الدائرة الخلفية */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
          transform="rotate(-90 60 60)"
        />
        
        {/* الدائرة الأمامية */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
        
        {/* النسبة في المنتصف */}
        <text
          x="60"
          y="67"
          textAnchor="middle"
          fill="#1f2937"
          fontSize="20"
          fontWeight="bold"
        >
          {formattedPercent}%
        </text>
      </svg>
    </div>
  )
}

export default CircularProgressBar