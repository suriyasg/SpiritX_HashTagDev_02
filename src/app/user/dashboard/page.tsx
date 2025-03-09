"use client";
import { useEffect, useState } from "react";
import { User } from "../../../../datamodel/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { tokendata } from "@/app/api/auth/user/login/route";

const Page = () => {
  const [userid, setuserid] = useState<string>();
  const [currUser, setcurrUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    async function extractcookie() {
      const response = await fetch("/api/auth/user/readusercookie");
      const data = (await response.json()) as tokendata;
      setuserid(data?.user_id || "");
    }
    extractcookie();
  }, []);

  useEffect(() => {
    async function getuserdetails() {
      if (!userid) return;
      const response = await fetch("/api/getUserById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userid }),
      });
      if (response.ok) {
        const data = await response.json();
        setcurrUser(data.result);
      }
    }
    getuserdetails();
  }, [userid]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 transform transition-all duration-500 ease-in-out hover:scale-105">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src="/userdash.png" alt="User Dashboard" width={300} height={300} className="rounded-lg shadow-lg" />
        </div>

        {/* Right Side - User Details */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="text-2xl font-semibold text-gray-800 tracking-wide flex items-center justify-center md:justify-start">
            👋 Hello, <span className="ml-2 text-blue-600">{currUser?.username}!</span>
          </div>
          <div className="text-lg text-gray-700 mt-2 flex items-center">
            💰 Your current balance: <span className="ml-2 font-semibold text-blue-500">${currUser?.money}</span>
          </div>
          <div className="text-lg text-gray-700 mt-2 flex items-center">
            🏏 Players in your team: <span className="ml-2 font-semibold text-blue-500">{currUser?.player_ids?.length || 0}</span> / 11
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={() => router.push("/user/dashboard/players")}
            >
              🏆 View Available Players
            </button>
            <button
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={() => router.push("/user/dashboard/leaderboard")}
            >
              📊 View Leaderboard
            </button>
            <button
              className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={() => router.push("/user/dashboard/budget")}
            >
              💵 View Budget
            </button>
            <button
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={() => router.push("/user/dashboard/team")}
            >
              🎯 View Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;