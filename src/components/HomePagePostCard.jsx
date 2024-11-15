import { useEffect, useState, useRef } from "react";
import { FaRegHeart, FaShareSquare, FaUser, FaComments } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, Likepost  } from "../store/posSlice";
import Loader from "./Loader";
import {io } from 'socket.io-client'
const PostCard = () => {
  const [likedPosts, setLikedPosts] = useState([]); // Track liked posts by their IDs
  const status = useSelector((state) => state.posts.status);
  const post = useSelector((state) => state.posts.posts);
  const admin = useSelector((state) => state.auth.isAdmin);
  // const user = useSelector(state => state.user.user)

  const dispatch = useDispatch();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('likedPosts'));
    
   
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
    console.log(post);
  }, [dispatch, status]);

  const postContainer = useRef();

  function handleLike(postId) {
    // Prevent liking the same post multiple times
    if (likedPosts.includes(postId))
       {
        alert('Post Already liked')
        return;
       }

    // Update the liked posts array
    setLikedPosts([...likedPosts, postId]);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    // Dispatch the like action for the specific post
    const postToLike = post.find(p => p._id === postId);
    if (postToLike) {
      dispatch(Likepost(postToLike));
    }
  }
// if(post.length===0){
//   console.log(`empty ${post}`)
//   return <Loader></Loader>
// }



  return (
    <>
      {/* bg-gradient-to-tr from-slate-800 to-slate-700 */}
      {post ? (
        <div
          ref={postContainer}
          className="  gap-5 rounded-lg overflow-y-auto scroll-smooth p-4  min-w-96 h-fit  "
        >
          <div>
            {post.map((p, index) => (
              <div
                key={index}
                className="relative flex-1 rounded-lg bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md  w-full h-fit to-slate-200 p-2 text-gray-200  mb-2 hover:border-b hover:border-teal-500"
              >
                {/* IMAGE */}
                <div className="w-full h-72 overflow-hidden rounded-lg">
                  <img
                    alt="noimage"
                    src={p.images}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* TITLE AND MOOD */}
                <div className="flex items-center justify-between px-2">
                  <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                    {p.title}
                  </span>
                  <span className="flex items-center justify-center font-semibold text-xl gap-1 bg-gradient-to-r from-purple-700 to-blue-700 text-transparent bg-clip-text">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 font-mono">
                      mood: {p.Mood}
                    </span>
                  </span>
                </div>
                {/* USER INFO AND ACTION ICONS */}
                <div className="mt-4 flex items-center justify-between px-1">
                  <div className="font-extrabold font-mono flex items-center justify-center gap-1 from-teal-300 to-cyan-300">
                    <span>{p.author.username}</span>
                    <span>{admin === true ? <MdVerified /> : <FaUser />}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-semibold text-lg flex items-center justify-center">
                      {likedPosts.includes(p._id) ? (
                        <FcLike />
                      ) : (
                        <FaRegHeart onClick={() => handleLike(p._id)} />
                      )}
                      : {p.likes}
                    </span>
                    <span className="font-semibold text-xl flex items-center justify-center">
                      <FaShareSquare /> : {p.shares}
                    </span>
                    <span className="font-semibold text-xl flex items-center justify-center">
                      <FaComments /> : {p.comments}
                    </span>
                  </div>
                </div>
                {/* CAPTION */}
                <div className="mt-4 text-lg text-gray-200">
                  <p className="px-2 font-bold">{p.caption}</p>
                </div>
                {/* HASHTAGS */}
                <div className="mt-4">
                  <span className="text-md text-teal-500 mr-2">{p.hashtags}</span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      ) : <Loader/>}
    </>
  );
};

export default PostCard;

