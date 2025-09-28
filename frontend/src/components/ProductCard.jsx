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
        <h1 className='text-center text-md font-semibold mb-2'>{props.title}</h1>
        <div className='flex justify-between text-sm font-semibold'>
          <p>Price:</p>
          <p>{props.price}</p>
        </div>
        <div className='flex justify-between text-sm font-semibold'>
          <p>Rating:</p>
          <p>{props.rating}</p>
        </div>
      </div>

      <button 
        className='border w-full p-1 rounded-md bg-black text-white text-sm'
      >      
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard
