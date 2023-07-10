import React from 'react'
import '../App.css'
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from '@mui/material';
import axios from 'axios';
import { useStateValue } from './StateProvider';
const VolumeControls = () => {
    const [{ token }] = useStateValue();
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div className="footer__right">
        <Grid container spacing={1}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" onMouseUp={(e)=>setVolume(e)} />
          </Grid>
        </Grid>
      </div>
  )
}

export default VolumeControls
