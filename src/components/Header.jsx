import React from 'react'

const Header = () => {
  return (
    <div className=''>
      {/* Heading Bar */}
      <div className="mb-4 md:mb-0 hover:scale-105 transition-transform duration-400">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          FactWise <span className="text-blue-600">Dashboard</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage employee records and performance.
        </p>
      </div>
    </div>
  )
}

export default Header
