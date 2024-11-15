import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Signup, log } from "../store/AuthSlice";
import { useRef, useState } from "react";
import axios from "axios";
const SignupPage = () => {

  const [empty, setEmpty] = useState(null);
  const [AccountStatus, setStatus] = useState('In progress');
  const name = useRef();
  const mail = useRef();
  const pass = useRef();

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

  return (
    <form className="relative flex items-center justify-center h-full bg-gradient-to-br from-black to-gray-500 w-screen">
      <div className="absolute right-8 top-5 flex flex-col items-center justify-center  ">
        <span className="text-white font-semibold text-md underline  ">
          Already have an Account
        </span>
        <Link to='/' className="bg-black text-center text-white font-semibold w-full text-sm p-2 rounded-lg hover:border-white hover:border-2 ">
          login
        </Link>
      </div>
      <div
        className="bg-slate-300 flex items-center h-fit gap-5 font-semibold text-md border-2 border-black
      shadow-lg shadow-black  justify-between  flex-col p-3 "
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
          />
        </div>
        {/* Email fiels */}
        <div className="w-full">
          <span className="font-bold text-md">Your Email</span>
          <input ref={mail}
            placeholder="Nameexample@gmail.com"
            className="w-full px-2 focus:border-2 focus:ring-4"
            type="text"
          />
        </div>
        {/* password field  */}
        <div className="w-full">
          <span className="font-bold text-md">Password</span>
          <input ref={pass}
            placeholder="xyzxx"
            className="w-full px-2 focus:border-2 focus:ring-4"
            type="password"
          />
        </div>


        <button onClick={handleSignup} className="bg-black text-white font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black hover:scale-105">
          Sign up with Email
        </button>
        {/* <span>---------OR CONTINUE WITH---------</span>
        <button className="border-2  border-gray-600 font-semibold w-full text-sm p-1 rounded-lg">
          Github
        </button>
        <button className="border-2  border-gray-600 font-semibold w-full text-sm p-1 rounded-lg">
          Google
        </button>
        <button className="border-2  border-gray-600 font-semibold w-full text-sm p-1 rounded-lg">
          LinkedIn
        </button> */}

        <p className="underline ">
          By clicking continue , you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </form>
  );
};
export default SignupPage;
