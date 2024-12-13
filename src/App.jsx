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
import { useEffect } from "react";
import UserAccount from "./components/UserAccount";
import Loader from "./components/Loader";
import Genre from "./components/Genre";
import SmallNavbar from './components/ForSmallScreen/SmallNavbar'
import SocialMedia from "./components/SocialMedia";
import Musicplayer from "./components/MusicPlayer";
import { setUpAxiosInterCeptors } from "./store/axiosIntercepter";


function App() {

  // check if the is expired or not
  useEffect(() => {
    setUpAxiosInterCeptors;
  }, [])
  const dispatch = useDispatch();

  // LOGIN STATE 
  const LoggedInStatus = useSelector(state => state.auth.loggedIn);
  // POSTS AND SONGS FETCHED STATUS 
  const fetchStatus = useSelector(state => state.posts.isFetched);
  const SongStatus = useSelector(state => state.music.songfetched)


  useEffect(() => {
    if (LoggedInStatus === true) {
      dispatch(getUser());
    }
  }, [dispatch, LoggedInStatus]);






  if (LoggedInStatus === false) {
    console.log('not logged in', LoggedInStatus)
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
  } else if (LoggedInStatus === true && window.innerWidth <= 800 ) {
    return <>
      <Router>
        <div className="relative  bg-black">
          <SmallNavbar />
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
  else if (LoggedInStatus === true ) {
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
      

    )
  }

}

export default App;
