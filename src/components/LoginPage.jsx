import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginRqst } from "../store/AuthSlice";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";


const Login = () => {
  const [empty, setEmpty] = useState(null);
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
      setTimeout(() => {
        setEmpty("All fields are mandatory");
      }, 1000)
      return;
    }
    dispatch(LoginRqst(LoginData));
  }


  return (
    <>
      <form className="relative flex items-center justify-center h-full bg-gradient-to-br from-black to-gray-500 w-screen">
        <div className="absolute right-8 top-5 flex flex-col items-center justify-center  ">
          <span className="text-white font-semibold text-md underline  ">
            Dont't have an Account
          </span>
          <Link to="/signup" className="bg-black text-center text-white font-semibold w-full text-sm p-2 rounded-lg hover:border-white hover:border-2 ">
            Signup
          </Link>
        </div>
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
            />
          </div>
          <div className="w-full">
            <span>Your Password</span>
            <input ref={pass}
              placeholder="must contain special characters"
              className="w-full px-2 focus:border-2 focus:ring flex items-center justify-between"
              type="password"
            />
          </div>

          <button onClick={handleLogin} className="bg-black text-white font-semibold w-full text-sm p-2 rounded-lg shadow-md shadow-black hover:scale-105">
            Login
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
    </>
  );
};

export default Login;
