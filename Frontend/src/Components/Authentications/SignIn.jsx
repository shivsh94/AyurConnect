import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!user.email || !user.password){
        return toast.error("Please fill all the fields");
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signin`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/registration");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        // Fallback for unexpected errors
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-[100vh] bg-black flex items-center justify-center ">
      <div className="w-full md:w-[60vh] h-[70vh] bg-black  px-10 md:px-0">
        <h1 className="text-4xl font-medium text-white tracking-tighter mb-4">
          Sign in
        </h1>
        <h3 className="text-white font-medium text-sm">
          See your growth and get consulting support!
        </h3>
        <button className="flex items-center justify-center border gap-2 rounded-full w-full py-2 mt-10 bg-indigo-100 hover:bg-indigo-300 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none">
          <div className="bg-black p-2  rounded-full">
            <svg className="w-4" viewBox="0 0 533.5 544.3">
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </svg>
          </div>
          <a
            className="whitespace-nowrap bg-transparent text-black"
            href="http://localhost:8000/auth/google"
          >
            Sign in with Google
          </a>
        </button>
        <div className="flex mt-6 items-center">
          <div className="w-1/4 h-[1px] bg-slate-300"></div>
          <h4 className="p-4 text-gray-300 ">or Sign in with Email</h4>
          <div className="w-1/4 h-[1px] bg-slate-300"></div>
        </div>
        <div>
          <form onSubmit={onSubmit} action="">
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              className="border w-full text-black rounded-full pl-6 p-3 mt-4"
              placeholder="Email"
            />
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              className="border w-full text-black rounded-full pl-6 p-3 mt-4"
              placeholder="Password"
            />
            <div className="flex  mt-5 justify-between items-center">
              <div className="flex gap-3 justify-between">
                <input className="accent-indigo-400" type="checkbox" />
                <span className="text-white">Remember me</span>
              </div>
              <div>
                <a
                  href="/"
                  className="text-indigo-300 hover:text-indigo-400 transition-all duration-300 ease-in-out"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 rounded-full  text-white p-2 mt-4  hover:bg-indigo-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none "
            >
              Sign in
            </button>
          </form>
          <div className="mt-5 text-white">
            <span>Not Registered yet?</span>
            <a
              href="/signup"
              className="text-indigo-300 hover:text-indigo-400 transition-all duration-300 ease-in-out ml-2"
            >
              Create an Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
