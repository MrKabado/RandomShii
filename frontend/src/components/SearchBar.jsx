import React from 'react'
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline'

const SearchBar = () => {
  return (
    <div className='border rounded-md px-1 flex items-center group'>
      <MagnifyingGlassIcon 
        className='w-4 h-4 text-gray-400'
      />

      <input 
        type="text" 
        placeholder='Search'
        className='px-2 py-1 outline-none text-sm text-md w-30'
      />
    </div>
  )
}

export default SearchBar
