import { useDispatch, useSelector } from "react-redux";
import { getUser, AddProfilePicture, AddCoverPicture } from '../store/userslice';
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Loader from "./Loader";
import ConfirmBox from "./ConfirmationBox";
import { MdClose } from "react-icons/md";


const UserAccount = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [selectedPost ,setselectedPost] = useState(null);
    const [hoveredPost,setHoverdPost]=useState(null);
    const UserImage = useRef();
    const Cover = useRef();
    const choice = useRef();
    const dispatch = useDispatch()
    const User = useSelector(state => state.user.user);
    //  CALLING FOR THE USER DATA 
    useEffect(() => {
        dispatch(getUser());
    }, [])


    async function AddImage() {
        const formData = new FormData();
        if (UserImage.current.files[0] === "") {
            alert("This field can not be empty")
            return;
        }
        formData.append('ProfilePictures', UserImage.current.files[0])
        await dispatch(AddProfilePicture(formData));
        await dispatch(getUser());

    }

    async function AddCover() {
        const formData = new FormData();
        if (Cover.current.files[0] === "") {
            alert('This field can not be empty')
            return;
        }
        console.log(formData);
        formData.append('CoverPhotos', Cover.current.files[0])
        await dispatch(AddCoverPicture(formData));
        await dispatch(getUser());

    }



function showConfimation(post){
    setIsClicked(true)
    setselectedPost(post)
}


    return (<>
        {User ? (<>
            {/* main div */}
            <div className="relative min-h-screen  ">
                {/* div containing cover and profilePic */}
                <div className=" ">
                    {/* coverPhoto div with choose and upload button */}
                    <div className=" h-40  flex items-center justify-evenly p-1 my-3">
                        <img className="h-full w-4/5" src={User.coverPhoto} />
                        {/* div containing the input and button */}
                        <div className="flex flex-col items-center justify-center gap-2">
                            <label htmlFor="file-upload" className="file-upload-label inline-block w-5 h-5 rounded-full bg-green-600 text-black text-center cursor-pointer font-extrabold text-lg">
                            <BiPlus />
                                <input ref={Cover} id="file-upload" type="file" className="bg-white text-xs file-upload-input hidden " />
                            </label>
                            <button onClick={AddCover} className="px-1 tex-black  font-bold rounded-xl bg-green-500 ">AddCover</button>
                        </div>
                    </div>
                    {/* profilePhoto div with choose and upload button ++ User Name and email below*/}
                    <div className="  flex flex-col items-normal justify-center gap-2  my-3">
                        {/* div for profileimage and buttons */}
                        <div className="  flex flex-col items-start justify-evenly p-1">
                            <div className=" h-28 w-full flex  items-start justify-between gap-2 px-1">
                                <div className="h-full">
                                    <img className="h-full " src={User.image} />
                                </div>
                                {/* div containing the input and button */}
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <label htmlFor="file-upload" className="file-upload-label inline-block w-5 h-5 rounded-full bg-green-600 text-black text-center cursor-pointer font-extrabold text-lg">
                                        <BiPlus />
                                        <input ref={UserImage} id="file-upload" type="file" className="w-24 text-xs file-upload-input hidden " />
                                    </label>

                                    <button onClick={AddImage} className="px-1 tex-black  font-bold rounded-xl bg-green-500">AddProfile</button>
                                </div>

                            </div>

                            {/* div for username and email */}
                            <div className="flex flex-col items-start justify-self-center text-gray-300">
                                <span>{User.username}</span><span>{User.email}</span>
                            </div>
                        </div>
                        {/* container for the mapped posts */}
                        <div className=" grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-lg:gap-2">
                            {User.posts.map((post) => {
                                return <>

                                    <div key={post._id} onMouseOverCapture={() => {setMouseOver(true)
                                        setHoverdPost(post)
                                    }} onMouseOutCapture={() => setMouseOver(false)} className=" relative border border-teal-400 m-auto text-white flex flex-col p-1 flex-wrap max-w-52 bg-[#1e1e1e] rounded-xl  max-lg:text-xs max-lg:w-32">
                                        {mouseOver === true && post._id===hoveredPost._id? <span className="absolute m-auto text-yellowe font-bold text-lg right-5 top-5"> <MdClose color="red" onClick={() =>showConfimation(post) } /></span> : null}                                        <img className="max-h-44 max-lg:h-10 rounded-xl" src={post.images} alt="" />

                                        <span className="border-t border-teal-400 font-bold">Mood:{post.Mood !== "" ? post.Mood : 'mood'}</span>
                                        <span className="border-t border-teal-400 font-bold">title:{post.title}</span>
                                        <span className="border-t border-teal-400 font-bold">caption:{post.caption}</span>
                                    </div>


                                </>
                            })}
                        </div>
                        {isClicked===true&&selectedPost?<ConfirmBox selectedPost={selectedPost}  setIsClicked={setIsClicked}/>:null}

                    </div>
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