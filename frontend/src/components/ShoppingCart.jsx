import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const ShoppingCart = ({carts, badgeCL, cartOnClick}) => {
  return (
    <>
      <div className="relative inline-block">
        {/* The icon */}
        <ShoppingCartIcon 
          className="w-8 h-8 text-black cursor-pointer hover:text-gray-700" 
          onClick={cartOnClick}
        />

        {/* The badge */}
        <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ${badgeCL}`}>
          {carts}
        </span>
      </div>

    </>
  )
}

export default ShoppingCart
