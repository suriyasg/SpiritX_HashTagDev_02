"use client";
import { currUser } from "../page";
import { useRouter } from "next/navigation";
import { playerData } from "@/app/admin/dashboard/page";
import { calculatePoints, calculateValue } from "@/utils/playerCalculations";

const Page = () => {
  const router = useRouter();
  console.log(playerData);
  console.log(currUser.player_ids);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center justify-center p-8">
      {/* Glassmorphism Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-300 p-6 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
        {/* User Info */}
        <div className="text-2xl font-semibold text-gray-800 tracking-wide text-center">
          Hello, <span className="text-indigo-600">{currUser.username}</span>!
        </div>
        <div className="text-lg text-gray-700 mt-2 text-center">
          Your balance:{" "}
          <span className="font-semibold text-green-500">{currUser.money}</span>
        </div>
        <div className="text-lg text-gray-700 mt-2 text-center">
          Players in team:{" "}
          <span className="font-semibold text-indigo-600">
            {currUser.player_ids?.length || 0}
          </span>{" "}
          / 11
        </div>

        {/* Player Table */}
        <div className="mt-6 overflow-hidden rounded-lg">
          <table className="w-full border-collapse text-gray-700 text-sm bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-indigo-200 text-gray-800 uppercase text-xs">
                <th className="p-3 text-left">Player</th>
                <th className="p-3 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {currUser?.player_ids?.length ? (
                currUser.player_ids.map((player_id) => {
                  const player = playerData?.find(
                    (p) => p.player_id === player_id
                  );
                  if (!player) return null;
                  return (
                    <tr
                      key={player_id}
                      className="border-b border-gray-300 hover:bg-indigo-100 transition duration-300"
                    >
                      <td className="p-3 font-medium">{player.name}</td>
                      <td className="p-3 font-semibold text-green-600">
                        {calculateValue(calculatePoints(player))}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={2} className="p-3 text-center text-gray-500">
                    No players selected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View Available Players Button */}
        <button
          className="w-full mt-6 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-md hover:from-indigo-500 hover:to-purple-600 hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => router.push("/user/dashboard/")}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default Page;
