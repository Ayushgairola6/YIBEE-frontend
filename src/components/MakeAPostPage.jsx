import CreatePost from "./CreatePostSection";
import YourMusic from "./YourMusic";
import Controls from "./Controls";
import Progress from "./Progress";
import Thumbnail from "./MusicThumbnail";

const MakePost = () => {
  return (
    <>
      {/* THE MAIN BACKGROUND CONTAINER  */}
      <div className=" w-screen flex ">
        <CreatePost></CreatePost>
      </div>
    </>
  );
};

export default MakePost;
