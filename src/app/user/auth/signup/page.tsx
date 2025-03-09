"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import signupImage from "../../../../../public/signup.jpg";

export interface UserInputData {
  username: string;
  password: string;
}


export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateUsername = (value: string) =>
    value.length < 8 ? "Username must be at least 8 characters long" : "";

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return !regex.test(value)
      ? "Password must contain one uppercase, one lowercase, and one special character"
      : "";
  };

  const validateConfirmPassword = (value: string) =>
    value !== password ? "Passwords do not match" : "";

  const handleSignup = async () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({ username: usernameError, password: passwordError, confirmPassword: confirmPasswordError });

    if (usernameError || passwordError || confirmPasswordError) return;

    const response  = await fetch("/api/auth/user/signup",{method:"POST" , headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password} as UserInputData) });
    if(response.ok){
        router.push("/user/dashboard");
        console.log("Signup successful with username:", username);
    }else{
      console.log("signup failed");
    }


    

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="flex flex-col md:flex-row w-full md:w-[800px] bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-8">
        <motion.div
          className="hidden md:flex w-1/2 justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={signupImage} alt="Signup" className="w-60 h-60 object-cover" />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-green-500 text-3xl font-semibold mb-6 text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             User SignUp
          </motion.div>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg mb-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username}</p>}

          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="absolute right-3 top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <div className="relative w-full mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="absolute right-3 top-3 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}

          <button
            className="w-full text-white py-3 rounded-lg transition-transform transform hover:scale-105 mt-4 bg-green-500 hover:bg-green-600"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => router.push("/user/auth/login")}>
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
