import { IoMdClose, IoMdMusicalNote } from 'react-icons/io'
import { Link } from 'react-router-dom';
import { CiSignpostDuo1, CiHeart } from "react-icons/ci";
import { MdOutlinePostAdd, MdAccountCircle } from "react-icons/md";
const SideBar = ({ hide_Sidebar, visible }) => {
  return <>

    <div onClick={hide_Sidebar} className={` fixed left-0 top-0 z-20 ${visible ? "translate-x-0" : "-translate-x-full"}
  bg-black border-r border-indigo-700 w-56 h-full text-black flex items-center justify-start flex-col font-serif
   font-bold gap-3 transition-all duration-200 md:hidden lg:hidden`}>
      <ul className='absolute right-3 top-3 hover:animate-bounce duration-700 '>
        <IoMdClose color='white' size={22} />
      </ul>
      <Link to="/" className='mt-12  text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 transition-all 
      flex items-center justify-start gap-3'>
        <CiSignpostDuo1 />
        <ul className=" font-bold " >
          Feed
        </ul>
      </Link>
      <Link to="/playlist" className=' text-gray-300 hover:bg-black  hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all'><CiHeart />
        <ul > Playlist</ul>
      </Link>
      <Link to="/createPost" className=' text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all'> <MdOutlinePostAdd /><ul > CreatePost</ul></Link>
      <Link to="/Account" className=' text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all '><MdAccountCircle />
        <ul > Account</ul>
      </Link>
      <Link to="/musicPlayer" className=' text-gray-300 hover:bg-black hover:text-indigo-600 w-full text-center p-1 px-4 flex
      
      items-center justify-start gap-3 transition-all'> <IoMdMusicalNote /><ul > Songs</ul></Link>
    </div>

  </>
}


export default SideBar;