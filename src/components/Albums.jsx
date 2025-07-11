import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchGenre } from "../store/musicSlice";
import { Link } from "react-router-dom";

const Albums = ({ categories }) => {
  const dispatch = useDispatch();



  const [hoveredCategory, setHoveredCategory] = useState(null);

 

  async function ChooseCategory(category) {
    if (category.name === 'hip-hop') {
      const genre = category.name;
       dispatch(fetchGenre(genre))
      return
    } else if (category.name === "pop") {
      const genre = category.name;
       dispatch(fetchGenre(genre))
      return
    } else if (category.name === "rock") {
      const genre = category.name;
       dispatch(fetchGenre(genre))
      return;
    } else if (category.name === 'phonk') {
      const genre = category.name;
       dispatch(fetchGenre(genre))
      return;
    }
  }

  return (
    <>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => ChooseCategory(category)}
          onMouseOver={()=>setHoveredCategory(category)}
          onMouseLeave={()=>setHoveredCategory(null)}
          className="relative bg-gray-300 h-28 w-28 rounded-full flex items-center justify-center hover:border hover:border-teal-400 max-lg:h-20 max-lg:w-20 max-lg:text-xs"
        >
         
            <div className={`${hoveredCategory===category?"opacity-80":"opacity-0"} transition-all duration-200`}>
              <Link to="/Genre">
                <button
                  className={` absolute flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-teal-400 text-black font-bold text-md right-9 bottom-2 z-10 `}
                >
                  <FaPlay />
                </button>
              </Link>
              <span className="text-center text-purple-900 bg-white py-1 text-md  font-bold absolute top-3   opacity-100 px-2 rounded-lg">
                {category.name}
              </span>
              <div className="absolute  h-full w-full rounded-full cursor-pointer opacity-0 ">

              </div>
            </div>
         
          <img
            className="rounded-full h-full w-full "
            src={category.cover}
            alt="for u"
          />
        </div >
      ))}
    </>
  );
};

export default Albums;
