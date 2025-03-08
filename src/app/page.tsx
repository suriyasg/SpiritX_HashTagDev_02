"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import homeImage from "../../public/home.jpg";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState("");

  interface HandleSelectionProps {
    selectedRole: string;
  }

  const handleSelection = ({ selectedRole }: HandleSelectionProps) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    if (selectedRole === "admin") {
      router.push("/admin/auth/login");
    } else if (selectedRole === "user") {
      router.push("/user/auth/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-6">
      <motion.div
        className="text-center bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={homeImage}
          alt="Welcome"
          className="w-40 h-40 mx-auto mb-6 rounded-full shadow-md"
        />
        <h1 className="text-3xl font-bold mb-4">Welcome to Spirit11!</h1>
        <p className="text-lg text-gray-600 mb-6">Please select your role to proceed.</p>
        
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => handleSelection({ selectedRole: "user" })}
          >
            User Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => handleSelection({ selectedRole: "admin" })}
          >
            Admin Login
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
