"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../../../../../public/login.png";
import { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "../../../../utils/notify";
import { adminLogin } from "@/services/authServices";

export default function AdminLogin() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!adminName || !password) {
      toastError("Fill all Fields");
      return;
    }

    setIsLoggingIn(true);
    try {
      const response = await adminLogin(adminName, password); // Await the login function

      if (response === "SUCCESS") {
        // Check if the login was successful
        toastSuccess("Login Success");
        router.push("/admin/dashboard");
      } else {
        toastError("Invalid Credentials");
      }
    } catch (error) {
      toastError("Login Failed");
      console.error("Login Failed", error);
    } finally {
      setIsLoggingIn(false); // Ensure this runs even if an error occurs
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden p-8">
        {/* Left Side - Image (Hidden on small screens) */}
        <motion.div
          className="hidden md:flex w-1/2 justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={loginImage}
            alt="AdminLogin"
            className="w-60 h-60 object-cover"
          />
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-green-500 text-3xl font-semibold mb-6 text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Login
          </motion.h2>

          {/* Username input */}
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-4 border rounded-lg mb-6 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />

          {/* Password input */}
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            className={`w-full bg-green-500 text-white py-4 rounded-lg transition-transform transform mt-4 ${
              isLoggingIn
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600 hover:scale-105"
            }`}
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}
