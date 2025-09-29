import React from 'react'
import { useState } from 'react';
import { XMarkIcon, CreditCardIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ReusableAlert from './ReusableAlert';

const CheckOut = (props) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-40"></div>

      {/* Modal */}
      <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-[0_0_3px_0_gray] flex flex-col items-center w-[350px] sm:w-[550px] h-[400px] z-50">       
        <div className='flex justify-between w-full items-center'>
          {/* Cart icon with badge */}
          <div className="relative inline-block">
            <CreditCardIcon className="h-6 w-6 mr-2 text-black" />
          </div>

          <div className="flex items-center">        
            <p className='text-black flex gap-2 text-xs md:text-sm font-semibold lg:text-lg'>Check Out</p>
          </div>

          <button className='ml-2'>
            <XMarkIcon 
              className="h-6 w-6 text-black hover:text-gray-500 cursor-pointer"
              onClick={props.checkOutCloseBtnOnClick}
            />
          </button>
        </div>

        {/* FILL UPANAN */}
        <div className='overflow-y-scroll w-full h-full m-2 p-2 flex flex-col'>
          {props.checkOutBody}
        </div>

        {/* Footer */}
        <div className='flex justify-between w-full px-4 items-center'>
          {props.totalPrice}

          <button 
            className={`px-2 bg-black text-white rounded-sm cursor-pointer hover:bg-gray-700 w-30 ${props.placeOrderBtnCL}`}
            onClick={props.placeOrderBtnOnClick}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  )
}

export default CheckOut
