import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, defaultMode } from "../store/ThemeSlice";
import { useSelector } from "react-redux";

const Navbar = () => {

//   const dispatch = useDispatch()
//   const isDefault = useSelector(state => state.theme.isDefault);
//   const dark = useSelector(state => state.theme.isDark);
//   const light = useSelector(state => state.theme.isLight);
//   const theme = useRef();
// const navbar = useRef();
//   // CHANGING THEME STATE
//   function handleThemeChange() {
//     if (theme.current.value === "default") {
//       dispatch(defaultMode())
     

//     }
//     else if (theme.current.value === 'Dark') {
//       dispatch(DarkMode())
//       console.log(dark)
//     }
//     else if (theme.current.value === 'Light') {
//       dispatch(LightMode())
//      navbar.current.classList.toggle('dark');
//     }
//   }
  return (
    <>
      <header>
        <nav  className="flex items-center justify-evenly text-white bg-transparent dark:bg-black dark:text-white">
          <ul>
            <h1 className=" text-4xl font-bold">
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500'>YIBEE</span>
            </h1>
          </ul>
          <ul>
            <div className="flex items-center justify-evenly gap-5">

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

            </div>
          </ul>
          {/* <ul>
            <div>
              <input
                onFocus={NavbarExpand}
                ref={input}
                className="pt-0.3 text-black text-md font-bold px-2 rounded-3xl"
                type="text"
                placeholder="Arijit Singh ...."
              />
            </div>
          </ul> */}
          {/* <ul>
            <select  name='theme'
              className=" text-black font-mono font-semibold" >
              <option value="default">default</option>
              <option value="Dark">Dark</option>
              <option value="Light">Light</option>
            </select>
          </ul> */}
        </nav>
      </header>

      {/* This overlay will only appear when the Search Input section is active */}
    </>
  );
};
export default Navbar;
