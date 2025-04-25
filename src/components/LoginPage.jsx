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
      return;
    }
    dispatch(LoginRqst(LoginData));
  }

  function TogglePassword() {
    setIsVisible(!isVisible);
  }


  return (
    <>
      <form className="h-screen  gap-4 flex items-center justify-center bg-black text-white">

        <div
          className=" flex items-center h-fit gap-5 font-semibold text-md 
      shadow-2xl shadow-sky-900  justify-between  flex-col p-3 rounded-lg  w-[90%] md:w-3/5 mb-3 "
        >
          <section className="w-full text-center">
            <h1 className="font-semibold w-full text-2xl shadow-md">
              Welcome Back
            </h1>
            <span className="text-sm text-center  w-full bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 ">Lets jam together</span>
          </section>



          <div className="w-full">
            <span>Email Address</span>
            <input ref={mail}
              placeholder="JohnDoe@gmail.com"
              className="w-full px-2   rounded-xl text-black transition-all p-2"
              type="email"
              pattern="^\S*$"
              title="no spaces allowed"
              required
            />
          </div>
          <div className="w-full relative ">
            <span>Your Password</span>
            <input ref={pass}
              placeholder="Your password"
              className=" w-full px-2   rounded-xl text-black transition-all p-2 "
              type={!isVisible ? "password" : "text"}
              pattern="^\S*$"
              title="no spaces allowed"
              required
            />
            <button onClick={TogglePassword} type="button"> {isVisible === false ? <FaEye className="absolute right-3 top-7" />
              : <FaEyeSlash className="absolute right-3 top-7" />}</button>
          </div>

          {loginState === ' please wait...' ? <button className="bg-black text-white font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black hover:scale-105 animate-pulse">Please wait..</button> : <button onClick={handleLogin} className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black transition-all ">
            Login
          </button>}
          <p className="text-gray-300 text-md">Don't have an account <Link to='/signup' className="text-sky-600 underline" >
            Signup
          </Link></p>

          <p className="underline text-sm text-gray-600 text-center ">
            By clicking continue , you agree to our Terms of Service and Privacy
            Policy
          </p>
        </div>

      </form>
    </>
  );
};

export default Login;
