import './addProduct.css'
import upload_area from '../../assets/upload-icon.jpg'
import { useState } from 'react'

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data })

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })

    }
  }



  return (
    <div className='add-product'>
      <div className='addProduct-itemfield'>
        <p>Poduct title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addProduct-itemfield'>
          <p>Price</p>
          <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Type here' />
        </div>
        <div className='addProduct-itemfield'>
          <p>Offer Price</p>
          <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className='addProduct-itemfield'>
        <p>Product Category</p>
        <select name='category' value={productDetails.category} onChange={changeHandler} className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className='addProduct-itemfield'>
        <label htmlFor='file-input' >
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumnail-img' />
        </label>
        <input type='file' onChange={imageHandler} name='image' id='file-input' hidden />
      </div>
      <button className='addproduct-btn' onClick={() => { Add_Product() }}>ADD</button>
    </div>
  )
}

export default AddProduct;
