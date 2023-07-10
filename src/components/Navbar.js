import React from 'react'
import '../App.css'
import { useStateValue } from './StateProvider'
import { Avatar } from '@mui/material'
const Navbar = () => {
  const [{user}] = useStateValue();
  return (
    <nav className="header">
      <div className="header__left">
        <i className="fa-solid fa-circle-chevron-left fa-2x mx-2"></i>
        <i className="fa-solid fa-circle-chevron-right fa-2x"></i>
        <div className="navbar-collapse" id="navbarSupportedContent" style={{justifyContent:"flex-end"}}>
          </div>
      </div>
      <div className='header__right'>
        <button className="premium "><b>ExplorePremium</b></button>
        <button className="installApp mx-3"><i className="fa-sharp fa-solid fa-circle-down"></i> InstallApp</button>
        <button type="button" className="btn" data-toggle="tooltip" data-placement="bottom" title={user?.display_name}>
        <Avatar  src={user?.images[0]?.url} alt={user?.display_name} />
        </button>
      </div>
    </nav>
    
  )
}

export default Navbar
