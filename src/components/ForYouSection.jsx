import { useState } from "react";
import Albums from "./Albums";

const ForYou = () => {
const smallScreen = window.innerWidth;
  // a state to manage the current categories available
  const [categories, setCategories] = useState([
    { id: 0, name: 'hip-hop', cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL2iTNbdMs1pvR5DQJ_g3otFh7JkQrZsaZbw&s" },
    { id: 1, name: 'pop', cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIFZP7MJvMV87ih8Yusge2hGZyhNIJrfmRA&s" },
    { id: 2, name: 'rock', cover: "https://i1.sndcdn.com/artworks-000102769935-nkultb-t500x500.jpg" },
    { id: 3, name: 'phonk', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0TB2bmJm8xRCxwkGU8A4VcT-noCIfzpVtcQ&s' },
    
  ]);

  return (
    <>
   <div className="bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md  p-2 shadow-xl shadow-black  rounded-xl my-3 flex items-center justify-center hover:border-b hover:border-teal-400 flex-wrap gap-3 ">
      <Albums categories={categories} />
    </div>
    </>
  );
};
export default ForYou;
