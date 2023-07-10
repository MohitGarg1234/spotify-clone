import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { reducerCases } from "./Constants";

const CurrentlyPlayingTrack = () => {
    const [{ token, currentPlaying }, dispatch] = useStateValue();
    useEffect(() => {
      const getCurrentTrack = async () => {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data !== "") {
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
      };

      getCurrentTrack();

    }, [token, dispatch]);
    return (
      <div>
        {currentPlaying && (
          <div className="footer__left">
            {/* <div className="track__image"> */}
              <img src={currentPlaying.image} alt="currentPlaying" className="footer__albumLogo" />
            {/* </div> */}
            <div className="footer__songInfo">
              <h5 className="">{currentPlaying.name}</h5>
              <h6 className="" style={{fontSize:"10px"}}>
                {currentPlaying.artists.join(" , ")}
              </h6>
            </div>
          </div>
        )}
        
      </div>
    );
}

export default CurrentlyPlayingTrack






