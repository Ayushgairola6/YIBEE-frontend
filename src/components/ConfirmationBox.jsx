import { useDispatch } from "react-redux";
import { DeletePost } from "../store/posSlice";
import { getUser } from "../store/userslice";


const ConfirmBox = ({ selectedPost, setIsClicked }) => {

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
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50 absolute top-0 left-0 w-full backdrop-blur-sm">
            <div className="  h-32 flex items-center justify-center gap-12  bg-black w-36 rounded-xl py-32 px-48 border border-indigo-600">
                <button className=" rounded-xl border bg-white text-black px-6 py-2 font-semibold hover:bg-black hover:text-white transition-all duration-300" onClick={() => FinalDelete(selectedPost)}>Yes</button>
                <button className="p-1 rounded-xl text-white px-6 py-2 font-semibold border  hover:bg-gray-400 transition-all duration-300" onClick={() => setIsClicked(false)}>No</button>
            </div>

        </div>


    </>)
}

export default ConfirmBox;