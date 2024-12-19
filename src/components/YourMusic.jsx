import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/userslice";
import { FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";
import { BiHeadphone } from "react-icons/bi";
const YourMusic = () => {


  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user)
  const playlist = useSelector(state => state.user.user.playlist);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currSong = useSelector((state) => state.music.currSong);
  const [songDetail, setSongDetail] = useState(currSong)
  
  const audioRef = useRef();
  const progress = useRef();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}s`;
  };



  

  // updating the progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setTime(formatTime(audioRef.current.currentTime));
        progress.current.value = audioRef.current.currentTime;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [songDetail]);






  function handleSeek() {
    if (audioRef.current) {
      audioRef.current.currentTime = progress.current.value;
      if (isPlaying === true) {
        audioRef.current.play(); // Only play if it was already playing
      }
    }
  }




  async function chooseSong(song) {
    await setSongDetail(song);
    setIsPlaying(true)
    if (song) {
      if (isPlaying === false) {
        audioRef.current.play();
        progress.current.max = audioRef.current?.duration || 0;
      }
    } else {
      return;
    }


  }

  async function pause() {
    setIsPlaying(false)
    if (isPlaying === true) {
      await audioRef.current.pause();
    }
  }
  return (
    <>
      <h2 className="text-center text-lg text-white font-bold flex items-center justify-center gap-2 ">Your Playlist <BiHeadphone /></h2>
      {user? (<>


        <div className="h-full w-full flex items-center justify-between px-3   overflow-x-hidden">

          {/* CONTAINER TO HOLD THE SONGS ADDED BY THE USER IN HIS PLAYLIST */}
          <div className="min-h-screen max-h-screen overflow-y-auto w-full max-w-2xl  shadow-sm shadow-teal-500 text-white font-semibold text-lg items-center justify-center no-scrollbar max-lg:text-xs  ">
            {playlist.map((song) => {
              return <ul key={song._id} className="shadow-sm shadow-teal-600 flex items-center justify-between px-2 my-2 flex-wrap"> <span>{song.title}</span> <span>{song.artist}</span> <span>{isPlaying === true && songDetail._id === song._id ? <FaPause onClick={pause} /> : <FaPlay onClick={() => chooseSong(song)} />}</span></ul>


            })}


          </div>
          {/* CONTAINER TO DISPLAY THE IMAGE AND DATA OF THE SONG THATS IS BEING PLAYED */}
          <div className="p-2 flex flex-col m-auto max-w-64 items-center  justify-center gap-5 rounded-2xl shadow-md shadow-teal-400 max-lg:w-24  max-lg:h-fit max-lg:gap-1 max-lg:text-xs max-lg:p-1">
            <div className="h-32 w-32 max-lg:h-20 max-lg:w-20">
              <img className="h-full w-full bg-black rounded-xl border-b border-teal-400 " src={songDetail.thumbnail} alt="" />
            </div>
            {/* div containing the song details */}
            <div className="flex flex-col items-center justify-center gap-1 text-white font-bold text-md  p-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 border-b-2 border-b-teal-300"><span className="text-white">Title :</span>{songDetail.title}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 flex-wrap border-b-2 border-b-teal-300"><span className="text-white">Artist :</span>{songDetail.artist}</span>

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 border-b-2 border-b-teal-300"><span className="text-white">Streams : </span>{songDetail.streams}</span>
              {/* the progress bar */}
              <div className="w-full flex items-center justify-between p-2 cursor-pointer ">
                <span className="shadow-md shadow-black rounded-lg px-1 bg-gray-400">{time}</span>
                <input
                  onChange={handleSeek}
                  ref={progress}
                  min="0"
                  max="1"
                  type="range"
                  step="0.01"
                  className="w-2/3 appearance-none h-1 bg-white shadow-black shadow-md rounded-md cursor-pointer"
                />
                <audio onEnded={() => handleEnd()} src={songDetail.url} ref={audioRef}>
                  <source src={songDetail.url} type="audio/mpeg" />
                </audio>
              </div>
            </div>

          </div>

        </div>


      </>)
        : <h1>Loading....</h1>}

    </>
  );
};
export default YourMusic;
