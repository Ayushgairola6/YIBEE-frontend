import { useDispatch, useSelector } from "react-redux";
import { getUser, AddProfilePicture, AddCoverPicture } from '../store/userslice';
import { useEffect, useRef, useState } from "react";
import { KeepLoggedIn, logout } from "../store/AuthSlice";
import { BiPlus } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import Loader from "./Loader";
import ConfirmBox from "./ConfirmationBox";
import LoadingImage from "./LoadingImage";
import { BiTrash } from "react-icons/bi";
const UserAccount = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [selectedPost, setselectedPost] = useState(null);
  const [hoveredPost, setHoverdPost] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const UserImage = useRef();
  const Cover = useRef();
  const ProfileLoading = useSelector(state => state.user.profile);
  const CoverLoading = useSelector(state => state.user.banner);
  const User = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getUser()); }, [dispatch]);

  useEffect(() => {
    const sessionState = JSON.parse(sessionStorage.getItem("loginState"));
    if (sessionState) dispatch(KeepLoggedIn());
  }, [dispatch]);

  const handleFilePreview = (file, setPreview) => {
    if (!file) { setPreview(null); return; }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const ImagePreview = (e) => {
    const file = e.target.files[0];
    if (e.target === UserImage.current) handleFilePreview(file, setProfilePreview);
    else if (e.target === Cover.current) handleFilePreview(file, setCoverPreview);
  };

  const AddImage = () => {
    if (!UserImage.current.files[0]) return;
    const formData = new FormData();
    formData.append('ProfilePictures', UserImage.current.files[0]);
    dispatch(AddProfilePicture(formData));
    setProfilePreview(null);
  };

  function HandleEditProfile() {
    if (UserImage.current.files[0]) {
      const formData = new FormData();
      formData.append('image', UserImage.current.files[0]);
      formData.append('type', "ProfilePhoto");
      dispatch(AddProfilePicture(formData));
      // return;
    } else if (Cover.current.files[0]) {
      const formData = new FormData();
      formData.append('image', Cover.current.files[0]);
      formData.append('type', "coverPhoto");
      dispatch(AddProfilePicture(formData));
      // return;
    } else {
      return;
    }

  }

  const AddCover = () => {
    if (!Cover.current.files[0]) return;
    const formData = new FormData();
    formData.append('CoverPhotos', Cover.current.files[0]);
    dispatch(AddCoverPicture(formData));
    setCoverPreview(null);
  };

  const showConfirmation = (post) => {
    setIsClicked(true);
    setselectedPost(post);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {User === null && User?.posts ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-xl text-sky-400">Loading your account...</h1>
          <Loader />
        </div>
      ) : (
        <>
          {/* Cover Section */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="h-48 bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-900 flex items-center justify-center relative">
              {CoverLoading === "isLoading" ? <div className="h-full w-full rounded-full absolute top-2 left-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full border-t-4 border-white animate-spin"></div>
              </div> : (
                <img
                  className="object-cover w-full h-full opacity-90"
                  src={User?.coverPhoto ? User.coverPhoto : "/"
                  }
                  alt="Cover"
                />
              )}
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              {coverPreview && <img className="w-12 h-12 rounded-full border-2 border-sky-400" src={coverPreview} alt="preview" />}
              {/* <label htmlFor="cover-upload" className="cursor-pointer p-1 bg-purple-700 rounded-full hover:bg-indigo-500 transition">
                <BiPlus size={20} />
                <input onChange={ImagePreview} ref={Cover} id="cover-upload" type="file" className="hidden" />
              </label>
              <button onClick={AddCover} className="px-4 py-2 bg-black rounded-lg text-white hover:bg-white hover:text-black transition">
                Upload Cover
              </button> */}
              <label htmlFor="cover-upload" className="cursor-pointer p-1 bg-purple-700 rounded-full hover:bg-indigo-500 transition">
                <BiPlus size={20} />
                <input onChange={ImagePreview} ref={Cover} id="cover-upload" type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Profile & Info Section */}
          <div className="flex items-center space-x-6 mb-12">
            <div className="relative">
              <div className="w-36 h-36 bg-gradient-to-br from-purple-800 to-indigo-700 p-1 rounded-full shadow-lg">
                {ProfileLoading === "loading" ? (
                  <div className="h-full w-full rounded-full absolute top-2 left-0 flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full border-t-4 border-white animate-spin"></div>
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={User?.image ? User.image : "/"
                    }
                    alt="Profile"
                  />
                )}
              </div>
              <div className="absolute bottom-0 right-0 flex items-center space-x-1">
                {profilePreview && <img className="w-10 h-10 rounded-full border-2 border-sky-400" src={profilePreview} alt="preview" />}
                <label htmlFor="profile-upload" className="cursor-pointer p-1 bg-indigo-600 rounded-full hover:bg-purple-600 transition">
                  <BiPlus size={18} />
                  <input onChange={ImagePreview} ref={UserImage} id="profile-upload" type="file" className="hidden" />
                </label>
                <button onClick={HandleEditProfile} className="px-3 py-1 bg-black rounded-lg text-white hover:bg-white hover:text-black transition text-sm ">
                  Upload
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-indigo-300">{User.username}</h2>
              <p className="text-sky-300">{User.email}</p>
              <p>jkdsjfkds</p>
              <button
                onClick={() => dispatch(logout())}
                className="mt-3 inline-flex items-center space-x-1 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition text-sm"
              >
                <span>Logout</span><FiArrowUpRight />
              </button>
            </div>
          </div>

          {/* Posts Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 border-t border-indigo-500 py-2">
            {User !== null && User?.posts ? User.posts.map((post) => (
              <div
                key={post._id}
                onMouseEnter={() => { setMouseOver(true); setHoverdPost(post); }}
                onMouseLeave={() => setMouseOver(false)}
                className="relative bg-gradient-to-br from-white/5 to-white/10 p-4 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden "
              >
                {mouseOver && hoveredPost._id === post._id && (
                  <button
                    onClick={() => showConfirmation(post)}
                    className="absolute top-3 right-3 p-1 bg-red-500 rounded-full hover:bg-red-400 transition"
                  >
                    <BiTrash size={18} color="white" />
                  </button>
                )}
                <img className="w-full h-40 object-cover rounded-xl mb-3" src={post.images} alt={post.title} />
                <p className="text-indigo-300 font-semibold">{post.Mood || 'N/A'}</p>
                <p className="text-sky-300 font-semibold truncate">{post.title || 'Untitled'}</p>
              </div>
            )) : null}
          </div>

          {/* Confirm Box */}
          {isClicked && selectedPost && (
            <ConfirmBox selectedPost={selectedPost} setIsClicked={setIsClicked} />
          )}
        </>
      )}
    </div>
  );
};

export default UserAccount;
