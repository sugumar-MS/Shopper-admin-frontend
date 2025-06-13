import './navbar.css'
import navlogo from '../../assets/logo.png'
import navprofile from '../../assets/nav-profile.jpeg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='nav-logo'/>
      <img src={navprofile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar
