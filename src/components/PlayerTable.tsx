import { useState } from "react";
import { Player } from "../../datamodel/types";
import { calculatePoints, calculateValue } from "@/utils/playerCalculations";
import { deletePlayer, updatePlayer } from "@/services/playerServices";

const PlayerTable = ({
  playerData,
  showPoints,
}: {
  playerData: Player[];
  showPoints: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [action, setAction] = useState<"view" | "edit" | "delete">("view");

  const handleActionModal = (
    player: Player,
    action: "view" | "edit" | "delete"
  ) => {
    setSelectedPlayer(player);
    setAction(action);
    setModalOpen(true);
  };

  const handleDelete = async (player_id: string) => {
    if (player_id) {
      try {
        await deletePlayer(player_id);
        alert("Player deleted successfully");
        setModalOpen(false);
      } catch (error) {
        console.error("Error in deletePlayer", error);
      }
    }
  };

  const handleEditPlayer = async (player: Player | null) => {
    if (player) {
      try {
        await updatePlayer(player.player_id, player);
        alert("Player updated successfully");
        setModalOpen(false);
      } catch (error) {
        console.error("Error in updatePlayer", error);
      }
    }
  };

  return (
    <div className="p-6 flex justify-center relative">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md shadow-2xl rounded-lg border border-gray-300 p-6 animate-fade-in">
        {playerData && playerData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-left uppercase text-sm tracking-wider backdrop-blur-lg">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">University</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Options</th>
                </tr>
              </thead>
              <tbody>
                {playerData.map((player, index) => (
                  <tr
                    key={player.name}
                    className={`border-t border-gray-300 ${
                      index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                    } hover:bg-blue-100/50 transition duration-300 backdrop-blur-lg animate-fade-in-up`}
                  >
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                      {player.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {player.university}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {player.category}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <button
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-lg hover:shadow-blue-500/50 transition-all duration-300 backdrop-blur-lg animate-pulse"
                        onClick={() => handleActionModal(player, "view")}
                      >
                        Stats
                      </button>
                      <button
                        className="px-6 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 backdrop-blur-lg animate-pulse"
                        onClick={() => handleActionModal(player, "edit")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 shadow-lg hover:shadow-red-500/50 transition-all duration-300 backdrop-blur-lg animate-pulse"
                        onClick={() => handleActionModal(player, "delete")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-600 py-6 animate-fade-in">
            No players found.
          </div>
        )}
      </div>

      {modalOpen && selectedPlayer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-99 animate-fade-in">
          {action === "view" && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
              <div className="w-full max-w-lg bg-white/10 border border-gray-300/20 shadow-lg rounded-lg p-6 relative text-gray-200 backdrop-blur-lg glass-effect animate-fade-in-up">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-white transition"
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
                  Player Details
                </h2>
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
                  {showPoints && (
                    <>
                      <div className="font-semibold text-gray-200">Points:</div>
                      <div className="text-gray-200">
                        {calculatePoints(selectedPlayer)}
                      </div>
                      <div className="font-semibold text-yellow-500">Value:</div>
                      <div className="text-yellow-500">
                        {calculateValue(calculatePoints(selectedPlayer))}
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {action === "edit" && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
              <div className="w-full max-w-lg bg-white/10 border border-gray-300/20 shadow-lg rounded-lg p-6 relative text-gray-200 backdrop-blur-lg glass-effect animate-fade-in-up">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-white transition"
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
                  Edit Player Details
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditPlayer(selectedPlayer);
                  }}
                  className="grid grid-cols-2 gap-4 text-sm border border-gray-500/30 p-4 rounded-lg"
                >
                  <div className="font-semibold">Name:</div>
                  <input
                    type="text"
                    value={selectedPlayer.name}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        name: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">University:</div>
                  <input
                    type="text"
                    value={selectedPlayer.university}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        university: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Category:</div>
                  <input
                    type="text"
                    value={selectedPlayer.category}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        category: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Total Runs:</div>
                  <input
                    type="number"
                    value={selectedPlayer.total_runs}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        total_runs: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Balls Faced:</div>
                  <input
                    type="number"
                    value={selectedPlayer.balls_faced}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        balls_faced: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Innings Played:</div>
                  <input
                    type="number"
                    value={selectedPlayer.innings_played}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        innings_played: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Wickets:</div>
                  <input
                    type="number"
                    value={selectedPlayer.wickets}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        wickets: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Overs Bowled:</div>
                  <input
                    type="number"
                    value={selectedPlayer.overs_bowled}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        overs_bowled: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="font-semibold">Runs Conceded:</div>
                  <input
                    type="number"
                    value={selectedPlayer.runs_conceded}
                    onChange={(e) =>
                      setSelectedPlayer({
                        ...selectedPlayer,
                        runs_conceded: e.target.value,
                      })
                    }
                    className="bg-transparent border border-gray-500/40 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="col-span-2 mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {action === "delete" && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
              <div className="w-full max-w-lg bg-white/10 border border-gray-300/20 shadow-lg rounded-lg p-6 relative text-gray-200 backdrop-blur-lg glass-effect animate-fade-in-up">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-white transition"
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
                  Confirm Deletion
                </h2>
                <div className="text-center text-lg text-gray-300 mb-6">
                  <p>Are you sure you want to delete the following player?</p>
                  <p className="font-semibold mt-2">{selectedPlayer.name}</p>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2 text-sm font-medium text-white bg-gray-500/60 rounded-md hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gray-500/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(selectedPlayer.player_id)}
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-md hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerTable;
