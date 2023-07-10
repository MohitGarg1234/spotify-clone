import React from "react";
import "../App.css"
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { reducerCases } from "./Constants";
function SidebarOption({playlistId,option,image,addedby}) {
  const [{ token}, dispatch] = useStateValue();
  const onClick = () =>{ 
      const selectedPlayId = playlistId;
      changeCurrentPlaylist(selectedPlayId);
    }
    useEffect(() => {
      const getPlaylistData = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/playlists/${playlistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
          );
          const { items } = response.data;
          const playlists = items.map(({ name, id , image }) => {
            return { name, id ,image };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    // getPlaylistData();
  }, [token, dispatch,playlistId]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
      // getPlaylistData();
      dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };
  return (
    <div className="sidebarOption my-3">
      <div className="my-3" onClick={onClick}>
        <div>
        <img src={image} alt="" className="imgplay mx-1" style={{borderRadius:"5px"}} />
        <p style={{marginTop:"-50px",marginLeft:"70px",color:"white",fontSize:"15px"}}>
          {option}
        </p>
        <p style={{marginTop:"-15px",marginLeft:"70px"}}>
          Playlist - {addedby}
        </p>
        </div>
        
        </div>

    </div>
  );
}

export default SidebarOption;
