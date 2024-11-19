import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { togglePlayPause, prevSong, nextSong, fetchSongs } from '../store/musicSlice';
import LoadingCard from './LoadingCard';
// import { set } from 'mongoose';

const Controls = () => {
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  const currSong = useSelector((state) => state.music.currSong);
  const fetchedSongs = useSelector((state) => state.music.fetchedSongs);
  const isPlaying = useSelector((state) => state.music.isPlaying);

  const audioRef = useRef();
  const progress = useRef();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}s`;
  };

  useEffect(() => {
    if (currSong) {
      progress.current.max = audioRef.current?.duration || 0;
    }

    const interval = setInterval(() => {
      if (audioRef.current) {
        setTime(formatTime(audioRef.current.currentTime));
        progress.current.value = audioRef.current.currentTime;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currSong]);



  async function handlePlayPause() {
    // dispatch(setCurrSong())
    if (audioRef.current && currSong) {
      progress.current.max = audioRef.current.duration;
      if (!isPlaying) {
        dispatch(togglePlayPause());
        await audioRef.current.play();
      } else {
        dispatch(togglePlayPause());
        await audioRef.current.pause();
      }
    }
  }

  function handleSeek() {
    if (audioRef.current) {
      audioRef.current.currentTime = progress.current.value;
      if (isPlaying) {
        audioRef.current.play(); // Only play if it was already playing
      }
    }
  }
  // USING THE AGGREGATION TO SET ONE SONG AT A TIME FOR NEXT OR PREV SONG
  function handlePrevSong() {
    dispatch(prevSong());
    dispatch(fetchSongs());
    dispatch(togglePlayPause());
  }
  function handleNextSong() {
    dispatch(nextSong());
    dispatch(fetchSongs());
    dispatch(togglePlayPause());
  }

  // FUNCTION THAT CHANGES MUSIC WHEN THE CURRENT SONG HAS ENDED 

  async function handleEnd() {
    dispatch(fetchSongs());
    dispatch(togglePlayPause());
  }
  return (
    <>

{currSong?<><div className="w-full flex items-center justify-between p-2 cursor-pointer">
        <span className="shadow-md shadow-black rounded-lg px-1 font-bold font-mono bg-gray-400">{time}</span>
        <input
          onChange={handleSeek}
          ref={progress}
          min="0"
          max="1"
          type="range"
          step="0.01"
          className="w-2/3 appearance-none h-1 bg-white shadow-black shadow-md rounded-md cursor-pointer"
        />
      </div>
      <div  className="  h-16 flex items-center justify-evenly font-bold text-xl text-center rounded-xl shadow-md shadow-black bg-teal-300 bg-opacity-80 backdrop-blur-md ">
        <audio onEnded={() => handleEnd()} src={currSong.url} ref={audioRef}>
          <source src={currSong.url} type="audio/mpeg" />
        </audio>
        <div className="bg-white cursor-pointer shadow-md shadow-black rounded-xl h-8 w-8 text-center flex items-center justify-center">
          <span className="text-xl text-center">
            <FaBackward onClick={handlePrevSong} />
          </span>
        </div>
        <div
          className="cursor-pointer shadow-md shadow-black rounded-xl h-8 w-8 text-center bg-white flex items-center justify-center"
          onClick={handlePlayPause}
        >
          <span className="text-xl text-center">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </span>
        </div>
        <div className="bg-white cursor-pointer shadow-md shadow-black rounded-xl h-8 w-8 flex items-center justify-center">
          <span className="text-xl text-center">
            <FaForward onClick={handleNextSong} />
          </span>
        </div>
      </div>
      </>
:<LoadingCard/>
}
      
    </>
  );
};

export default Controls;
