import React from 'react'
import { XMarkIcon, ShoppingCartIcon, HashtagIcon } from "@heroicons/react/24/solid";

const Quantity = (props) => {
  return (
    <>
      <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-[350px] sm:w-[550px] h-[200px]">
      <div className='flex justify-between w-full'>
        <HashtagIcon className="h-6 w-6 mr-2 text-black" />
        
        <div className="flex items-center">        
          <p className='text-black flex gap-2 text-xs md:text-sm font-semibold'>Quantity</p>
        </div>

        <button className='ml-2'>
          <XMarkIcon 
            className="h-6 w-6 text-black hover:text-gray-500 cursor-pointer"
            onClick={props.quantityListOnClickBtn}
          />
        </button>
      </div>

      <div className='w-full h-full m-2 p-2 flex'>
        {props.itemList}
      </div>

      <div className='flex justify-between w-full px-4'>
        <h1>Total Price: </h1>

        <button 
          className='px-2 bg-black text-white rounded-sm cursor-pointer hover:bg-gray-700 w-30'
          onClick={props.checkOutBtnOnClick}
        >
          Add to cart
        </button>
      </div>
    </div>
    </>
  )
}

export default Quantity
