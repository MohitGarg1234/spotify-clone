import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Body from './Body'
import Navbar from './Navbar'
import '../App.css'
const Spotify = (spotify) => {
  return (
    <div className="player">
        <Sidebar/> 
      <div className="player__body">
        <Navbar/> 
        <Body spotify={spotify} />
      </div>
      <Footer spotify={spotify} />
    </div>

  )
}

export default Spotify
