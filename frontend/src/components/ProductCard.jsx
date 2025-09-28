import React from 'react'

const ProductCard = (props) => {
  return (
    <div className='flex flex-col justify-between shadow-[0_0_3px_0_gray] rounded-lg items-center p-4 gap-3'>
      <img 
        src={props.image} 
        alt="Product1" 
        className='w-50'
        />

      <div className='flex flex-col w-full'>
        <h1 className='text-center text-xs font-semibold mb-2'>{props.title}</h1>
        <h1 className='text-center text-xs font-semibold mb-2 text-[#DC2626]'>{props.brand}</h1>
        <div className='flex justify-between text-xs font-semibold'>
          <p>Price:</p>
          <p className='text-gray-400 line-through'>{props.price}</p>
        </div>

        <div className='flex justify-between text-xs font-semibold'>
          <p>Discounted Price:</p>
          <p className='text-red-600'>{props.discountedPrice}</p>
        </div>

        <div className='flex justify-between text-xs font-semibold'>
          <p>Stocks:</p>
          <p className={`${props.stocks <= 10 ? "text-red-600" : "text-black"}`}>
            {props.stocks}
          </p>
        </div>
        <div className='flex justify-between text-xs font-semibold'>
          <p>Rating:</p>
          <p>{props.rating}/5</p>
        </div>
      </div>

      <button 
        className='border w-full p-1 rounded-md bg-black text-white text-xs hover:scale-[1.02] transition cursor-pointer'
        onClick={props.productOnClick}
      >      
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard
