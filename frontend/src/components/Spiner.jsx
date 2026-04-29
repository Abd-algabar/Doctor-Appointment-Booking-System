import React from 'react'

const Spiner = ({text}) => {
  return (
    <div>
         <div className="flex flex-col items-center justify-center py-20">
      {/* سبينر دائري */}
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-blue-100"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      
      {/* أو سبينر بالنقاط */}
      {/* <div className="flex space-x-2">
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce animation-delay-400"></div>
      </div> */}
      
      <p className="mt-6 text-gray-600 font-medium">{text}</p>
      {/* <p className="text-sm text-gray-400 mt-2">يرجى الانتظار...</p> */}
    </div>
    </div>
  )
}

export default Spiner
