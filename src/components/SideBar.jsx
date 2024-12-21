import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom';

const SideBar = ({ hide_Sidebar }) => {
  return <>

    <div className="fixed right-0 top-0 z-20  bg-white w-56 h-full text-black flex items-center justify-start flex-col font-serif font-bold gap-3">
      <ul className='absolute left-3 top-3'>
        <IoMdClose size={32} onClick={hide_Sidebar} />
      </ul>
      <ul className='mt-12 hover:bg-black hover:text-white w-full text-center p-1'>
        <Link className="text-l font-bold" to="/">
          Feed
        </Link>
      </ul>
      <ul className='hover:bg-black hover:text-white w-full text-center p-1'> <Link to="/playlist"> Playlist</Link></ul>
      <ul className='hover:bg-black hover:text-white w-full text-center p-1'> <Link to="/createPost"> CreatePost</Link></ul>
      <ul className='hover:bg-black hover:text-white w-full text-center p-1'> <Link to="/Account"> Account</Link></ul>
      <ul className='hover:bg-black hover:text-white w-full text-center p-1'> <Link to="/musicPlayer"> Songs</Link></ul>
    </div>

  </>
}


export default SideBar;