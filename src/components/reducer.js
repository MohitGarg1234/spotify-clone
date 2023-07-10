import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  user: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId:"4lBgfodNUyLMJy6EeLEuxq",
  repeatState:null,
  recentlyPlayedTracks:null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_RECENTLY_PLAYED_TRACKS:
      return {
        ...state,
        recentlyPlayedTracks: action.recentlyPlayedTracks,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_REPEAT:
      return {
        ...state,
        repeatState: action.repeatState,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
      case reducerCases.SET_DISCOVER_WEEKLY:
        return{
          ...state,
          discover_weekly:action.discover_weekly,
        }
    default:
      return state;
  }
};

export default reducer;

// export const initialState ={
//     token: null,
//   user: null,
//   playlists: [],
//   currentPlaying: null,
//   playerState: false,
//   Setplaylist: null,
//   playlistsID: "4yJzNIoNknZHcMRsvjAssJ",
//     // token:null
// };
// const reducer =(state,action) =>{
//     switch(action.type){
//         case "SET_USER":{
//             return {
//                 ...state,
//                 user : action.user,
//             }
//         }
//         case "SET_TOKEN":{
//             return {
//                 ...state,
//                 token : action.token,
//             }
//         }
//         case "SET_PLAYLISTS":{
//             return {
//                 ...state,
//                 playlists : action.playlists,
//             }
//         }
//         case "SET_PLAYLIST":{
//             return {
//                 ...state,
//                 Setplaylist : action.Setplaylist,
//             }
//         }
//         case "SET_PLAYLISTSID":{
//             return {
//                 ...state,
//                 playlistsID : action.playlistsID,
//             }
//         }
//         case "SET_PLAYING":{
//             return {
//                 ...state,
//                 currentPlaying : action.currentPlaying,
//             }
//         }
//         case "SET_PLAYER_STATE":{
//             return {
//                 ...state,
//                 playerState : action.playerState,
//             }
//         }
//         case "SET_DISCOVER_WEEKLY":{
//             return{
//                 ...state,
//                 discover_weekly:action.discover_weekly,
//             }
//         }
//         default : return state 
//     }
// }
// export default reducer