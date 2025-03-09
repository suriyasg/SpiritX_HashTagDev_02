"use client";

import UserPlayerTable from "@/components/UserPlayerTable";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "../../../../../datamodel/types";
import { getAllPlayers } from "../../../../services/playerServices";
import Image from "next/image";

const Page = () => {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response: Player[] = await getAllPlayers();
        console.log("Fetched response:", response);
  
        if (!response || response.length === 0) {
          console.warn("No players returned from API");
        }
  
        setPlayerData(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setLoading(false);
      }
    };
  
    fetchPlayers();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-50 to-green-200 p-8 flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-500"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">⏳ Loading...</h2>
          <p className="text-gray-500 text-center mt-2">Fetching player data, please wait.</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-xl flex flex-col md:flex-row items-center md:items-start">
          <div className="flex flex-col items-center w-full md:w-1/3">
            <Image src="/players.png" alt="User Dashboard" width={350} height={350} className="rounded-lg shadow-md mx-auto md:mx-0" />
            <button
              onClick={() => router.push("/user/dashboard")}
              className="mt-4 py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
            >
              🔙 Back to Dashboard
            </button>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left md:ml-6">
            <h1 className="text-3xl font-bold text-gray-800">⚽ Available Players</h1>
            <p className="text-gray-600 mt-2">Manage your team wisely and stay ahead! 🚀</p>
            <div className="mt-4">
              <UserPlayerTable playerData={playerData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
