import { useDispatch, useSelector } from "react-redux";
import { getUser, AddProfilePicture, AddCoverPicture } from '../store/userslice';
import { useEffect, useRef, useState } from "react";
import { KeepLoggedIn } from "../store/AuthSlice";

import { BiPlus } from "react-icons/bi";
import Loader from "./Loader";
import ConfirmBox from "./ConfirmationBox";
import { MdClose } from "react-icons/md";
import { logout } from "../store/AuthSlice";
import { FiArrowUpRight } from "react-icons/fi"
import LoadingImage from "./LoadingImage";
const UserAccount = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [selectedPost, setselectedPost] = useState(null);
    const [hoveredPost, setHoverdPost] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null)
    const [CoverPreview, setCoverPreview] = useState(null)

    const UserImage = useRef();
    const Cover = useRef();
    const ProfileLoading = useSelector(state => state.user.profile);
    const CoverLoading = useSelector(state => state.user.banner);

    const dispatch = useDispatch()
    const User = useSelector(state => state.user.user);
    //  CALLING FOR THE USER DATA 
    useEffect(() => {
        dispatch(getUser());
    }, [])

    useEffect(() => {
        const sessionState = JSON.parse(sessionStorage.getItem("loginState"))
       if (sessionState) {
            dispatch(KeepLoggedIn());
       }
     }, [dispatch])
    async function AddImage() {
        const formData = new FormData();

     
        formData.append('ProfilePictures', UserImage.current.files[0])
        dispatch(AddProfilePicture(formData));
        setProfilePreview(null)

    }

    async function AddCover() {
        const formData = new FormData();
        
        formData.append('CoverPhotos', Cover.current.files[0])
        dispatch(AddCoverPicture(formData));
        setCoverPreview(null);

    }



    function showConfimation(post) {
        setIsClicked(true)
        setselectedPost(post)
    }


    function handleFilePreview(file, setPreview) {
        if (!file) {
            alert("Please select a valid image file");
            setPreview(null); // Reset preview if no file
            return;
        }

        // Create a FileReader to read the file
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result); // Set preview to the file's base64 string
        };
        reader.readAsDataURL(file);
    }

    function ImagePreview(e) {
        const file = e.target.files[0];

        // Check if the input matches the profile or cover image
        if (file && e.target === UserImage.current) {
            handleFilePreview(file, setProfilePreview);
        } else if (file && e.target === Cover.current) {
            handleFilePreview(file, setCoverPreview);
        } else {
            setProfilePreview(null);
            setCoverPreview(null);
        }
    }





    return (<>
        {User ? (<>
            {/* main div */}
            <div className=" min-h-screen  ">

                {/* div containing cover and profilePic */}
                <div className=" h-full">
                    {/* coverPhoto div with choose and upload button */}
                    <div className=" h-40  flex items-center justify-evenly p-1 my-3">
                        {CoverLoading === "isLoading" ? <LoadingImage /> : <img className="h-full w-4/5" src={User.coverPhoto === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpIAGs73zfdJhozC5nsPL36iKkN_wR8uzUNA&s" : User.coverPhoto} />}
                        {/* div containing the input and button */}
                        <div className="flex flex-col items-center justify-center gap-2">
                            {CoverPreview !== null ? <img className="h-10 w-10" src={CoverPreview} alt="" /> : null}

                            <label htmlFor="cover-upload" className="file-upload-label inline-block w-5 h-5 rounded-full bg-green-600 text-black text-center cursor-pointer font-extrabold text-lg">
                                <BiPlus />
                                <input onChange={ImagePreview} ref={Cover} id="cover-upload" type="file" className="bg-white text-xs file-upload-input hidden " />
                            </label>
                            <button onClick={AddCover} className="px-1 tex-black text-xs font-bold hover:rounded-xl bg-green-600 hover:scale-105 hover:bg-green-400">AddCover</button>
                        </div>

                    </div>
                    {/* profilePhoto div with choose and upload button ++ User Name and email below*/}
                    <div className="  flex flex-col items-normal justify-center gap-2  my-3">
                        {/* div for profileimage and buttons */}
                        <div className="  flex flex-col items-start justify-evenly p-1">
                            <div className=" h-28 w-full flex  items-start justify-between gap-2 px-1">
                                <div className="h-full">
                                    {ProfileLoading === "loading" ? <img className="bg-cover bg-center  h-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ&s" alt="" /> : <img className="h-full " src={User.image} />}
                                </div>
                                {/* div containing the input and button */}
                                <div className="flex flex-col items-center justify-center gap-2">
                                    {profilePreview !== null ? <img className="h-10 w-10" src={profilePreview} alt="" /> : null}

                                    <label htmlFor="profile-upload" className="file-upload-label inline-block w-5 h-5 rounded-full bg-green-600 text-black text-center cursor-pointer font-extrabold text-lg">
                                        <BiPlus />
                                        <input onChange={ImagePreview} ref={UserImage} id="profile-upload" type="file" className="bg-white text-xs file-upload-input hidden " />
                                    </label>

                                    <button onClick={AddImage} className="px-1 tex-black  font-bold text-xs hover:scale-105 bg-green-600 hover:rounded-xl hover:bg-green-400">AddProfile</button>
                                </div>
                            </div>

                        </div>

                        {/* div for username and email */}
                        <div className="relative pl-2 text-gray-300 ">
                            <button onClick={() => dispatch(logout())} className="absolute left-36 text-black font-sans bottom-12 bg-red-500 text-sm font-bold px-1 rounded-xl flex items-center justify-evenly">Logout<FiArrowUpRight /></button>
                            <div className="flex flex-col">
                                <span>{User.username}</span>
                                <span>{User.email}</span>
                            </div>
                        </div>
                    </div>
                    {/* container for the mapped posts */}
                    <div className="  grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-lg:gap-2">
                        {User.posts.map((post, i) => {
                            return <>

                                <div key={i} onMouseOverCapture={() => {
                                    setMouseOver(true)
                                    setHoverdPost(post)
                                }} onMouseOutCapture={() => setMouseOver(false)} className=" overflow-y-auto  relative border border-teal-400 m-auto text-white flex flex-col p-1 flex-wrap max-w-52 bg-[#1e1e1e] rounded-xl  max-lg:text-xs max-lg:w-32">
                                    {mouseOver === true && post._id === hoveredPost._id ? <span className="absolute m-auto  font-bold text-lg right-5 top-5"> <MdClose color="red" onClick={() => showConfimation(post)} /></span> : null}                                        <img className="max-h-44 max-lg:h-10 rounded-xl" src={post.images} alt="" />

                                    <span className="border-t border-teal-400 font-bold">Mood:{post.Mood !== "" ? post.Mood : 'mood'}</span>
                                    <span className="border-t border-teal-400 font-bold">title:{post.title}</span>

                                </div>


                            </>
                        })}
                    </div>
                    {isClicked === true && selectedPost ? <ConfirmBox selectedPost={selectedPost} setIsClicked={setIsClicked} /> : null}


                </div>
                {/* div Containing posts of the user */}
                <div>

                </div>

            </div>
        </>) :
            // bewlow this the else statement starts 
            <div className="flex items-center justify-center tet-center text-bold text-xl text-teal-500">
                <h1>Your Account details are loading please wait</h1>
                <Loader></Loader>
            </div>
            // above this is the else statement ends
        }

    </>)
}

export default UserAccount;