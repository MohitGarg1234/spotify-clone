import React from 'react'
import '../App.css';
import CurrentlyPlayingTrack from './CurrentlyPlayingTrack';
import PlayerState from './PlayerState';
import VolumeControls from './VolumeControls';
const Footer = () => {
  
  return (
  <div  className=" footer">
    <CurrentlyPlayingTrack/>
    <PlayerState/>
    <VolumeControls/>
  </div>
  )
}

export default Footer
