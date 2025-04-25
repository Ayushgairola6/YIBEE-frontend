import { useDispatch } from "react-redux";
import { DeletePost } from "../store/posSlice";
import { getUser } from "../store/userslice";


const ConfirmBox = ({selectedPost,setIsClicked}) => {

const dispatch = useDispatch()
    
    async function FinalDelete(selectedPost) {
        if (!selectedPost) {
            alert("no posts")
            return;
        }
        dispatch(DeletePost(selectedPost))
        setIsClicked(false)

    }



    return (<>
        <div  className="absolute m-auto inset-0 h-32 flex items-center justify-center gap-12 px-36 py-28 bg-white w-36 ">
            <button className=" rounded-lg border-red-700 px-4 py-2 font-semibold bg-red-300 text-red-700" onClick={()=>FinalDelete(selectedPost)}>Yes</button>
            <button className="p-1 rounded-lg border-sky-700 px-4 py-2 font-semibold bg-sky-300 text-sky-700 "onClick={()=>setIsClicked(false)}>No</button>
        </div>


    </>)
}

export default ConfirmBox;