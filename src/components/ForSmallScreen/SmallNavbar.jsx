import { Link } from "react-router-dom";

const SmallNavbar = () => {
    return <>
        <header>
            <nav className="flex items-center justify-evenly text-white bg-transparent dark:bg-black dark:text-white">
                <ul>
                    <h1 className=" text-4xl font-bold">
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500'>YIBEE</span>
                    </h1>
                </ul>
                <ul>
                    <div className="flex items-center justify-evenly gap-2 text-xs">

                        <Link className="text-l font-bold" to="/">
                            Feed
                        </Link>
                        <Link className="text-l font-bold" to="/playlist">
                            Playlist
                        </Link>
                        <Link className="text-l font-bold" to="/createPost">
                            CreatePost
                        </Link>
                        <Link className="text-l font-bold" to="/Account">
                            Account
                        </Link>
                        <Link className="text-l font-bold" to="/musicPlayer">
                            Songs
                        </Link>
                    </div>
                </ul>
               
            </nav>
        </header>
    </>
}

export default SmallNavbar;