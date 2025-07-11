import { useEffect, useState, useRef } from "react";
import { FaRegHeart, FaShareSquare, FaUser, FaComments, FaArrowAltCircleRight } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, Likepost, unlike } from "../store/posSlice";

import LoadingCard from "./LoadingCard";
const PostCard = () => {
  const status = useSelector((state) => state.posts.status);
  const post = useSelector((state) => state.posts.posts);
  const liked = useSelector(state => state.posts.likedCalled);
  const likedPosts = useSelector(state => state.posts.likedPosts)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchPosts());
  //   }
  // }, [dispatch, status]);

  const postContainer = useRef();

  const handleLike = (p) => {
    dispatch(Likepost(p));
  };





  return (
    <>
      {post.length > 0 ? (
        <div
          ref={postContainer}
          className="  gap-5 rounded-lg overflow-y-auto scroll-smooth p-4  min-w-96 h-fit  "
        >
          <div>
            {post.map((p, index) => (
              <div
                key={index}
                className=" transition-all  relative flex-1 rounded-lg  bg-opacity-80 backdrop-blur-md  w-full h-fit bg-gradient-to-tr from-white/5 to-white/10 cursor-pointer py-2 text-gray-200  mb-2 p-2"
              > {/* TITLE AND MOOD */}
                <div className="flex items-center justify-between  bg-white/5 py-3 px-2 rounded-xl mt-2">
                  <span className="font-bold text-lg text-purple-700">
                    {p.title}
                  </span>
                  <span className="flex items-center justify-center font-semibold text-xl gap-1 bg-gradient-to-r from-purple-700 to-blue-700 text-transparent bg-clip-text">
                    <span className="text-purple-700 font-mono">
                      {p.Mood}
                    </span>
                  </span>
                </div>
                {/* IMAGE */}
                <div className="w-full h-72 overflow-hidden rounded-lg">
                  <img
                    alt=""
                    src={p.images}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* USER INFO */}
                <div className="mt-4 flex items-center justify-between py-2 px-3 bg-white/5 rounded-xl">
                  <div className="font-extrabold font-mono flex items-center justify-center gap-1 ">
                    <span className="flex items-center justify-center gap-1 text-indigo-600"> <FaUser color="white"/>{p.author.username}</span>

                  </div>

                </div>
                {/* CAPTION */}
                <div className="mt-4 text-lg text-gray-200 py-2 px-3 bg-white/5 rounded-xl">
                  <p className="px-2 font-bold">{p.caption}</p>
                </div>
                {/* actions */}
                <div className="flex items-center justify-end w-full my-3 bg-purple-900 rounded-xl p-2 gap-3">
                  <span className="font-semibold text-lg flex items-center justify-center">

                    {likedPosts.includes(p._id) ? (
                      liked === "wait" ? ".." :
                        <FcLike onClick={() => handleLike(p)} />
                    ) : (
                      liked === "wait" ? ".." :
                        <FaRegHeart onClick={() => handleLike(p)} />
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
                {/* HASHTAGS */}
                <div className="mt-4">
                  <span className="text-md text-teal-500 mr-2">{p.hashtags}</span>
                </div>
              </div>
            ))}

          </div>


        </div>
      ) : <LoadingCard />}
    </>
  );
};

export default PostCard;

