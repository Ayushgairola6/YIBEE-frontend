import { useSelector, useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'
import { setSong } from "../store/musicSlice";
import LoadingCircle from "./LoadingCircle";

const OverLay = ({ setSearch }) => {
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.music.SearchResults)
    const currSong = useSelector(state => state.music.currSong);
    const status = useSelector(state => state.music.searchState)
    // setting up the currSong to clicked
    function SetSong(song) {
        dispatch(setSong(song));
        setSearch(false);
    }


    return <>

        <div className="absolute top-8 w-4/5  z-20 h-44 bg-white mx-2 flex items-normal flex-wrap justify-center py-3">
            <ul className="absolute right-4 top-4">
                <IoMdClose onClick={() => setSearch(false)} size={32} />

            </ul>
            {searchResults.map((song) => {
                return <>
                    {status === "Success" ? <div className="h-20 w-26  font-sans font-bold shadow-md shadow-black text-xs text-center fkex flex-col items-center justify-center rounded-md py-0.5 ml-1 p-2">

                        <span>{song.title}</span>
                        <img className="h-1/2 w-full" src={song.thumbnail} alt="" />
                        <span className="flex items-center justify-cent er gap-2 mt-1">Artist : {song.artist} <FaPlay onClick={() => SetSong(song)} /></span>
                    </div> : <span className="flex items-center justify-center flex-col">
                        <LoadingCircle />
                        loading....
                    </span>}

                </>
            })}

        </div>


    </>
}

export default OverLay;