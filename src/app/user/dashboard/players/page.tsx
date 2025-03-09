"use client";

import UserPlayerTable from "@/components/UserPlayerTable";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "../../../../../datamodel/types";
import { getAllPlayers } from "@/services/playerServices";
const Page = () => {
  const [playerData, setPlayerData] = useState<Player[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response: Player[] = await getAllPlayers();
        console.log("Fetched response:", response, typeof response); // Check API response

        if (!response || response.length === 0) {
          console.warn("No players returned from API");
        }

        setPlayerData(response);

        // Use a useEffect to log when the state updates
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);
  const router = useRouter();
  return loading ? (
    <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 flex flex-col items-center justify-center space-y-4">
      <div className="w-full max-w-6xl bg-white p-6 rounded-xl shadow-xl overflow-x-auto">
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => router.push("/user/dashboard")}
            className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          >
            Back to Dashboard
          </button>
        </div>
        <UserPlayerTable playerData={playerData} />
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 flex flex-col items-center justify-center space-y-6">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
      <h2 className="text-center text-2xl font-semibold">Loading...</h2>
      <p className="w-1/3 text-center text-gray-500">
        Please wait while we fetch the player data for you.
      </p>
    </div>
  );
};

export default Page;
