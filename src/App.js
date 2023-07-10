import React,{useEffect} from "react";
import Login from "./components/Login";
import {useStateValue} from './components/StateProvider';
import Spotify from "./components/Spotify";
import { getTokenFromResponse } from "./components/LogSpotify";
import './App.css';
import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();
function App() {
  const [{token},dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash="";
    const _token = hash.access_token; 
    if (_token) {
      spotify.setAccessToken(_token)
      dispatch({
        type:"SET_TOKEN",
        token: _token,
      })
      // const user = hash.substring(1).split("&")[0].split("=")[1];
      spotify.getMe().then((user)=>{
        dispatch({
          type: "SET_USER",
          user:user,
        })
      })
      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type:"SET_PLAYLISTS",
          playlists:playlists,
        })
      })
      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );
      spotify.getPlaylist('4yJzNIoNknZHcMRsvjAssJ').then(response=>
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        })
      )
    }
    // eslint-disable-next-line 
  },[token,dispatch]);
  // console.log(token);
  // console.log(user);
  return (
    <div className="main">
    {token?<Spotify spotify={spotify}/>:<Login/>}
    </div>
  );
}

export default App;
