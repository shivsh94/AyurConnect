import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const location = useLocation();
  const userEmail = location.state?.email;

  const navigate = useNavigate();

  // Handle OTP form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!otp || otp === "") {
        toast.error("Please enter OTP");
        return;
      }
      const res = await axios.post(
        `http://localhost:5143/api/v1/user/check-otp`,
        { otp, email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        navigate("/registration");
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setOtp("");
  };

  // Handle Get OTP click
  const handleGetOtp = async () => {
    try {
      // Simulate an API call for sending OTP
      await axios.post(
        `http://localhost:5143/api/v1/user/send-otp`,
        { email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("OTP sent successfully");
      setIsButtonDisabled(true);
      setTimer(60); // Start 1-minute timer
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false); // Enable button when timer ends
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      <div className="min-h-screen bg-black text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-black shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-black flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl text-white bg-black font-extrabold">
              OTP - Verification
            </h1>
            <div className="w-full flex-1 bg-black bg-transparent mt-8">
              <div className="max-w-full bg-black">
                <div className="w-full h-fit grid grid-cols-3 bg-black mt-5">
                  <input
                    className="w-full col-span-2 px-8 py-4 rounded-l-full font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 border-r-0 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={handleGetOtp}
                    disabled={isButtonDisabled}
                    className={`rounded-r-full text-white bg-indigo-500 border border-l-0 border-indigo-400 hover:bg-indigo-600 transition-all duration-300 ease-in-out ${
                      isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isButtonDisabled ? `Wait ${timer}s` : "Get OTP"}
                  </button>
                </div>

                <button
                  onClick={onSubmit}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-full hover:bg-indigo-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <MdVerified size={20} />
                  <span className="ml-3 bg-transparent">Get Verified</span>
                </button>
                <p className="mt-6 text-xs text-gray-400 text-center bg-transparent">
                  I agree to abide by templatana's &nbsp;
                  <a
                    href="#"
                    className="border-b bg-black border-gray-300 border-dotted"
                  >
                    Terms of Service
                  </a>
                  &nbsp; and its &nbsp;
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

export default OtpPage;
