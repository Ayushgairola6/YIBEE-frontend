import Thumbnail from "./MusicThumbnail";
import Controls from "./Controls";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSongs } from "../store/musicSlice";
import Loader from "./Loader";
import ForYou from "./ForYouSection";
import { FaBackward, FaForward, FaHeadphones, FaPlay } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
const Musicplayer = () => {
  const currSong = useSelector((state) => state.music.currSong);
  const status = useSelector((state) => state.music.status);
  const dispatch = useDispatch()

  return (

    <>
      {currSong ? (<>
        {window.innerWidth <= 1000 ? <div className=" h-screen relative">
          {/* container containing Thumbnail , progress bar , controls  */}
          <div className="p-2 bg-gradient-to-br from-white/5 to-black h-4/5  ">
            <Thumbnail />
            <Controls />

          </div>
          <ul className="absolute bottom-0 left-0 p-2 mt-6 w-full">
            <ForYou />
          </ul>
          {/* <span className="text-white text-center flex items-center justify-center gap-1">Genre <FaHeadphones/></span> */}


        </div> :
          // For larger screens
          <div className="p-1 flex h-96 pb-3 px-1  ">
            {/* container containing Thumbnail , progress bar , controls  */}
            <div className="p-1 w-full">
              <Thumbnail />
              <Controls />
            </div>
            {/* the div that is going to display the lyrics  */}
            <div className="p-1 text-center w-2/3 bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md rounded-xl overflow-y-scroll  text-gray-200 hide-scrollbar">
              <p className="text-gray-200 font-bold text-lg ">lyrics</p>
            </div>
          </div>}

      </>) : <div className="h-screen">
        <div className="h-4/5 rounded-xl bg-gradient-to-r from-slate-300 via-pink-100 to-slate-200 relative border-b border-teal-400 animate-pulse">
          <span className="invisible absolute flex items-center justify-center top-2 right-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold"><FcLike /></span>
          <span className="invisible absolute flex items-center justify-center top-7 right-2 text-xl  font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"><FaHeadphones className="text-gray-500" />Streams</span>

          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-yellow-700 text-xl  font-bold absolute left-2 bottom-2 last:">Name</span>
          <img
            className="h-full w-full rounded-xl"
            src="/"
            alt="currSong"
          />
        </div>
        {/* controls mock skeleton */}
        <div className="w-full flex items-center justify-between p-2 cursor-pointer animate-pulse">
          <span className="shadow-md shadow-black rounded-lg px-1 font-bold font-mono bg-gray-400">duration</span>
          <input
            
            min="0"
            max="1"
            type="range"
            step="0.01"
            className="w-2/3 appearance-none h-1 bg-white shadow-black shadow-md rounded-md cursor-pointer"
          />
        </div>
        <div className="  h-16 flex items-center justify-evenly font-bold text-xl text-center rounded-xl shadow-md shadow-black bg-teal-300 bg-opacity-80 backdrop-blur-md ">
          <audio  src="/" >
            <source src="/" type="audio/mpeg" />
          </audio>
          <div className="bg-white cursor-pointer shadow-md shadow-black rounded-xl h-8 w-8 text-center flex items-center justify-center">
            <span className="text-xl text-center">
              <FaBackward  />
            </span>
          </div>
          <div
            className="cursor-pointer shadow-md shadow-black rounded-xl h-8 w-8 text-center bg-white flex items-center justify-center"
            
          >
            <span className="text-xl text-center">
               <FaPlay />
            </span>
          </div>
          <div className="bg-white cursor-pointer shadow-md shadow-black rounded-xl h-8 w-8 flex items-center justify-center">
            <span className="text-xl text-center">
              <FaForward />
            </span>
          </div>
        </div>
      </div>}



    </>
  );
};
export default Musicplayer;
