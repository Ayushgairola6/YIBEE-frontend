import { useState } from "react";
import Albums from "./Albums";

const ForYou = () => {
const smallScreen = window.innerWidth;
  // a state to manage the current categories available
  const [categories, setCategories] = useState([
    { id: 0, name: 'hip-hop', cover: "src/assets/1900x1900-000000-80-0-0.jpg" },
    { id: 1, name: 'pop', cover: "src/assets/40fc44111ee181aaf33e8e1e800ddb6e.jpg" },
    { id: 2, name: 'rock', cover: "src/assets/HD-wallpaper-arjith-singh-bollywood-singer_63aabf4433151.jpg" },
    { id: 3, name: 'phonk', cover: '' },
    
  ]);

  return (
    <>
   <div className="bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md  p-2 shadow-xl shadow-black  rounded-xl my-3 flex items-center justify-between hover:border-b hover:border-teal-400 flex-wrap gap-5 ">
      <Albums categories={categories} />
    </div>
    </>
  );
};
export default ForYou;
