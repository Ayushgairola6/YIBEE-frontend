import PostCard from "./HomePagePostCard";

const SocialMedia = () => {
 


  return (
    <>
      {/* this is the container that contains social media posts  */}
      <div className=" h-screen  max-h-screen p-2 overflow-y-auto hide-scrollbar ">
        <PostCard />
      </div>

    </>
  );
};
export default SocialMedia;
