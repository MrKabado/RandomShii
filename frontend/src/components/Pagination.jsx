import React, { useState } from 'react'

const Pagination = ({totalPosts, postPerPage, setCurrentPage}) => {
  let pages = [];
  
  for (let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++) {
    pages.push(i);
  }

  const [active, setActive] = useState(0);
  return (
    <div className='flex gap-3 items-center justify-center'>
      {
        pages.map((page, index) => {
          return (
            <button 
              key={index}
              className={`border-2 border-black px-3 py-1 rounded-md cursor-pointer transition-transform hover:bg-black hover:text-white
              ${active === index ? "bg-black text-white" : "bg-white text-black"}`}
              onClick={() => {
                setCurrentPage(page);
                setActive(index);
              }}
            >
              {page}
            
            </button>
          )
        })
      }
    </div>
  )
}

export default Pagination
