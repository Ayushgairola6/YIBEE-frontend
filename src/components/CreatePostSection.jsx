import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../store/posSlice";
import { KeepLoggedIn } from "../store/AuthSlice";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Popup from "./Popup";
import Error from "./error";
const CreatePost = () => {
  const dispatch = useDispatch();

  // verification  of the state
  useEffect(() => {
    const sessionState = JSON.parse(sessionStorage.getItem("loginState"))
    if (sessionState) {
      dispatch(KeepLoggedIn());
    }
  }, [dispatch])


  const img = useRef();
  const Posted = useSelector(state => state.posts.isPosted);
  let isClicked = useSelector(state => state.posts.isCreated);
  const [postData, setPostData] = useState({
    Mood: "",
    images: "",
    title: "",
    caption: "",
    hashtags: ""
  })
  // ALL THE INPUT REFRENCES
  function handleChange(e) {
    const { name, value, files } = e.target;

    // If the input is a file, save the first file in the state
    if (files) {
      setPostData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setPostData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  // VALUE OF ALL THE REFS 


  // METHOD THAT IS CALLED WHEN FORM IS SUBMITTED
  async function HandleCreatePost() {
    const formData = new FormData();
    if (postData.Mood === "" || postData.title === "" || postData.caption === "" || postData.hashtags === "") {
      return;
    }


    formData.append("Mood", postData.Mood);
    formData.append("title", postData.title);
    formData.append("caption", postData.caption);
    formData.append("hashtags", postData.hashtags);

    // Check if an image file is selected before appending it
    if (postData.images) {
      formData.append("images", postData.images); // Append the image file
    }


    dispatch(createPost(formData));



  }

  return (
    <>
      {Posted === "Posted" ? <Popup Posted={Posted} /> : null}
      {Posted === "Server Error!" ? <Error Posted={Posted} /> : null}
      {Posted === "Please wait.." ? <Popup Posted={Posted} /> : null}
      {/* {Posted === "Posted" ? <Popup  /> : null} */}
      <div encType="multipart/form-data" className="h-full w-full flex  items-center justify-center flex-col text-xl  font-serif py-4 ">
        <div className="flex flex-col items-center justify-center gap-2 my-2">
          <h1 className="text-white ">Start by expressing yourself</h1>
          <span className="text-gray-400 text-xs ">We suggest posting something about your favorite mood and music</span>
        </div>
        <div className=" w-[95%] md:w-4/5 bg-gradient-to-br from-white/15 to-white/5 text-white   rounded-xl py-4 px-4   ">

          <div className="mt-6 ">
            <label className=" block mb-2 text-lg">Your Mood</label>
            <select value={postData.Mood} onChange={handleChange} name='Mood'
              className=" text-white bg-black font-sm  border-none border-2 rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-indigo-700 shadow-md cursor-pointer shadow-black text-sm" >
              <option disabled>
                select an option
              </option >
              <option value="Romantic">Romantic</option>
              <option value="Sad">Sad</option>
              <option value="Bored">Bored</option>
              <option value="Thrilled">Thrilled</option>
              <option value="Excited">Excited</option>
              <option value="Scared">Tired</option>
              <option value="Uncertain">Uncertain</option>

            </select>
          </div>
          <div className="mt-6 ">
            <label className="h-20 w-20 text-lg">Upload an Image</label>
            <input ref={img} name='images' onChange={handleChange}
              className=" bg-black text-white cursor-pointer  rounded-xl w-full p-2 focus:outline-none focus:ring-1 focus:ring-indigo-700 text-sm" type="file" placeholder="choose from local directory " />
          </div>
          <div className="mt-6">
            <label className=" block mb-2 text-lg">Post Title</label>
            <input value={postData.title}
              onChange={handleChange}
              name="title"
              placeholder="Heavy rain and Arijit.."
              type="text"
              className=" text-white bg-black  rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-indigo-700 text-sm"
            />
          </div>

          <div className="mt-6">
            <label className=" block mb-2 text-lg">
              Caption
            </label>
            <textarea
              name="caption"
              value={postData.caption}
              onChange={handleChange}
              placeholder="Tell the world how you feel"
              className=" text-white bg-black  rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-indigo-700 text-sm"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className=" block mb-2 text-lg">Hashtags</label>
            <input

              value={postData.hashtags}
              name='hashtags'
              onChange={handleChange}
              placeholder="#Your mood"
              type="text"
              className=" text-white bg-black  rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-indigo-700 text-sm"
            />

          </div>
          {/* Buttons  */}
          <div onClick={HandleCreatePost} className="flex items-center justify-end gap-3  w-full">
            <button className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-indigo-600 hover:to-purple-600  text-black text-lg  py-2 px-4  hover:rounded-xl mt-4 shadow-md shadow-black  border border-black font-bold rounded-xl transition-all">
              Post
            </button>
            <button className="border   text-white  py-2 px-4  text-lg hover:rounded-xl mt-4 shadow-md shadow-black hover:bg-white hover:text-black transition-all font-bold rounded-xl ">
              Delete
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
export default CreatePost;
