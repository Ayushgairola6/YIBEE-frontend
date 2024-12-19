import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../store/AuthSlice";
import { useRef, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingCircle from "./LoadingCircle";

const SignupPage = () => {

  const [empty, setEmpty] = useState(null);
  const name = useRef();
  const mail = useRef();
  const pass = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const condition = useSelector(state => state.auth.condition);
  const dispatch = useDispatch()
  // FUNCTION TO SUBMIT SIGNUP REQUEST
  async function handleSignup(e) {
    e.preventDefault()
    const SignupData = {
      email: mail.current.value,
      password: pass.current.value,
      username: name.current.value,
    }
    if (mail.current.value === '' || pass.current.value === '' || name.current.value === '') {
      setEmpty("all fields are mandatory");
      console.log(condition)
      return;
    }
    else {
      dispatch(Signup(SignupData));

      setEmpty(null);
    }

  }
  function TogglePassword() {
    setIsVisible(!isVisible);
  }

  return (
    <form className=" flex flex-col-reverse gap-4 items-center justify-center h-screen bg-gradient-to-br from-black to-gray-500 w-screen ">



      <div
        className=" relative bg-slate-300 flex items-center h-fit gap-5 font-semibold text-md  shadow-sm shadow-sky-500 justify-between  flex-col p-3 border-2 border-white rounded-lg w-4/5 md:w-4/5 mb-3
        "
      >
        
        <h1 className="font-semibold text-2xl underline">Create an Account</h1>
        <span>Enter your credentials below to create your account</span>
        <div className="flex items-normal justify-between gap-32">
          <span className="text-red-600 font-semibold underline ">{empty}</span>
          <span className="text-red-600 font-semibold underline "> Status:{condition}</span>
        </div>

        {/* Name field  */}
        <div className="w-full">
          <span className="font-bold text-md">Choose a username</span>
          <input ref={name}
            placeholder="Nameexample@gmail.com"
            className="w-full px-2 focus:border-2 focus:ring-4"
            type="text"
            pattern="^\S*$"
            title="no spaces allowed"
            required
          />
        </div>
        {/* Email fiels */}
        <div className="w-full">
          <span className="font-bold text-md">Your Email (example29@gmail.com)</span>
          <input ref={mail}
            placeholder="Nameexample@gmail.com"
            className="w-full px-2 focus:border-2 focus:ring-4"
            type="text"
            pattern="^\S*$"
            title="no spaces allowed"
            required
          />
        </div>
        {/* password field  */}
        <div className="w-full relative">
          <span className="font-bold text-md">Password(ex:$3D3erefe@)</span>
          <input ref={pass}
            placeholder="xyzxx"
            className="w-full px-2 focus:border-2 focus:ring-4"
            type={!isVisible ? "password" : "text"}
            pattern="^\S*$"
            title="no spaces allowed"
            required
          />
          <button onClick={TogglePassword} type="button"> {isVisible === false ? <FaEye className="absolute right-3 top-7" />
            : <FaEyeSlash className="absolute right-3 top-7" />}</button>
        </div>


        {condition === 'Creating your account' ? <LoadingCircle /> : <button onClick={handleSignup} className="bg-black text-white font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black hover:scale-105">
          Sign up with Email
        </button>}

        <p className="underline ">
          By clicking continue , you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
      <div className=" right-8 top-5 flex flex-col items-center justify-center  ">
        <span className="text-white font-semibold text-md underline  ">
          Already have an Account
        </span>
        <Link to='/' className="bg-black text-center text-white font-semibold w-full text-sm p-2 rounded-lg hover:border-white hover:border-2 ">
          login
        </Link>
      </div>
    </form>
  );
};
export default SignupPage;
