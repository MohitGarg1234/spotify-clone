import React from 'react'
import { accessUrl } from './LogSpotify';
const Login = () => {
  return (
    <div style={{display:"flex",background:"#1db954",height:"100vh",width:"100vw",alignItems:"center",justifyContent:"center",gap:"5rem",flexDirection:"column"}}>
      <img style={{height:"20vh"}} src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" />
      <a href={accessUrl} style={{textDecoration:"none",padding:"1rem 5rem",borderRadius:"5rem",cursor:"pointer",background:"black",border:"none",color:"#49f585",fontSize:"1.4rem"}}>Connect To Spotify</a>
    </div>
  )
}

export default Login
