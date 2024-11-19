import { FaHeadphones, FaPause, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useEffect, useRef, useState } from "react";

const Genre = () => {
    const currSong = useSelector(state => state.music.currSong)
    const [chosenSong, setChosenSong] = useState(currSong)
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const progress = useRef()
    const audioRef = useRef()
    const genre = useSelector(state => state.music.GenreFetched)


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds}s`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current) {
                setTime(formatTime(audioRef.current.currentTime));
                progress.current.value = audioRef.current.currentTime;
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);




    function handleSeek() {
        if (audioRef.current) {
            audioRef.current.currentTime = progress.current.value;
            if (isPlaying === true) {
                audioRef.current.play(); // Only play if it was already playing
            }
        }
    }

    async function ChooseSong(song) {
        await setChosenSong(song);
        if (isPlaying === false) {
            setIsPlaying(true)
            audioRef.current.play();
            progress.current.max = audioRef.current?.duration || 0;
            return
        } else {
            alert('cannot find the song')
        }
    }

    async function PauseSong() {
        if (isPlaying === true) {
            setIsPlaying(false)
            await audioRef.current.pause();
            return
        }
    }


    return <>
        {genre ? <>
            <h1 className="text-cyan-400 text-xl font-bold font-serif text-center flex items-center justify-center gap-1 relative mb-2">Your favorite Genre <FaHeadphones /></h1>
            <div className="relative  min-h-screen  overflow-y-auto max-w-screen px-4    text-white font-semibold text-lg items-center justify-center no-scrollbar border">

                {genre.map((song) => {
                    return <div key={song._id} className="">
                        <ul className="shadow-sm shadow-teal-600 flex items-center justify-between px-2 my-2 flex-wrap"> <span>{song.title}</span> <span>{song.artist}</span> <span >
                            {isPlaying === true && chosenSong._id === song._id ? <FaPause onClick={PauseSong} /> : <FaPlay onClick={() => ChooseSong(song)} />}</span></ul>
                    </div>
                })}
                {/* the progress bar */}
                <div className="w-screen flex items-center justify-evenly   cursor-pointer absolute bottom-0 left-0 bg-gray-500   ">
                    <span className="shadow-md shadow-black rounded-lg px-1 bg-gray-400">{time}</span>
                    <input 
                        onChange={handleSeek}
                        ref={progress}
                        min="0"
                        max="1"
                        type="range"
                        step="0.01"
                        className="w-2/3 appearance-none h-1  shadow-black shadow-md rounded-md cursor-pointer bg-black"
                    />
                    <img src={chosenSong.thumbnail} className="animate-spin-slow h-14 w-14 rounded-full border border-teal-400" alt="" />
                    <audio onEnded={() => handleEnd()} src={chosenSong.url} ref={audioRef}>
                        <source src={chosenSong.url} type="audio/mpeg" />
                    </audio>
                </div>
            </div>
        </> : <div className="text-white font-serif flex items-center justify-center flex-col gap-2 h-screen w-screen max-w-screen">
            <h1>Please wait...</h1>
            <Loader></Loader>
        </div>}



    </>







};

export default Genre;