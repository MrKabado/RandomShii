import React from 'react'
import { XMarkIcon } from "@heroicons/react/24/solid";

const ReusableAlert = (props) => {
  return (
    <div className={`fixed top-15 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg flex items-center justify-between w-[350px] sm:w-[550px] ${props.className}`}>
      {props.icon}
      
      <div className="flex items-center justify-center">        
        <p className={`flex gap-2 text-xs md:text-sm ${props.alertTextCL}`}>{props.alertText}</p>
      </div>

      <button className='ml-2' onClick={props.modalBtnOnClick}>
        <XMarkIcon className={`h-6 w-6 hover:text-gray-500 cursor-pointer ${props.xIconCL}`}/>
      </button>
    </div>
  )
}

export default ReusableAlert
