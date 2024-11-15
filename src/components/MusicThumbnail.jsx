import { FcLike } from "react-icons/fc";
import { FaHeadphones, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { AddToPlaylist } from "../store/userslice";

const Thumbnail = () => {

  const likes = useRef()
  const shares = useRef()
  const dispatch = useDispatch()
  // getting the currSongs state from the reducer using the useSelector hook
  const currSong = useSelector((state) => state.music.currSong);
  const isAdded = useSelector(state => state.user.isAdded);

  // SHOWING THE LIKE AND STREAMS 
  function showLikes() {
    likes.current.classList.remove('invisible');
    shares.current.classList.remove('invisible');
  }
  // HDING THE LIKE AND STREAMS 
  function hideLikes() {
    likes.current.classList.add('invisible');
    shares.current.classList.add('invisible');
  }
  // ADDING SONG TO THE PLAYLIST OF THE USER THAT IS CURRENTLT LOGGED IN
  const AddSong = () => {
    dispatch(AddToPlaylist(currSong))
    console.log(isAdded, 'in addSong function')
    if (isAdded==='not added') {
      alert('song added to you playlist')      
    }else{
      alert ('song is already in you playlist')
    }
  }

  return (
    <>
      <div onMouseEnter={showLikes} onMouseLeave={hideLikes} className="h-3/4 rounded-xl bg-gradient-to-r from-slate-300 via-pink-100 to-slate-200 relative border-b border-teal-400">
        <span ref={likes} className="invisible absolute flex items-center justify-center top-2 right-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">{<FcLike onClick={AddSong} />}</span>
        <span ref={shares} className="invisible absolute flex items-center justify-center top-7 right-2 text-xl  font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"><FaHeadphones className="text-gray-500" /> {currSong.streams}</span>

        <span className=" text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-yellow-700 text-xl  font-bold absolute left-2 bottom-2 last:">{currSong.title}</span>
        <img
          className="h-full w-full rounded-xl"
          src={currSong.thumbnail}
          alt="currSong"
        />
      </div>
    </>
  );
};

export default Thumbnail;
