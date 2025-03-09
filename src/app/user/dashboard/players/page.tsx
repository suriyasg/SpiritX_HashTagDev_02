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
        console.log("Fetched response:", response); // ✅ Logs correctly
  
        if (!response || response.length === 0) {
          console.warn("No players returned from API");
        }
  
        setPlayerData(response);
        setLoading(false); // ✅ Stops loading after data is fetched
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setLoading(false); // ✅ Even if error, stop loading
      }
    };
  
    fetchPlayers();
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 p-8 flex flex-col items-center justify-center space-y-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">⏳ Loading...</h2>
          <p className="text-gray-500 text-center mt-2">Fetching player data, please wait.</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-xl overflow-x-auto flex flex-col items-center">
          <Image src="/players.png" alt="User Dashboard" width={200} height={200} className="rounded-lg shadow-md mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">⚽ Available Players</h1>
          <p className="text-gray-600 mt-2">Manage your team wisely and stay ahead! 🚀</p>
          <div className="mt-4 w-full">
            <UserPlayerTable playerData={playerData} />
          </div>
          <button
            onClick={() => router.push("/user/dashboard")}
            className="mt-6 py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          >
            🔙 Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
