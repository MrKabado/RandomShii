import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [category, setCategory] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("")
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortOrder, setSortOrder] = useState("random");

  const [addedCarts, setAddedCarts] = useState(0);

  
  //for getting the data
  useEffect(() => {
    fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);

      const categories = [...new Set(data.products.map(p => p.category))];
      setCategory(categories);

    });

  }, []);

  const filteredProducts = products
    //search by product title and brand
    .filter(product => searchProduct ? 
      product.title?.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchProduct.toLowerCase())
      : true)

    .filter(product => selectedCategory ? product.category === selectedCategory : true)

    .filter(product => minPrice ? product.price >= minPrice : true)

    .filter(product => maxPrice ? product.price <= maxPrice : true)

    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder == "desc") return b.price - a.price;
      return 0;
    });

  //for pagination
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = filteredProducts.slice(firstPostIndex, lastPostIndex);



  return (
    <>
    <Navbar 
      searchBarValue={searchProduct}
      searchBarOnchange={(e) => setSearchProduct(e.target.value)}
      badgeCL={addedCarts === 0 ? "hidden" : "block"}
      carts={addedCarts}
    />

    <div className='p-5 lg:px-20 flex flex-col gap-10 items-center'>
      
      {/* CATEGORY */}
      <div className='flex flex-col sm:flex-row justify-between border rounded-md p-2 gap-2 w-full'>
        <div className='w-fit flex gap-3'>
          <label htmlFor="item-category">Category</label>
          <select 
            name="" 
            id="item-category"
            className='border rounded-sm px-2'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          > 
            <option value="">All</option>
            {category.map((cat, index) => (
              <option id='selected-category' key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='flex gap-5'>
          <div className='flex gap-3'>
            <label htmlFor="minimum-input">Min. Price</label>
            <input 
              id='minimum-input'
              type="number" 
              placeholder='0'
              className='w-15'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className='flex gap-3'>
            <label htmlFor="maximum-input">Max. Price</label>
            <input 
              id='maximum-input'
              type="number" 
              placeholder='0'
              className='w-15'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className='flex gap-3'>
          <label htmlFor="selected-sort">Sort Price By</label>
          <select 
            name="" 
            id="selected-sort" 
            className='border rounded-sm'
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="random">Random</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* DISPLAY PRODUCTS */}
      <div className='w-full flex items-center justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 w-full'>
          { 
            currentPost.map((product, index) => (
              <ProductCard 
                key={product.id}
                image={product.images[0]}
                title={product.title}
                price={`$${product.price}`}
                stocks={product.stock}
                rating={product.rating}
                productOnClick={() => {
                  setAddedCarts(prev => prev + 1);
                }}
              />
            ))
          } 
        </div>
      </div>
      
      {/* PAGINATION */}
      <div>
        <Pagination 
          totalPosts={filteredProducts.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

    </div>
    </>
  )
}

export default Homepage
