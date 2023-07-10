import React from 'react'
import '../App.css';
import { useStateValue } from './StateProvider';
import SidebarOption from './SidebarOption';
// import Playlists from './playlists';
function Sidebar(){
    const [{playlists}] = useStateValue();
    // console.log(playlists);
    const onHome = ()=>{
        alert("Clicked");
    }
  return (
    <div className="sidebar">
        <div className="p-2">
            <div className='abcd' >
                <ul className="nav nav-pills flex-column mb-auto" >
                    <li className="nav-item my-3" onClick={onHome} >
                        <i className="fa-solid fa-house fa-lg"></i>
                        <span className='mx-3'>Home</span>
                    </li>
                    <li className="nav-item my-3">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span className='mx-3'>Search</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="p-2 sidePlay" >
            <div className='abcd' >
                <ol className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item my-3">
                    <i className="fa-solid fa-list"></i>
                        <span className='mx-3'>Your Library</span>
                        <i className="fa-solid fa-plus" style={{marginLeft:"100px"}}></i>
                        <i className="fa-solid fa-arrow-right mx-3"></i>
                    </li>
                    <li>
                            <div className='d-flex' style={{width:"75px",borderRadius:"30px",padding:"4px 8px",backgroundColor: "rgb(50, 50, 50)"}}>
                                Playlists
                            </div>
                    </li>
                    <li className="nav-item my-3">
                        <i   className="fa-solid fa-magnifying-glass"></i>
                        <span style={{marginLeft:"190px"}}> Recents</span>
                        <i className="fa-sharp fa-solid fa-caret-down mx-2"></i>
                    </li>
                    {/* <Playlists/> */}
                    <li className='scroll'>
                        {playlists?.items?.map((playlist)=>(
                            // console.log({playlist.images[0].url})
                            <SidebarOption addedby={playlist.owner.display_name} key={playlist.id} playlistId={playlist.id} option={playlist.name} image={playlist.images[0].url} ></SidebarOption>
                        ))}
                    </li>
                </ol>
            </div>
        </div>
  </div>
  )
}

export default Sidebar


// import React from "react";
// import "../App.css";
// import SidebarOption from "./SidebarOption";
// import { useStateValue } from "./StateProvider";

// function Sidebar() {
//   const [{ playlists }] = useStateValue();
//   console.log(playlists);

//   return (
//     <div className="sidebar">
//       {/* <i className="fa-solid fa-house fa-lg"></i> */}
//       <SidebarOption  option="Home" />
//       <SidebarOption  option="Search" />
//       <SidebarOption  option="Your Library" />
//       <br />
//       <strong className="sidebar__title">PLAYLISTS</strong>
//       <hr />
//       {playlists?.items?.map((playlist) => (
//           <SidebarOption option={playlist.name} />
//       ))}
//     </div>
//   );
// }

// export default Sidebar;
