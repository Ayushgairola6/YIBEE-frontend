import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, defaultMode } from "../store/ThemeSlice";
import { MdCancel } from "react-icons/md";
import { FaSearch, FaPlay } from "react-icons/fa";
import { IoMenu } from 'react-icons/io5'
import { setSong } from "../store/musicSlice";
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { SearchSongs } from "../store/musicSlice";
import OverLay from "./Overlay"
import { FaUserAstronaut } from "react-icons/fa";
const Navbar = () => {

  const dispatch = useDispatch()

  // sidebar visibility state
  const [visible, setVisible] = useState(false);
  const inputRef = useRef()
  const [isSearching, setIsSearching] = useState(false);

  const user = useSelector(state => state.user.user);
  const results = useSelector(state => state.music.SearchResults);

  function show_Sidebar() {
    setVisible(!visible)
  }

  function hide_Sidebar() {
    setVisible(!visible)
  }

  function Search_Music() {
    dispatch(SearchSongs(inputRef.current.value))

  }
  // onBlurCapture={()=>setIsSearching(false)}


  return (
    <>

      <header  className="w-full px-4 py-2 bg-transparent dark:bg-black dark:text-white shadow-md">
        <nav className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              YIBEE
            </span>
          </div>

          {/* Center: Responsive Search Bar */}
          <div className="flex-1 px-4 flex justify-center relative ">
            <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px]">
              <input
                onFocusCapture={() => setIsSearching(true)}

                ref={inputRef}
                className="w-full px-4 py-1 rounded-xl text-sm text-black transition-all duration-300 focus:outline-none"
                type="text"
                placeholder="Search song..."
              />
              <button
                className="absolute right-2 top-1.5"
                onClick={Search_Music}
              >
                <FaSearch size={14} color="black" />
              </button>
            </div>
            {/* the search result tab */}
            {isSearching === true ? <div className="bg-black  top-10 l h-[20rem] z-20 w-[95%] rounded-xl  border border-gray-600 absolute transition-all px-2 py-2 flex items-normal justify-start gap-2 flex-wrap">
              {/* the cancel icon */}
              <MdCancel onClick={() => setIsSearching(false)} className="absolute top-3 right-5 " color="white" />
              {results.length > 0 ? results.map((result, index) => {
                return (<div onClick={() => dispatch(setSong(result))} className="text-white cursor-pointer" key={index}>
                  <img src={result.thumbnail} className="h-10 w-10 rounded-full" alt="" />
                  <span className="text-sm flex items-center justify-center gap-1 w-full">{result.title} <FaPlay onClick={() => setIsSearching(false)} /></span>
                </div>)
              }) : <span className="text-gray-300 text-center p-4 text-xl">Not found...</span>}

            </div> : null}
          </div>

          {/* Right: Nav Links, User Icon, Mobile Menu */}
          <div className="flex items-center gap-3 text-white">
            {/* Links for desktop only */}
            <div className="hidden sm:flex gap-3 font-bold">
              <Link to="/">Home</Link>
              <Link to="/Explore">Explore</Link>
              <Link to="/Post">Post</Link>
              <Link to="/Account">Account</Link>
            </div>

            {/* User Avatar */}
            {user ? (
              <Link className="cursor-pointer" to="/Account ">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.image}
                  alt="User"
                />
              </Link>

            ) : (
              <FaUserAstronaut size={22} />
            )}

            {/* Menu Icon (Mobile only) */}
            <div className="block sm:hidden">
              <IoMenu onClick={show_Sidebar} size={26} />
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <SideBar hide_Sidebar={hide_Sidebar} visible={visible} />
      </header>



    </>
  );
};
export default Navbar;
