import React from 'react'
import { useState } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Alert = ({modalBtnOnClick, alertText}) => {
  return (
    <div className="fixed top-17 left-1/2 transform -translate-x-1/2 bg-white border-2 px-6 py-4 rounded-lg shadow-lg flex items-center justify-between w-[350px] sm:w-[550px]">
      <CheckCircleIcon className="h-6 w-6 mr-2 text-black" />
      
      <div className="flex items-center">        
        <p className='text-black flex gap-2 text-xs md:text-sm'><span className='text-black font-semibold'>{alertText}</span> Item added to your cart!</p>
      </div>

      <button className='ml-2' onClick={modalBtnOnClick}>
        <XMarkIcon className="h-6 w-6 text-black hover:text-gray-500 cursor-pointer"/>
      </button>
  </div>
  )
}


export default Alert
