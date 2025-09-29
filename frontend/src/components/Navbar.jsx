import React from 'react'
import SearchBar from './SearchBar'
import ShoppingCart from './ShoppingCart'

const Navbar = ({searchBarValue, searchBarOnchange, badgeCL, carts, cartOnClick}) => {
  return (
    <header className='flex justify-between px-5 py-3 items-center shadow-[0_0_3px_0_gray] lg:px-20 sticky top-0 bg-white z-50'>
      <h1 className='text-xl font-semibold md:text-2xl'>
        RandomShii
      </h1>
      
      <SearchBar 
        value={searchBarValue}
        onChange={searchBarOnchange}
      />

      <ShoppingCart 
        badgeCL={badgeCL}
        carts={carts}
        cartOnClick={cartOnClick}
      />
    </header>
  )
}

export default Navbar
