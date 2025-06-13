import { useEffect, useState } from 'react'
import './listProduct.css'

const ListProduct = () => {
  const[allProducts,setAllProducts]=useState([]);
  const[isLoading,setIsLoading]=useState(true);

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:"POST",
      headers:{
        Accept:"application/json",
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    fetchInfo();
  }

  return (
    <div className='list-product'>
      
      <h1>All Products List</h1>
     {isLoading && <p>Loading Products..</p>}
     {!isLoading && (
      <>
       {allProducts.length ? (
        <>
        <div className="listproduct-header">
        <p>Image</p>
        <p>Titles</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProduct-body">
        <hr/>
        {allProducts.map((product,index)=>{
          return <>
          <div key={index}className='listproduct-header listproduct-format'>
             <img src={product.image} alt="" className="listproduct-img" />
             <p>{product.name}</p>
             <p>${product.old_price}</p>
             <p>${product.new_price}</p>
             <p>{product.category}</p>
             <p className='remove-icon' onClick={()=>remove_product(product.id)}>X</p>
          </div>
          <hr/>
          </>
        })}
      </div>
      </>
      ) : (
        <p>No Post to Display</p>
      )}</>
     )}
    </div>
  )
}

export default ListProduct
