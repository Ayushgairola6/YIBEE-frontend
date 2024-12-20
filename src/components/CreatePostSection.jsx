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
  async function HandleCreatePost(e) {
    await e.preventDefault()
    const formData = new FormData();



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
      <form encType="multipart/form-data" onSubmit={HandleCreatePost} className="h-full w-screen flex  items-center justify-center text-xl font-bold font-serif my-4 ">

        <div className=" bg-gradien-to-r from-[#2e2e3a] to-slate-700 text-gray-200 h-full  rounded-xl p-6 w-3/4 shadow-md shadow-teal-500 ">

          <div className="mt-6 ">
            <label className=" block mb-2 text-xl">Your Mood</label>
            <select value={postData.Mood} onChange={handleChange} name='Mood'
              className=" text-black font-sm  border-blue-400 border-2 rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-teal-400 shadow-md shadow-black" >
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
            <label className="h-20 w-20 ">Upload an Image</label>
            <input ref={img} name='images' onChange={handleChange}
              className="   rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-teal-400 shadow-md shadow-black" type="file" placeholder="choose from local directory" />
          </div>
          <div className="mt-6">
            <label className=" block mb-2 text-xl">Post Title</label>
            <input value={postData.title}
              onChange={handleChange}
              name="title"
              placeholder="Heavy rain and Arijit.."
              type="text"
              className=" text-black border-blue-400 border-2 rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-teal-400 shadow-md shadow-black"
            />
          </div>

          <div className="mt-6">
            <label className=" block mb-2 text-xl">
              Caption
            </label>
            <textarea
              name="caption"
              value={postData.caption}
              onChange={handleChange}
              placeholder="Tell the world how you feel"
              className="text-black  border-blue-400 border-2 rounded-lg w-full p-2 h-32 focus:outline-none focus:ring-1 focus:ring-teal-400 shadow-md shadow-black"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className=" block mb-2 text-xl">Hashtags</label>
            <input

              value={postData.hashtags}
              name='hashtags'
              onChange={handleChange}
              placeholder="#mood #loveIsInTheAir"
              type="text"
              className="text-black border-blue-400 border-2 rounded-lg w-full p-2 focus:outline-none focus:ring-1 focus:ring-teal-400 shadow-md shadow-black"
            />

          </div>
          {/* Buttons  */}
          <div className="flex items-center justify-between gap-3 ">
            <button className="bg-gradient-to-r from-emerald-400 to-teal-400   text-black text-xl font-bold py-2 px-4 w-full hover:rounded-xl mt-4 shadow-md shadow-black hover:scale-105 border border-black">
              Post
            </button>
            <button className="bg-gradient-to-r from-emerald-400 to-teal-400   text-black font-bold py-2 px-4 w-full text-xl hover:rounded-xl mt-4 shadow-md shadow-black hover:scale-105 border border-black">
              delete
            </button>
          </div>

        </div>
      </form>
    </>
  );
};
export default CreatePost;
