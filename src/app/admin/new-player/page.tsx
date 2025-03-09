"use client";
import { useState } from "react";
import { Player } from "../../../../datamodel/types";
import { addPlayer } from "@/services/playerServices";

const AddPlayer = () => {
  const [playerData, setPlayerData] = useState<Player>({
    player_id: "",
    name: "",
    university: "",
    category: "",
    total_runs: "",
    balls_faced: "",
    innings_played: "",
    wickets: "",
    overs_bowled: "",
    runs_conceded: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("playerData", playerData);
    try {
      addPlayer(playerData).then(() => {
        alert("Player Added Successfully");
        setPlayerData({
          player_id: "",
          name: "",
          university: "",
          category: "",
          total_runs: "",
          balls_faced: "",
          innings_played: "",
          wickets: "",
          overs_bowled: "",
          runs_conceded: "",
        });
      });
    } catch (error) {
      console.error("Error in Add Player", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 tracking-wide">
        Add New Player
      </h1>

      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Player Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={playerData.name}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="university"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              University
            </label>
            <input
              id="university"
              name="university"
              type="text"
              value={playerData.university}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={playerData.category}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            >
              <option value="">Select Category</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="total_runs"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Total Runs
            </label>
            <input
              id="total_runs"
              name="total_runs"
              type="number"
              value={playerData.total_runs}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="wickets"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Wickets
            </label>
            <input
              id="wickets"
              name="wickets"
              type="number"
              value={playerData.wickets}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="balls_faced"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Balls Faced
            </label>
            <input
              id="balls_faced"
              name="balls_faced"
              type="number"
              value={playerData.balls_faced}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="overs_bowled"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Overs Bowled
            </label>
            <input
              id="overs_bowled"
              name="overs_bowled"
              type="number"
              value={playerData.overs_bowled}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="runs_conceded"
              className="block text-sm font-semibold text-gray-800 tracking-wider"
            >
              Runs Conceded
            </label>
            <input
              id="runs_conceded"
              name="runs_conceded"
              type="number"
              value={playerData.runs_conceded}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 mt-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out hover:border-blue-400 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          >
            Add Player
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
