import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  
  useEffect(() => {
    fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products)
    })

  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);
 
  return (
    <>
    <Navbar />

    <div className='p-5 flex flex-col gap-10'>
      
      {/* CATEGORY */}
      

      {/* DISPLAY PRODUCTS */}
      <div className='w-full flex items-center justify-center'>
        <div className='grid grid-cols-2 gap-5'>
          {
            currentPost.map((product, index) => (
              <ProductCard 
                key={product.id}
                image={product.images[0]}
                title={product.title}
                price={`$${product.price}`}
                rating={product.rating}
              />
            ))
          } 
        </div>
      </div>
      
      {/* PAGINATION */}
      <div>
        <Pagination 
          totalPosts={products.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

    </div>
    </>
  )
}

export default Homepage
