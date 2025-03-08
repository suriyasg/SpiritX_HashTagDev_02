import { useState } from "react";
import { Player } from "../../datamodel/types";

const UserPlayerTable = ({ playerData }: { playerData: Player[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  return (
    <div className="bg-white min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md shadow-2xl rounded-lg border border-gray-300 p-6 mx-auto">
        {/* Scrollable Table */}
        <div className="overflow-x-auto max-h-100">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-left uppercase text-sm tracking-wider backdrop-blur-lg">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {playerData.map((player, index) => (
                <tr
                  key={player.name}
                  className={`border-t border-gray-300 ${
                    index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                  } hover:bg-blue-100/50 transition duration-300 backdrop-blur-lg hover:cursor-pointer`}
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedPlayer(player);
                  }}
                >
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {player.name}
                  </td>

                  <td className="px-6 py-4 text-gray-700">{player.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && selectedPlayer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <div
            className="w-full max-w-lg bg-white/10 border border-gray-300/20 shadow-lg rounded-lg p-6 relative text-gray-200 
                                                                    backdrop-blur-lg glass-effect animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white transition"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
              Player Details
            </h2>

            {/* Organized Table Layout */}
            <div className="grid grid-cols-2 gap-4 text-sm border border-gray-500/30 p-4 rounded-lg">
              <div className="font-semibold">Name:</div>
              <div>{selectedPlayer.name}</div>

              <div className="font-semibold">University:</div>
              <div>{selectedPlayer.university}</div>

              <div className="font-semibold">Category:</div>
              <div>{selectedPlayer.category}</div>

              <div className="font-semibold">Total Runs:</div>
              <div>{selectedPlayer.total_runs}</div>

              <div className="font-semibold">Balls Faced:</div>
              <div>{selectedPlayer.balls_faced}</div>

              <div className="font-semibold">Innings Played:</div>
              <div>{selectedPlayer.innings_played}</div>

              <div className="font-semibold">Wickets:</div>
              <div>{selectedPlayer.wickets}</div>

              <div className="font-semibold">Overs Bowled:</div>
              <div>{selectedPlayer.overs_bowled}</div>

              <div className="font-semibold">Runs Conceded:</div>
              <div>{selectedPlayer.runs_conceded}</div>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 
                                                                     rounded-md hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPlayerTable;
