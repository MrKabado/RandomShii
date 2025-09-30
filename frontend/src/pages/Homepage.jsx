import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Alert from '../components/modal/Alert'
import CartList from '../components/modal/CartList'
import { MinusCircleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import CheckOut from '../components/modal/CheckOut'
import ReusableAlert from '../components/modal/ReusableAlert'

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

  const [addedCarts, setAddedCarts] = useState(0); //counter for carts
  const [modal, setModal] = useState(false); //for alert or cart
  const [modalItem, setModalItem] = useState("");
  const [openCartList, setOpenCartList] = useState(false); //opening to CartList

  const [itemQuantity, setItemQuantity] = useState([]);
  const [addedItemCarts, setAddedItemCarts] = useState([]); //holder for added items
  const [totalPrice, setTotalPrice] = useState(0);

  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [openReusableAlert, setOpenReusableAlert] = useState(false);

  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");

  const [alertType, setAlertType] = useState("error");


  
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


  const handleAddToCart = (item) => {
    setAddedCarts(prev => prev + 1);
    setModalItem(item.title);
    setModal(true);
    setTotalPrice(prev => prev + item.price);

    setTimeout(() => {
      setModal(false);
    }, 2000);

    setAddedItemCarts((prev) => [...prev, {
      title: item.title,
      price: item.price,
      key: item.key,
    }]);
  };

  const handleDeleteItemCarts = (indexToRemove) => {
    setAddedCarts(prev => prev - 1);
    setAddedItemCarts(prev => {
      const updated = prev.filter((_, index) => index !== indexToRemove);
  
      // recalc total
      const newTotal = updated.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(parseFloat(newTotal.toFixed(2)));
  
      return updated;
    })
  }

  const handlePlaceOrder = () => {
    if (name === "" || contactNo === "" || address === "") {
      setAlertType("error");
      setOpenReusableAlert(true);
      setTimeout(() => {
        setOpenReusableAlert(false);
      }, 2000)
      return;
    }

    setAddedItemCarts([]);
    setAddedCarts(0);
    setAlertType("success");
    setOpenReusableAlert(true);
    setOpenCheckOut(false);
    setTotalPrice(0);

    setTimeout(() => {
      setOpenReusableAlert(false);
      setName("");
      setContactNo("");
      setAddress("");
    }, 2000);
  }

  return (
    <>
    <Navbar 
      searchBarValue={searchProduct}
      searchBarOnchange={(e) => setSearchProduct(e.target.value)}
      badgeCL={addedCarts === 0 ? "hidden" : "block"}
      carts={addedCarts}
      cartOnClick={() => {
        setOpenCartList(!openCartList);
      }}
    />

    <div className='p-5 lg:px-20 flex flex-col gap-10 items-center'>
      
      {/* CATEGORY */}
      <div className='flex flex-col sm:flex-row justify-between shadow-[0_0_2px_0_gray] rounded-md p-2 gap-2 w-full text-xs md:text-sm'>
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
                brand={product.brand}
                price={`$${product.price}`}
                discountedPrice={`$${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}`}
                stocks={product.stock}
                rating={product.rating}
                productOnClick={() => {
                  handleAddToCart({
                    title: product.title,
                    price: Number((product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)),
                    key: product.id,
                    stocks: product.stock,
                  });
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
          pageOnClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        />
      </div>

    </div>

    {
      modal && 
      <Alert
        alertText={modalItem}
        modalBtnOnClick={() => setModal(!modal)}
      />
    }

     {
      openCartList &&
      <CartList
        badgeCL={addedCarts === 0 ? "hidden" : "block"}
        carts={addedCarts}
        cartListOnClickBtn={() => setOpenCartList(false)}
        cartListBtnCL={
          addedItemCarts != 0 ? "block" : "hidden"
        }
        totalPrice = {
          <div className='flex gap-2 font-semibold text-xs md:text-sm lg:text-md'>
            <h1>Total Price: </h1>
            <p>${totalPrice.toFixed(2)}</p>
          </div>         
        }
        checkOutBtnOnClick={() => {
          setOpenCheckOut(true);
          setOpenCartList(false);
        }}

        itemList={addedItemCarts.map((items, index) => (
          <div key={index}>
            <div key={items.key} className='flex justify-between text-xs md:text-sm lg:text-md'>
              <div className='flex justify-between w-full pr-5'>
                <h1 className='font-semibold'>{items.title}</h1>
                <p className='font-semibold'>${items.price}</p>
              </div>
              <MinusCircleIcon 
                className='w-5 hover:text-gray-600 cursor-pointer'
                onClick={() => handleDeleteItemCarts(index)}
              />
            </div>

            <hr className='text-gray-300 my-1'/>
          </div>
        ))}
      />
     }

     {
      openCheckOut &&
      <CheckOut 
        checkOutCloseBtnOnClick={() => setOpenCheckOut(false)}
        totalPrice = {
          <div className='flex gap-2 font-semibold text-xs md:text-sm lg:text-md'>
            <h1>Total Price: </h1>
            <p>${totalPrice.toFixed(2)}</p>
          </div>         
        }
        checkOutBody={
          <div className='flex flex-col'>
            <form>
              <h1 className='text-center text-red-500'>Fill Up Personal Info</h1>

              <div className='text-sm flex gap-3 items-center'>
                <label htmlFor="">Name: </label>
                <input 
                  type="text" 
                  placeholder='ex. John Doe'
                  className='px-2 py-1 outline-none text-sm text-md w-30 lg:w-75'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='text-sm flex gap-3 items-center'>
                <label htmlFor="">Contact No: </label>
                <input 
                  type="text" 
                  placeholder='ex. 09123456789'
                  className='px-2 py-1 outline-none text-sm text-md w-30 lg:w-75'
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </div>

              <div className='text-sm flex gap-3 items-center'>
                <label htmlFor="">Complete Address: </label>
                <input 
                  type="text" 
                  placeholder='(Street Name, Brgy, City, Province, Postal)'
                  className='px-2 py-1 outline-none text-sm text-md w-30 lg:w-75'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className='flex flex-col justify-center my-2'>
                <h1 className='text-center my-2 text-xs md:text-lg text-red-500'>Your Items</h1>
                {
                  addedItemCarts.map((items, index) => (
                    <div key={index}>
                      <div key={items.key} className='flex justify-between text-xs md:text-sm lg:text-md'>
                        <div className='flex justify-between w-full pr-5'>
                          <h1 className='font-semibold'>{items.title}</h1>
                          <p className='font-semibold'>${items.price}</p>
                        </div>
                      </div>
          
                      <hr className='text-gray-300 my-1'/>
                    </div>
                  ))
                }
              </div>
            </form>
          </div>
        }

        placeOrderBtnOnClick={() => handlePlaceOrder()}
      />
     }

     {
      openReusableAlert &&
      <ReusableAlert 
        modalBtnOnClick={() => setOpenReusableAlert(false)}
        icon={
          alertType === "error" ? <ExclamationCircleIcon className='w-6 text-[#FC8181]'/> : <CheckCircleIcon className='w-6 text-green-500'/>
        }
        className={alertType === "error" ? "z-[9999] bg-[#FFF5F5] border-[#FC8181] border-1" : "z-[9999] bg-green-100 border-green-300 border-1"}
        alertText={alertType === "error" ? "Please fill out all required fields." : `Thank you, ${name} Your order has been placed successfully.`}
        alertTextCL={alertType === "error" ? "text-[#D03030]" : "text-green-500"}
      />
     }

    </>
  )
}

export default Homepage
