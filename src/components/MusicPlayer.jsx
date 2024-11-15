import Thumbnail from "./MusicThumbnail";
import Controls from "./Controls";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSongs } from "../store/musicSlice";
import Loader from "./Loader";
import ForYou from "./ForYouSection";
import { FaHeadphones } from "react-icons/fa";
const Musicplayer = () => {
  const currSong = useSelector((state) => state.music.currSong);
  const status = useSelector((state) => state.music.status);
  const dispatch = useDispatch()
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs())
    }
  }, [status, dispatch,])
  return (

    <>
      {currSong ? (<>
        {window.innerWidth <= 1000 ? <div className=" flex flex-col items-normal justify-evenly h-screen  bg-black ">
          {/* container containing Thumbnail , progress bar , controls  */}
          <div className="p-1 shadow-sm shadow-teal-400  ">
            <Thumbnail />
            <Controls />
          </div>
          <div >
            <span className="text-white text-center flex items-center justify-center gap-1">Genre <FaHeadphones/></span>
          <ForYou/>
          </div>
        </div> :
        // For larger screens
        <div className="p-1 flex h-96 pb-3 px-1  ">
          {/* container containing Thumbnail , progress bar , controls  */}
          <div className="p-1 w-full">
            <Thumbnail />
            <Controls />
          </div>
          {/* the div that is going to display the lyrics  */}
          <div onClick={() => console.log(currSong)} className="p-1 text-center w-2/3 bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md rounded-xl overflow-y-scroll  text-gray-200 hide-scrollbar">
            <p className="text-gray-200 font-bold text-lg ">lyrics</p>
          </div>
        </div>}

      </>) : <Loader />}



    </>
  );
};
export default Musicplayer;
