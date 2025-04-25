import { IoMdClose, IoMdMusicalNote } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { CiSignpostDuo1, CiHeart } from "react-icons/ci";
import { MdOutlinePostAdd, MdAccountCircle } from "react-icons/md";
const SideBar = ({ hide_Sidebar, visible }) => {
  return <>

    <div onClick={hide_Sidebar} className={` fixed left-0 top-0 z-20 ${visible ? "translate-x-0" : "-translate-x-full"}
  bg-black border-r border-indigo-700 w-56 h-full text-black flex items-center justify-start flex-col font-serif
   font-bold gap-3 transition-all duration-200 md:hidden lg:hidden`}>
      <ul className='absolute left-3 top-3 hover:animate-bounce duration-700 '>
        <IoMdClose color='white' size={22} />
      </ul>
      <ul className='mt-12  text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 transition-all 
      flex items-center justify-start gap-3'>
        <CiSignpostDuo1 />
        <Link className=" font-bold " to="/">
          Feed
        </Link>
      </ul>
      <ul className=' text-gray-300 hover:bg-black  hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all'><CiHeart /> <Link to="/playlist"> Playlist</Link></ul>
      <ul className=' text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all'> <MdOutlinePostAdd /><Link to="/createPost"> CreatePost</Link></ul>
      <ul className=' text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all '><MdAccountCircle /> <Link to="/Account"> Account</Link></ul>
      <ul className=' text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all'> <IoMdMusicalNote /><Link to="/musicPlayer"> Songs</Link></ul>
    </div>

  </>
}


export default SideBar;