import React from 'react'
import SearchBar from './SearchBar'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <header className='flex justify-between px-5 py-3 items-center shadow-[0_0_3px_0_gray]'>
      <h1 className='text-xl font-semibold'>
        RandomShii
      </h1>
      
      <SearchBar />

      <ShoppingCartIcon 
        className='w-6'
      />
    </header>
  )
}

export default Navbar
