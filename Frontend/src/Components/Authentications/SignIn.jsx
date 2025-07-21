import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { MdVerified } from "react-icons/md";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");

  const { loginUser, isLoading } = useAuth();
  const navigate = useNavigate();

  // Handle login form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !user.password) {
        return toast.error("Please fill all the fields");
      }

      const result = await loginUser(user.email, user.password);
      
      if (result.success) {
        if (result.user.isDoctor) {
          navigate("/doctor/Docdashboard");
        } else {
          navigate("/patient/dashboard");
        }
      } else if (result.message === "Email is not verified") {
        // If backend says email is not verified, show OTP input
        setShowOtp(true);
        setEmailForOtp(user.email);
        toast("Please verify your email with OTP");
      } else if (result.message === "User does not exist") {
        // New user flow - show OTP for registration
        setShowOtp(true);
        setEmailForOtp(user.email);
        setStoredPassword(user.password); // Store password for later use
        setIsNewUser(true);
        toast("Welcome! Please verify your email to continue");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "Email is not verified") {
          setShowOtp(true);
          setEmailForOtp(user.email);
          toast("Please verify your email with OTP");
        } else if (error.response.data.message === "User does not exist") {
          // New user flow - show OTP for registration
          setShowOtp(true);
          setEmailForOtp(user.email);
          setStoredPassword(user.password); // Store password for later use
          setIsNewUser(true);
          toast("Welcome! Please verify your email to continue");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    setUser({
      email: "",
      password: "",
    });
  };

  // Handle OTP form submit
  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!otp || otp === "") {
        toast.error("Please enter OTP");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/verifyEmail`,
        { otp, email: emailForOtp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setShowOtp(false);
        setOtp("");

        if (isNewUser) {
          // For new users, show registration form or auto-login
          toast.success("Email verified! You can now login.");
          setIsNewUser(false);
        } else {
          // For existing users, try to login again
          const loginResult = await loginUser(emailForOtp, storedPassword);
          if (loginResult.success) {
            if (loginResult.user.isDoctor) {
              navigate("/doctor/Docdashboard");
            } else {
              navigate("/patient/dashboard");
            }
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to verify OTP");
      }
    }
  };

  // Handle resend OTP
  const handleGetOtp = async () => {
    try {
      setIsButtonDisabled(true);
      setTimer(60);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/send-otp`,
        { email: emailForOtp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send OTP");
      }
    }
  };

  // Timer effect for resend OTP button
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsButtonDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {!showOtp ? (
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={onOtpSubmit}>
            <div className="text-center">
              <MdVerified className="mx-auto h-12 w-12 text-green-600" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Email Verification Required
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please enter the OTP sent to {emailForOtp}
              </p>
            </div>

            <div>
              <label htmlFor="otp" className="sr-only">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={handleGetOtp}
                disabled={isButtonDisabled}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isButtonDisabled
                  ? `Resend OTP in ${timer}s`
                  : "Resend OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtp(false);
                  setOtp("");
                  setIsNewUser(false);
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignIn;
