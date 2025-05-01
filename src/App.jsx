import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import MakePostPage from "./components/MakeAPostPage";
import SignupPage from "./components/SignupPage";
import Login from "./components/LoginPage";
import YourMusic from "./components/YourMusic";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import { fetchPosts } from "./store/posSlice";
import { fetchSongs } from "./store/musicSlice"
import { getUser } from "./store/userslice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UserAccount from "./components/UserAccount";
import Loader from "./components/Loader";
import Genre from "./components/Genre";
import SmallNavbar from './components/ForSmallScreen/SmallNavbar'
import SocialMedia from "./components/SocialMedia";
import Musicplayer from "./components/MusicPlayer";
import LoadingCard from "./components/LoadingCard";
import { verifyToken } from "./store/AuthSlice";
import sunset from './assets/sunset.jpg'


function App() {
  // LOGIN STATE 
  const LoggedInStatus = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  const [delay, setDelay] = useState(true);

  // check if the token is expired or not to keep the user engaged
  useEffect(() => {
    const message = dispatch(verifyToken())
    if (message.message === "Authorized") {
      dispatch(getUser());
      dispatch(fetchSongs());
      dispatch(fetchPosts())
    }
  }, [])

  // the slight loading effect
  useEffect(() => {
    const time = setTimeout(() => {
      setDelay(false);
    }, 3000)

    return () => clearTimeout(time);

  }, [])

  // POSTS AND SONGS FETCHED STATUS 
  const fetchStatus = useSelector(state => state.posts.isFetched);
  const SongStatus = useSelector(state => state.music.songfetched)
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (LoggedInStatus === true && token) {
      dispatch(getUser());
      dispatch(fetchSongs());
      dispatch(fetchPosts())

    }

  }, [dispatch, LoggedInStatus, LoggedInStatus]);





  if (LoggedInStatus === false) {

    return (
      <Router>
        <div className="scroll-smooth h-screen w-screen bg-black overflow-x-hidden">
          {/* <Navbar> </Navbar> */}
          <Routes>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>

        </div>
      </Router>
    )
  } else if (LoggedInStatus === true && window.innerWidth <= 800 && fetchStatus === true && user !== null && delay === false
  ) {
    return <>
      <Router>
        <div className="relative  bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<SocialMedia />}></Route>
            <Route path="/createPost" element={<MakePostPage />}></Route>
            <Route path="/Account" element={<UserAccount />}></Route>
            <Route path="/Genre" element={<Genre />}></Route>
            <Route path="/playlist" element={<YourMusic />}></Route>
            <Route path="/musicPlayer" element={<Musicplayer />}></Route>
          </Routes>
          <Footer></Footer>

        </div>
      </Router>
    </>
  }
  else if (LoggedInStatus === true && fetchStatus === true && user !== null && delay === false) {
    return (

      <Router>
        <div className="  relative  bg-black  ">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Explore" element={<YourMusic />}></Route>
            <Route path="/Post" element={<MakePostPage />}></Route>
            <Route path="/Account" element={<UserAccount />}></Route>
            <Route path="/Genre" element={<Genre />}></Route>
          </Routes>
          {/* <Controls></Controls> */}
          <Footer></Footer>
        </div>

      </Router>
      // : <div className="bg-black text-white flex items-center justify-center h-screen w-screen flex-col"><LoadingCard />
      // <span>Loading...</span></div>}

    )
  } else {
    // return <div style={{background:"url('./assets/sunset.jpg')"}} className="h-screen  flex flex-col items-center justify-center text-2xl relative ">
    //   {/* <img className="absolute opacity-80 top-0 left-0 z-0" src={sunset} alt="" /> */}
    //   <h1 className="text-white text-3xl">
    //     BECOME ONE WITH

    //   </h1>
    //   <span className="text-xl text-white">MUSIC</span>

    // </div>

    return <div className="h-screen relative flex flex-col items-center justify-center text-white text-2xl overflow-hidden">
      {/* Background image */}
      <img
        src="https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712616.jpg?t=st=1745571052~exp=1745574652~hmac=77fa2ba8e5011361a273178bbbb3c7930619d1253dc306ecc546fde7902a057c&w=1380"
        alt="cyberpunk city"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Centered Text */}
      <div className="z-10 flex flex-col items-center text-center px-4">
        <h1
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          BECOME ONE WITH
        </h1>

        <span
          className="mt-2 text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-300 to-purple-500 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] tracking-wide animate-pulse"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          MUSIC
        </span>
      </div>
    </div>




  }

}

export default App;
