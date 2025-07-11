import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KeepLoggedIn } from "../store/AuthSlice";

import { getUser } from "../store/userslice";
import { FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";
import { BiHeadphone } from "react-icons/bi";
const YourMusic = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  const user = useSelector(state => state.user.user)
  // const playlist = useSelector(state => state.user.user.playlist);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currSong = useSelector((state) => state.music.currSong);
  const [songDetail, setSongDetail] = useState(currSong)

  const audioRef = useRef();
  const progress = useRef();
  const songRef = useRef();
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}s`;
  };


  useEffect(() => {
    const sessionState = JSON.parse(sessionStorage.getItem("loginState"))
    if (sessionState) {
      dispatch(KeepLoggedIn());
    }
  }, [dispatch])


  // updating the progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setTime(formatTime(audioRef.current.currentTime));
        progress.current.value = audioRef.current.currentTime;
      }
    }, 600);

    return () => clearInterval(interval);
  }, [audioRef.current]);






  function handleSeek() {
    if (audioRef.current) {
      audioRef.current.currentTime = progress.current.value;
      if (isPlaying === true) {
        audioRef.current.play();
      }
    }
  }

  function PlaySongOnSelect(song) {
    let time;
    setSongDetail(song);
    if (isPlaying === false) {
      // setSongDetail(song);
      setIsPlaying(true);
      audioRef.current.play();
    } else if (isPlaying === true) {
      setSongDetail(song);
      audioRef.current.pause();
      time = setTimeout(() => {
        audioRef.current.play();
      }, 600)
    }
    return () => clearTimeout(time);
  }

  //   useEffect(() => {
  //  let time;
  //     setSongDetail(song);
  //     if (isPlaying === false) {
  //       // setSongDetail(song);
  //       setIsPlaying(true);
  //       audioRef.current.play();
  //     } else if (isPlaying === true) {
  //       setSongDetail(song);
  //       audioRef.current.pause();
  //       time = setTimeout(() => {
  //         audioRef.current.play();
  //       }, 600)
  //     }
  //     return () => clearTimeout(time);
  //   }, [songDetail])



  return (
    <>
      <h2 className="text-center text-lg text-white font-bold w-full flex items-center justify-center gap-2 ">Your Playlist <BiHeadphone /></h2>
      {user ? (<>


        <div className="h-full w-full flex items-center justify-between px-3   overflow-x-hidden relative">

          {/* CONTAINER TO HOLD THE SONGS ADDED BY THE USER IN HIS PLAYLIST */}
          <div className="min-h-screen   w-full   border border-gray-800 rounded-xl text-white font-semibold text-lg items-center justify-center no-scrollbar max-lg:text-xs  overflow-y-auto">
            {user !== null && user?.playlist ? user.playlist.map((song) => {
              return <ul ref={songRef} onClick={() => PlaySongOnSelect(song)} key={song._id} className={` flex items-center justify-between px-2 my-2 flex-wrap cursor-pointer ${songDetail._id === song._id && isPlaying === true ? "text-teal-600" : "text-white"} 
              border-b border-indigo-800 py-1 font-bold font-serif`}>
                <img className="h-7 w-7 rounded-full" src={song.thumbnail} alt="" /> <span>{song.title}</span> <span>Artist-{song.artist}</span> </ul>


            }) : null}


          </div>
          {/* CONTAINER TO DISPLAY THE IMAGE AND DATA OF THE SONG THATS IS BEING PLAYED */}
          {songDetail ? <div className="flex items-center justify-between  gap-2 absolute bottom-0 left-0  bg-black border-t border-gray-500 w-full py-1 px-3">
            <img src={songDetail.thumbnail} className="h-10 w-10 rounded-full animate-spin-slow" alt="/" />


            <div className="flex  items-center justify-evenly gap-2 w-1/2">
              <span className="shadow-md shadow-black rounded-lg px-1 bg-gray-400">{time}</span>
              <input
                onChange={handleSeek}
                ref={progress}
                min="0"
                max="100"
                type="range"
                step="0.01"
                className="w-full appearance-none h-1 bg-white shadow-black shadow-md rounded-md cursor-pointer"
              />
              <audio onEnded={() => handleEnd()} src={songDetail.url} ref={audioRef}>
                <source src={songDetail.url} type="audio/mpeg" />
              </audio>
              {isPlaying === false ? <FaPlay onClick={() => {
                if (isPlaying === false) {
                  setIsPlaying(true);
                  audioRef.current.play();
                }
              }} className="cursor-pointer" color="white" /> : <FaPause className="cursor-pointer" color="white" onClick={() => {
                if (isPlaying === true) {
                  setIsPlaying(false);
                  setSongDetail(currSong)
                  audioRef.current.pause();
                }
              }} />}
            </div>




          </div> : <div className="h-screen flex items-center justify-center ">
            <span className="text-white font-bold font-serif text-2xl animate-pulse">Looking for you favorites</span>
          </div>}

        </div>


      </>)
        : <h1>Loading....</h1>}

    </>
  );
};
export default YourMusic;
