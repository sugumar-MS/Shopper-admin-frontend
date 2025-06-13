import './sidebar.css'
import addProduct from'../../assets/addproduct-icon.png'
import listProduct from'../../assets/listpro-icon.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addProduct'} style={{textDecoration:"none"}}>
         <div className='sidebar-list'>
         <img src={addProduct} alt="add" />
         <p>Add Product</p>
      </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
         <div className='sidebar-list'>
         <img src={listProduct} alt="" />
         <p>List Product</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
