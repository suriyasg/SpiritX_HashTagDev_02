/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Player, User } from "../../datamodel/types";
import { calculatePlayerValue } from "@/firebase/serviceFunctions";
import { calculatePoints, calculateValue } from "@/utils/playerCalculations";

const TeamSelect = ({
  playerData,
  userData,
}: {
  playerData: Player[];
  userData: User;
}) => {
  const categories = ["Batsman", "Bowler", "All-Rounder"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-4 md:p-8 flex flex-col items-center justify-center space-y-6">
      {/* Category Selection */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 bg-white/40 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg border border-gray-300">
        <span className="text-base md:text-lg font-medium text-gray-800">
          Select Category
        </span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Player Table */}
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md shadow-2xl rounded-lg border border-gray-300 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Select Your Team
        </h1>
        <div className="text-base md:text-lg text-gray-700 mt-2">
          Your current balance:{" "}
          <span className="font-semibold text-blue-500">{userData.money}</span>
        </div>
        <div className="text-base md:text-lg text-gray-700 mt-2 mb-2">
          Players in team:{" "}
          <span className="font-semibold text-blue-500">
            {userData.player_ids?.length || 0}
          </span>{" "}
          / 11
        </div>
        {userData.player_ids?.length === 11 ? (
          <>
            <div className="text-base md:text-lg text-gray-700 mt-2 mb-2 font-semibold">
              Total Points:{" "}
              <span className="text-blue-500">
                {userData.player_ids.reduce(
                  (acc, id) =>
                    acc +
                    calculatePoints(
                      playerData.find((p) => p.player_id === id)!
                    ),
                  0
                )}
              </span>
            </div>
          </>
        ) : null}
        <div className="overflow-x-auto max-h-100">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-left uppercase text-xs md:text-sm tracking-wider">
                <th className="px-4 md:px-6 py-2 md:py-4">Name</th>
                <th className="px-4 md:px-6 py-2 md:py-4">University</th>
                <th className="px-4 md:px-6 py-2 md:py-4">Budget</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {playerData
                .filter((player) => player.category === selectedCategory)
                .map((player, index) => (
                  <tr
                    key={player.name}
                    className={`border-t border-gray-300 transition duration-300 hover:cursor-pointer ${
                      index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                    } hover:bg-blue-100/50 backdrop-blur-lg`}
                  >
                    <td className="px-4 md:px-6 py-2 md:py-4 text-gray-800 font-semibold">
                      {player.name}
                    </td>
                    <td className="px-4 md:px-6 py-2 md:py-4 text-gray-700">
                      {player.university}
                    </td>
                    <td className="px-4 md:px-6 py-2 md:py-4 text-gray-700">
                      {calculateValue(calculatePoints(player))}
                    </td>
                    <td>
                      {userData.player_ids!.includes(player.player_id) ? (
                        <button
                          className="px-4 md:px-6 py-1 md:py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out"
                          onClick={() => {
                            userData.player_ids = userData.player_ids!.filter(
                              (id) => id !== player.player_id
                            );
                            userData.money += calculateValue(
                              calculatePoints(player)
                            );
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className="px-4 md:px-6 py-1 md:py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
                          onClick={() => {
                            if (
                              userData.money >=
                                calculateValue(calculatePoints(player)) &&
                              userData.player_ids!.length < 11
                            ) {
                              userData.player_ids!.push(player.player_id);
                              userData.money -= calculateValue(
                                calculatePoints(player)
                              );
                            }
                          }}
                        >
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamSelect;
