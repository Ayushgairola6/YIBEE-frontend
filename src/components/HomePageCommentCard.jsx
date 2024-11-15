import { useDispatch ,useSelector} from "react-redux";
import { AddComment, setUser } from "../store/userslice";
import { useRef } from "react";
// COMPONENT STARTS HERE..
const CommentCard = () => {
  const post = useSelector((state) => state.posts.posts);
  const textArea = useRef();
  const dispatch = useDispatch();

  function AddComment(e){
  post.map((p,i)=>{
    if(e._id === p._id){
      console.log(p);
      return
    }
  })

  }


  return (
    <>
      <textarea
        ref={textArea}
        placeholder="Add Comment...."
        className="p-1 h-24 rounded-lg  shadow-md shadow-black bg-gradient-to-tr from-slate-200 via-pink-200 to-purple-300 w-full border-2 border-black text-black font-bold"
        type="comment"
      ></textarea>
      <button onClick={AddComment}
        className="  border-[black] shadow-md shadow-black m-1 border-1 font-bold px-1 bg-pink-400 text-lg text-black 
       hover:rounded-xl  hover:bg-gradient-to-r from-pink-500 to-purple-500"
      >
        Comment
      </button>
    </>
  );
};
export default CommentCard;
// bg-[#ffe4e1]
