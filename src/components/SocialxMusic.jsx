import ForYou from "./ForYouSection";
import Musicplayer from "./MusicPlayer";
import SocialMedia from "./SocialMedia";

const Display = () => {
  return (
    // this is the main container
    <div
      className=" h-screen max-h-screen grid grid-cols-2  
     my-5 px-7 "
    >
      {/* this container contains social media part */}

      <SocialMedia></SocialMedia>

      {/* this  is the music player part  */}
      <div className="py-1 px-1 h-screen w-full ">
        <Musicplayer></Musicplayer>
        <ForYou></ForYou>
      </div>
      
    </div>
  );
};
export default Display;
