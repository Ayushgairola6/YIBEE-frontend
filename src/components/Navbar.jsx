import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, defaultMode } from "../store/ThemeSlice";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from 'react-icons/io5'
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { SearchSongs } from "../store/musicSlice";
import OverLay from "./Overlay"
const Navbar = () => {

  const dispatch = useDispatch()

  // sidebar visibility state
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const inputRef = useRef()

  function show_Sidebar() {
    setVisible(!visible)
    console.log(visible)
  }

  function hide_Sidebar() {
    setVisible(!visible)
    console.log(visible)
  }

  function Search_Music() {
    dispatch(SearchSongs(inputRef.current.value))
    setSearch(true);

  }


  return (
    <>
      <header>
        {search === true ? <OverLay setSearch={setSearch} /> : null}
        <nav className="flex items-center justify-evenly text-white bg-transparent dark:bg-black dark:text-white">
          <ul className="flex items-center justify-center gap-8">
            <h1 className=" text-2xl font-bold">
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500'>YIBEE</span>
            </h1>
            <div className="relative ">
              <input
                ref={inputRef}
                className=" text-black text-sm font-bold px-2 rounded-xl"
                type="text"
                placeholder="EX : FXRGET MY NAME ...."
              />
              <button className="absolute right-2 top-1.5 " onClick={Search_Music}>
                <FaSearch size={14} color="black" />

              </button>
            </div>
          </ul>
          <ul className=" ">
            <div className="sm:flex items-center justify-evenly gap-5 hidden ">
              <Link className="text-l font-bold" to="/">
                Home
              </Link>
              <Link className="text-l font-bold" to="/Explore">
                Explore
              </Link>
              <Link className="text-l font-bold" to="/Post">
                Post
              </Link>
              <Link className="text-l font-bold" to="/Account">
                Account
              </Link>
              <ul>

              </ul>

            </div>
            <ul className="sm:hidden block" >
              <IoMenu onClick={show_Sidebar} size={30} />
            </ul>
          </ul>
          {visible === true ? <SideBar hide_Sidebar={hide_Sidebar} /> : null}


        </nav>
      </header>

      {/* This overlay will only appear when the Search Input section is active */}
    </>
  );
};
export default Navbar;
