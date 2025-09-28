import React from 'react'
import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'

const Navbar = ({searchBarValue, searchBarOnchange, badgeCL, carts}) => {
  return (
    <header className='flex justify-between px-5 py-3 items-center shadow-[0_0_3px_0_gray] lg:px-20'>
      <h1 className='text-xl font-semibold sm:text-red-600 md:text-blue-600 lg:text-green-600'>
        RandomShii
      </h1>
      
      <SearchBar 
        value={searchBarValue}
        onChange={searchBarOnchange}
      />

      <ShoppingCart 
        badgeCL={badgeCL}
        carts={carts}
      />
    </header>
  )
}

export default Navbar
