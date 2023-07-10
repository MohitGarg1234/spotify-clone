import React,{useEffect} from 'react'
import '../App.css'
import axios from 'axios';
import { reducerCases } from './Constants';
import { useStateValue } from './StateProvider'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Body = () => {
  const [{ user,token, selectedPlaylist, selectedPlaylistId}, dispatch] = useStateValue();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        added_by: response.data.added_by,
        description: response.data.description.startsWith("<a")? "": response.data.description,
        image: response.data.images[0].url,

        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);
  
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div className='body'>
    {selectedPlaylist && (
      <>
        <div className="body__info">
          <div className="image">
            <img src={selectedPlaylist.image} alt="selected playlist" style={{height:"15rem"}} />
          </div>
          <div className="" style={{paddingLeft:"5px",marginLeft:"10px"}}>
            <span className="type" >Playlist</span>
            <h1 className="title" style={{fontSize:"80px"}}>{selectedPlaylist.name}</h1>
            <p className="description">{selectedPlaylist.description}</p>
            <h6>{user?.display_name}</h6>
            {/* <h6>{selectedPlaylist.added_by}</h6> */}
          </div>
        </div>
        <div className="list">
          <div className="header-row">
            <div className="col">
              <span>#</span>
            </div>
            <div className="col">
              <span>TITLE</span>
            </div>
            <div className="col">
              <span>ALBUM</span>
            </div>
            <div className="col">
              <span>
                <AccessTimeIcon/>
              </span>
            </div>
          </div>
          <hr />
          <div className="tracks">
            {selectedPlaylist.tracks.map(
              (
                {
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                },
                index
              ) => {
                return (
                  <div
                    className="row"
                    key={id}
                    onClick={() =>
                      playTrack(
                        id,
                        name,
                        artists,
                        image,
                        context_uri,
                        track_number
                      )
                    }
                  >
                    <div className="col">
                      <span>{index + 1}</span>
                    </div>
                    <div className="col detail">
                      <div className="image">
                        <img src={image} alt="track" />
                      </div>
                      <div className="info">
                        <span className="name">{name}</span>
                        <span>{artists.join(", ")}</span>
                      </div>
                    </div>
                    <div className="col">
                      <span>{album}</span>
                    </div>
                    <div className="col">
                      <span>{msToMinutesAndSeconds(duration)}</span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </>
    )}
  </div>
  )
}

export default Body
