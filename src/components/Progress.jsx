import { useDispatch,useSelector } from "react-redux";

import { useRef } from "react";


const Progress = () => {

  const dispatch = useDispatch();
  const audioRef = useRef();
  const isPlaying = useSelector((state)=>state.isPlaying)






  
 
  return (
    <>
      {/* <div  className="w-full  flex items-center justify-center p-2">
        <input onChange={handleSeek}   min="0" max="1" type="range"  step="0.01" className="w-2/3" />
        <audio  ref={audioRef} src="{currSong.audioUrl}">{isPlaying?"play":"pause"}hello</audio>
      
      </div> */}
    </>

  );
};
export default Progress;
