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
import { KeepLoggedIn } from "./store/AuthSlice";

function App() {
  // LOGIN STATE 
  const LoggedInStatus = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();

  // check if the token is expired or not to keep the user engaged
  useEffect(() => {
    const sessionState = JSON.parse(sessionStorage.getItem("loginState"))
    if (sessionState) {
      dispatch(KeepLoggedIn());
    }
    console.log(LoggedInStatus)
  }, [dispatch])


  // POSTS AND SONGS FETCHED STATUS 
  const fetchStatus = useSelector(state => state.posts.isFetched);
  const SongStatus = useSelector(state => state.music.songfetched)
  const userStatus = useSelector(state => state.user.Situation);
  const session = useSelector(state => state.auth.sessionState);

  useEffect(() => {
    if (LoggedInStatus === true) {
      dispatch(getUser());
      dispatch(fetchSongs());
      dispatch(fetchPosts())

    }

  }, [dispatch, LoggedInStatus, session]);





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
  } else if (LoggedInStatus === true && window.innerWidth <= 800) {
    return <>
      <Router>
        <div className="relative  bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<SocialMedia />}></Route>
            <Route path="/createPost" element={<MakePostPage />}></Route>
            <Route path="/Account" element={<UserAccount />}></Route>
            <Route path="/Genre" element={<Genre />}></Route>
            <Route path="/playlist" element={<YourMusic /> }></Route>
            <Route path="/musicPlayer" element={<Musicplayer />}></Route>
          </Routes>
          <Footer></Footer>

        </div>
      </Router>
    </>
  }
  else if (LoggedInStatus === true) {
    return (

      <Router>
        <div className="  relative  bg-black  ">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Explore" element= {<YourMusic /> }></Route>
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
  }

}

export default App;
