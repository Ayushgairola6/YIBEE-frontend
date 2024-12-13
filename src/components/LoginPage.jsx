import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginRqst } from "../store/AuthSlice";
import { useRef } from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingCircle from "./LoadingCircle";

const Login = () => {
  const [empty, setEmpty] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const loginState = useSelector(state => state.auth.loginStatus);
  const dynamicClass = loginState === "Looks like there is some server issue" ? 'text-red-700' : 'text-blue-700';

  const mail = useRef();
  const pass = useRef();
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault();
    const LoginData = {
      email: mail.current.value,
      password: pass.current.value,
    }
    if (mail.current.value === "" || pass.current.value === "") {
      
        setEmpty("All fields are mandatory");
      
      return;
    }
    dispatch(LoginRqst(LoginData));
  }

   function TogglePassword() {
    setIsVisible(!isVisible);
  }


  return (
    <>
      <form className=" flex flex-col-reverse gap-4 items-center justify-center h-full bg-gradient-to-br from-black to-gray-500 w-screen">

        <div
          className="bg-slate-300 flex items-center h-fit gap-5 font-semibold text-md border-2 border-black
      shadow-lg shadow-black  justify-between  flex-col p-3 "
        >
          <h1 className="font-semibold text-2xl underline">
            Login to an existing Account
          </h1>
          <div className="flex items-center justify-between gap-20 s">
            <span className="text-red-600">{empty}</span>
            <span className={`${dynamicClass}`}>Status:{loginState}</span>
          </div>

          <div className="w-full">
            <span>Email Address</span>
            <input ref={mail}
              placeholder="Nameexample@gmail.com"
              className="w-full px-2 focus:border-2 focus:ring"
              type="email"
               pattern="^\S*$"
              title="no spaces allowed"
              required
            />
          </div>
          <div className="w-full relative ">
            <span>Your Password</span>
            <input ref={pass}
              placeholder="must contain special characters"
              className=" w-full px-2 focus:border-2 focus:ring flex items-center justify-between "
              type={!isVisible?"password":"text"}
              pattern="^\S*$"
              title="no spaces allowed"
              required
            />
            <button onClick={TogglePassword} type="button"> {isVisible === false ? <FaEye  className="absolute right-3 top-7" />
              : <FaEyeSlash className="absolute right-3 top-7" />}</button>
          </div>

          {loginState=== ' please wait...'?<LoadingCircle />:<button onClick={handleLogin} className="bg-black text-white font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black hover:scale-105">
            Login
          </button>}


          <p className="underline ">
            By clicking continue , you agree to our Terms of Service and Privacy
            Policy
          </p>
        </div>
        <div className=" right-8 top-5 flex flex-col items-center justify-center  ">
          <span className="text-white font-semibold text-md underline  ">
            Dont't have an Account
          </span>
          <Link to="/signup" className="bg-black text-center text-white font-semibold w-full text-sm p-2 rounded-lg hover:border-white hover:border-2 ">
            Signup
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
