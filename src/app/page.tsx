"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import homeImage2 from "../../public/home2.png";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-100 text-gray-900 px-6 md:px-12">
      {/* Container for Image and Text Together */}
      <motion.div
        className="flex flex-row items-center bg-white p-10 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Side - Image */}
        <Image
          src={homeImage2}
          alt="Home Illustration"
          className="w-48 h-48 md:w-72 md:h-72 object-cover rounded-lg shadow-lg mr-8"
        />

        {/* Right Side - Welcome Message */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to SpiritX!</h1>
          <p className="text-lg text-gray-600 mb-6">Please select your role to proceed.</p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => router.push("/user/auth/login")}
            >
              User Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={() => router.push("/admin/auth/login")}
            >
              Admin Login
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
