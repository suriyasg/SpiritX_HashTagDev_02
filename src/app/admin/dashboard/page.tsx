"use client";
import PlayerTable from "@/components/PlayerTable";
import TournamentSummary from "@/components/TournamentSummary";
import { Player } from "../../../../datamodel/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllPlayers } from "@/services/playerServices";

const Page = () => {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response: Player[] = await getAllPlayers();
        console.log("Fetched response:", response, typeof response);

        if (!response || response.length === 0) {
          console.warn("No players returned from API");
        }

        setPlayerData(response);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    console.log("Updated playerData:", playerData);
    if (playerData.length > 0) {
      setLoading(false);
    }
  }, [playerData]);

  const handleLogout = () => {
    router.push("/admin/auth/login");
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome to Admin Dashboard
          </h1>

          {/* Tournament Summary Section */}
          <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {/* Tournament Summary */}
            </h2>
            <TournamentSummary playerData={playerData} />
          </div>

          {/* Player Table */}
          <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Player Statistics
            </h2>
            <div className="h-[500px] overflow-y-auto">
              <PlayerTable playerData={playerData} showPoints={true} />
            </div>
          </div>

          {/* Button Container */}
          <div className="fixed bottom-8 flex gap-4 w-full justify-center px-4">
            {/* Add New Player Button */}
            <button
              onClick={() => router.push("/admin/new-player")}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Add New Player
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
