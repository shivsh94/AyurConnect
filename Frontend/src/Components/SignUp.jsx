import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const [user, setUser] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post(`http://localhost:5143/api/v1/user/signup`, user,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
       });
       
       if (res.data.success) {
          navigate("/SignIn");
         toast.success(res.data.message);
         }

    } catch (error) {
      // console.log(error); 
      toast.error("error.response.data.message");
    }
    setUser({
      email: "",
      // otp: "",
      password: "",
      confirmPassword: "",
    });
    };

  return (
    <div>
      <div className="min-h-screen bg-black text-gray-900 flex justify-center">
        <div className="max-w-screen-xl  m-0 sm:m-10 bg-black shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-black  flex flex-col items-center ">
            <h1 className="text-2xl xl:text-3xl text-white bg-black font-extrabold">
              Sign up
            </h1>
            <div className="w-full flex-1 bg-black bg-transparent mt-8">
              <div className="flex flex-col items-center bg-black">
                <button className="w-full font-bold shadow-sm rounded-full bg-black py-3 bg-indigo-100 text-gray-800 flex items-center justify-center hover:bg-indigo-300 transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="  p-2 rounded-full bg-black">
                    <svg className="w-4 bg-transparent" viewBox="0 0 533.5 544.3">
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
                  <span className="ml-4 bg-transparent text-gray-600">Sign Up with Google</span>
                </button>
              </div>

              <div className="flex mt-6 justify-center items-center bg-black">
                <div className="w-full  h-[1px]   bg-black"></div>
                <h4 className="p-4 shrink-0 text-gray-300 bg-black tracking-tighter">
                  or Sign in with Email
                </h4>
                <div className="w-full h-[1px]  bg-slate-300"></div>
              </div>

              <div className=" max-w-full bg-black">
                <input 
                value={user.email} 
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-8 py-4 rounded-full  font-medium bg-gray-100 border text-black border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                />
                <div className="w-full h-fit grid grid-cols-3 bg-black mt-5">
                  <input
                    className="w-full col-span-2 px-8 py-4 rounded-l-full font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 border-r-0 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Otp"
                  />
                  <button className=" rounded-r-full text-white     bg-indigo-500 border border-l-0 border-indigo-400  hover:bg-indigo-600 transition-all duration-300 ease-in-out">
                    Get OTP
                  </button>
                </div>
                <input
                value={user.password} 
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full px-8 py-4 rounded-full font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                />
                <input
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  className="w-full px-8 py-4 rounded-full text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button onClick={onSubmit} className="mt-5 tracking-wide font-semibold  bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2 bg-transparent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3 bg-transparent">Sign Up</span>
                </button>
                <div className="mt-5 text-white bg-transparent">
                  <span className="bg-transparent">Already have an account ?</span>
                  <a
                    href="/SignIn"
                    className=" bg-transparent text-indigo-300 hover:text-indigo-400 transition-all duration-300 ease-in-out ml-2"
                  >
                    Sign in
                  </a>
                </div>
                <p className="mt-6 text-xs text-gray-400 text-center bg-transparent">
                  I agree to abide by templatana's 
                  <a
                    href="#"
                    className="border-b bg-black border-gray-300 border-dotted"
                  >
                     Terms of Service
                  </a>
                  and its 
                  <a
                    href="#"
                    className="border-b bg-black border-gray-300 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

 