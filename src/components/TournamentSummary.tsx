import { Player } from "../../datamodel/types";

const TournamentSummary = ({ playerData }: { playerData: Player[] }) => {
  const calculateStats = (playerData: Player[]) => {
    if (!playerData || playerData.length === 0) {
      console.log("No player data found", playerData);
      return {
        overallRuns: 0,
        overallWickets: 0,
        highestRunScorer: { name: "", runs: 0 },
        highestWicketTaker: { name: "", wickets: 0 },
      };
    }
    let overallRuns = 0;
    let overallWickets = 0;
    let highestRunScorer = { name: "", runs: 0 };
    let highestWicketTaker = { name: "", wickets: 0 };

    if (playerData && playerData.length > 0) {
      playerData.forEach((player) => {
        if (typeof player.total_runs === "number" && player.total_runs >= 0) {
          overallRuns += player.total_runs;
        }
        if (typeof player.total_runs === "string") {
          overallRuns += parseInt(player.total_runs);
        }

        if (typeof player.wickets === "number" && player.wickets >= 0) {
          overallWickets += player.wickets;
        }
        if (typeof player.wickets === "string") {
          overallWickets += parseInt(player.wickets);
        }

        if (parseInt(player.total_runs) > highestRunScorer.runs) {
          highestRunScorer = {
            name: player.name,
            runs: parseInt(player.total_runs),
          };
        }

        if (parseInt(player.wickets) > highestWicketTaker.wickets) {
          highestWicketTaker = {
            name: player.name,
            wickets: parseInt(player.wickets),
          };
        }
      });
    }
    return {
      overallRuns,
      overallWickets,
      highestRunScorer,
      highestWicketTaker,
    };
  };

  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md shadow-2xl rounded-lg border border-gray-300 p-6 items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Tournament Summary
      </h1>

      <div className="flex flex-col items-center gap-6 justify-center">
        {/* Overall Stats */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Overall Runs Scored:{" "}
            <span className="text-blue-600">
              {calculateStats(playerData).overallRuns}
            </span>
          </h2>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Overall Wickets Taken:{" "}
            <span className="text-red-600">
              {calculateStats(playerData).overallWickets}
            </span>
          </h2>
        </div>

        {/* Highest Scorers */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Highest Run Scorer:{" "}
            <span className="text-green-600">
              {calculateStats(playerData).highestRunScorer.name} (
              {calculateStats(playerData).highestRunScorer.runs} runs)
            </span>
          </h2>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Highest Wicket Taker:{" "}
            <span className="text-orange-600">
              {calculateStats(playerData).highestWicketTaker.name} (
              {calculateStats(playerData).highestWicketTaker.wickets} wickets)
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;
