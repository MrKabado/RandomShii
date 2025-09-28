import React, { useState } from 'react'
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline'

const SearchBar = ({value, onChange}) => {
  return (
    <div className='border rounded-md px-1 flex items-center group'>
      <MagnifyingGlassIcon 
        className='w-4 h-4 text-gray-400'
      />

      <input 
        type="text" 
        value={value}
        onChange={onChange}
        placeholder='Search'
        className='px-2 py-1 outline-none text-sm text-md w-30 lg:w-75'
      />
    </div>
  )
}

export default SearchBar
