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
        dispatch(getUser());
        setIsClicked(false)

    }



    return (<>
        <div  className="absolute m-auto inset-0 h-32 flex items-center justify-center gap-12 px-36 py-28 bg-white w-36 ">
            <button className="p-1 rounded-lg bg-gray-300 font-semibold " onClick={()=>FinalDelete(selectedPost)}>Yes</button>
            <button className="p-1 rounded-lg bg-gray-300 font-semibold "onClick={()=>setIsClicked(false)}>No</button>
        </div>


    </>)
}

export default ConfirmBox;