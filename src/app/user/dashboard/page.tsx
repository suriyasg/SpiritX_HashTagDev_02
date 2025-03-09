"use client";
import { useEffect, useState } from "react";
import { User } from "../../../../datamodel/types";
import { useRouter } from "next/navigation";
import { tokendata } from "@/app/api/auth/user/login/route";
import { NextResponse } from "next/server";
export const currUser: User = {
  user_id: "string",
  username: "pratheep",
  password: "",
  money: 200000000,
  player_ids: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
};


const Page = () => {
  const [userid,setuserid] = useState<string>();
  const [currUser,setcurrUser] = useState<User>();
  const router = useRouter();
  useEffect(()=>{
    async function extractcookie() {
      const response = await fetch("/api/auth/user/readusercookie")
      const data = await response.json() as tokendata;
      console.log(data);
      return data === null ? "" : setuserid(data.user_id)
      
    }
    extractcookie();
  },[])
  useEffect(()=>{
    async function getuserdetails() {
      const response:Response  = await fetch("/api/getUserById",{method:"POST" , headers:{"Content-Type":"application/json"},body:JSON.stringify({"user_id":userid}) });
      if(response.ok){
            const data = await response.json();
            console.log(data.result);
            setcurrUser(data.result);
      }

      
      
    }
    getuserdetails();
      

  },[userid])
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 flex flex-col items-center justify-center space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="text-2xl font-semibold text-gray-800 tracking-wide">
          Hello, {currUser?.username}!
        </div>
        <div className="text-lg text-gray-700 mt-2">
          Your current balance:{" "}
          <span className="font-semibold text-blue-500">{currUser?.money}</span>
        </div>
        <div className="text-lg text-gray-700 mt-2">
          Number of players in your team:{" "}
          <span className="font-semibold text-blue-500">
            {currUser?.player_ids?.length || 0/* {currUser?.player_ids!.length || 0 || currUser?.player_ids===null} */}
          </span>{" "}
          / 11
        </div>
        <button
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          onClick={() => router.push("/user/dashboard/players")}
        >
          View Available Players
        </button>
        <button
          className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-teal-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
          onClick={() => router.push("/user/dashboard/leaderboard")}
        >
          View Leaderboard
        </button>
        <button
          className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-600 focus:ring-4 focus:ring-yellow-300 transition-all duration-300 ease-in-out"
          onClick={() => router.push("/user/dashboard/budget")}
        >
          View Budget
        </button>
        <button
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-red-600 hover:to-pink-600 focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out"
          onClick={() => router.push("/user/dashboard/team")}
        >
          View Team
        </button>
      </div>
    </div>
  );
};

export default Page;
