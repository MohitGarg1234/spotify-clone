import React from 'react'
import '../App.css'
import axios from 'axios';
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import { reducerCases } from './Constants';
import { useStateValue } from './StateProvider';
const PlayerState = () => {
    const [{ token, playerState,repeatState }, dispatch] = useStateValue();

    const changeState = async () => {
      const state = playerState ? "pause" : "play";
      await axios.put(
          `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };
    const RepeatTrack = async () => {
      const state = repeatState ? "track" : "off" ;
      await axios.put(
        `https://api.spotify.com/v1/me/player/repeat?state=${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: reducerCases.SET_REPEATSTATE,
        repeatState: !repeatState,
      });
    };
    const changeTrack = async (type) => {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      const response1 = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response1.data !== "") {
        const currentPlaying = {
          id: response1.data.item.id,
          name: response1.data.item.name,
          artists: response1.data.item.artists.map((artist) => artist.name),
          image: response1.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };
  return (
    <div className='footer__center' >
      <ShuffleIcon className="footer__green mx-1" onClick={() => changeTrack("previous")}/>
      <SkipPreviousIcon className="footer__icon mx-2" onClick={changeState} />
      <PlayCircleOutlineIcon className="footer__icon mx-1" fontSize="large" onClick={changeState} />
      <SkipNextIcon className="footer__icon mx-2" onClick={() => changeTrack("next")}/>
      <RepeatIcon className='footer__green mx-1' onClick={() => RepeatTrack()}/>
    </div>
  )
}

export default PlayerState
