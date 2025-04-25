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
    <form className=" flex flex-col-reverse gap-4 items-center justify-center h-screen bg-black ">


      <div
        className=" relative bg-black/80 flex items-center h-fit gap-5 font-semibold text-md  text-white  justify-between  flex-col p-3 shadow-2xl shadow-sky-900 rounded-lg w-[90%] md:w-3/5 mb-3
        "
      >
        
        <h1 className="font-semibold text-2xl underline">Create an Account</h1>
        <span className="text-gray-500 text-sm text-center my-2">Enter your credentials below to create your account</span>

        {/* Name field  */}
        <div className="w-full">
          <span className="font-medium text-md">Choose a username</span>
          <input ref={name}
            placeholder="John_Doe"
            className="w-full px-2   rounded-xl text-black transition-all p-2"
            type="text"
            pattern="^\S*$"
            title="no spaces allowed"
            required
          />
        </div>
        {/* Email fiels */}
        <div className="w-full">
          <span className="font-semibold text-md">Your Email </span>
          <input ref={mail}
            placeholder="JohnDoe@gmail.com"
            className="w-full px-2   rounded-xl text-black transition-all p-2"
            type="text"
            pattern="^\S*$"
            title="no spaces allowed"
            required
          />
        </div>
        {/* password field  */}
        <div className="w-full relative">
          <span className="font-semibold text-md">Password</span>
          <input ref={pass}
            placeholder="your password"
            className="w-full px-2   rounded-xl text-black transition-all p-2"
            type={!isVisible ? "password" : "text"}
            pattern="^\S*$"
            title="no spaces allowed"
            required
          />
          <button onClick={TogglePassword} type="button"> {isVisible === false ? <FaEye className="absolute right-3 top-7" />
            : <FaEyeSlash className="absolute right-3 top-7" />}</button>
        </div>


        {condition === 'Creating your account' ? <button  className="bg-sky-500 hover:bg-sky-400 text-black font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black  transition-all animate-pulse">
          Creating your Account
        </button> : <button onClick={handleSignup} className="bg-gradient-to-br from-indigo-600 to-purple-600 font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black  transition-all">
          Sign up with Email
        </button>}
        <p>already have an account <Link to='/' className="text-sky-600 underline" >
          Login
        </Link></p>
        <p className="underline text-sm text-gray-600 text-center ">
            By clicking continue , you agree to our Terms of Service and Privacy
            Policy
          </p>
        
      </div>
    </form>
  );
};
export default SignupPage;
