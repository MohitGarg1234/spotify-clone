import React,{useEffect} from 'react'
import axios from 'axios'
import {reducerCases} from './Constants'
import { useStateValue } from './StateProvider'
import '../App.css'
const Playlists = () => {
    const [{ token, playlists }, dispatch] = useStateValue();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  return (
      <ul>
        {playlists?.items?.map(({ name, id }) => {
          return (
            <li className='scroll' key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
  )
}

export default Playlists
