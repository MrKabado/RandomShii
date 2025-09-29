import React from 'react'
import { XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const CartList = (props) => {
  return (
    <>
    <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-[350px] sm:w-[550px] h-[400px]">
      <div className='flex justify-between w-full'>
        <ShoppingCartIcon className="h-6 w-6 mr-2 text-black" />
        
        <div className="flex items-center">        
          <p className='text-black flex gap-2 text-xs md:text-sm font-semibold'>Your Cart</p>
        </div>

        <button className='ml-2'>
          <XMarkIcon 
            className="h-6 w-6 text-black hover:text-gray-500 cursor-pointer"
            onClick={props.cartListOnClickBtn}
          />
        </button>
      </div>

      <div className='overflow-y-scroll w-full h-full m-2 p-2 flex flex-col'>
        {props.itemList}
      </div>

      <button 
        className='px-2 bg-black text-white rounded-sm cursor-pointer hover:bg-gray-700'
        onClick={props.checkOutBtnOnClick}
      >
        Check Out
      </button>
    </div>
    </>
  )
}

export default CartList
