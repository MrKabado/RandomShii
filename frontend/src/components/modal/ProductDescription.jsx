import React from 'react'
import { XMarkIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import img from "../../assets/attacksharkx11.jpg"

const ProductDescription = (props) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-40"></div>

      {/* Modal */}
      <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-[0_0_3px_0_gray] flex flex-col items-center w-[350px] sm:w-[550px] h-[400px] z-50">       
        <div className='flex justify-between w-full items-center'>
          {/* Cart icon with badge */}
          <div className="relative inline-block">
            <DocumentTextIcon className="h-6 w-6 mr-2 text-black" />
          </div>

          <div className="flex items-center">        
            <p className='text-black flex gap-2 text-xs md:text-sm font-semibold lg:text-lg'>Product Description</p>
          </div>

          <button className='ml-2'>
            <XMarkIcon 
              className="h-6 w-6 text-black hover:text-gray-500 cursor-pointer"
              onClick={props.checkOutCloseBtnOnClick}
            />
          </button>
        </div>

        {/* Body */}
        <div className="w-full mx-auto bg-white rounded-xl overflow-y-scroll">
          <img 
            src={props.productImage} 
            alt="Essence Mascara Lash Princess" 
            className="w-full h-64 object-contain p-4 bg-gray-50 rounded-md"
          />

          {/* Below Image */}

          <div className="p-2 flex flex-col gap-2 text-sm">
            {/* Title and Brand */}

            <h2 className="text-lg font-semibold text-gray-800">{props.productTitle}</h2>
            <p className="text-gray-500 text-xs">Brand: <span className="font-medium text-gray-700">{props.productBrand}</span></p>
            <p className="text-gray-500 text-xs">Category: {props.productCategory}</p>

            {/* Description */}
            <p className="text-gray-600 text-justify">
              {props.productDescription}
            </p>

            {/* Price and Discounted Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-green-600">
                ${props.productPriceFinal}
              </span>
              <span className="line-through text-gray-400">${props.productPrice}</span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
                {props.productPercentage}%
              </span>
            </div>

            {/* Stocks and Rating */}
            <div className="flex justify-between mt-2">
              <p className="text-gray-600 text-xs">Stock: <span className="font-medium">{props.productStock}</span></p>
              <p className="text-gray-600 text-xs">Rating: ⭐ {props.productRating}</p>
            </div>

            {/* Other Details */}
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p>SKU: {props.productSKU}</p>
              <p>Weight: {props.productWeight}g</p>
              <p>Dimensions: {props.productWidth} x {props.productHeight} x {props.productDepth} cm</p>
              <p>Warranty: {props.productWarranty}</p>
              <p>Shipping: {props.productShipping}</p>
              <p>Status: <span className="text-green-600 font-medium">{props.productStatus}</span></p>
              <p>Return Policy: {props.productReturnPolicy}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3 border-t pt-2">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">Reviews:</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>⭐ {props.productRating1} — {props.productComment1} ({props.productReviewerName1})</li>
                <li>⭐ {props.productRating2} — {props.productComment2} ({props.productReviewerName2})</li>
                <li>⭐ {props.productRating3} — {props.productComment3} ({props.productReviewerName3})</li>
              </ul>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mt-3">
              <img 
                src={props.productQr} 
                alt="QR Code" 
                className="w-20 h-20"
              />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ProductDescription
