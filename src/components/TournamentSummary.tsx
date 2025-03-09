import { Player } from "../../datamodel/types";

const TournamentSummary = ({ playerData }: { playerData: Player[] }) => {
  const calculateStats = (playerData: Player[]) => {
    if (!playerData || playerData.length === 0) {
      console.log("No player data found", playerData);
      return {
        overallRuns: 0,
        overallWickets: 0,
        highestRunScorer: { name: "N/A", runs: 0 },
        highestWicketTaker: { name: "N/A", wickets: 0 },
      };
    }

    let overallRuns = 0;
    let overallWickets = 0;
    let highestRunScorer = { name: "", runs: 0 };
    let highestWicketTaker = { name: "", wickets: 0 };

    playerData.forEach((player) => {
      const runs = parseInt(player.total_runs) || 0;
      const wickets = parseInt(player.wickets) || 0;
      
      overallRuns += runs;
      overallWickets += wickets;
      
      if (runs > highestRunScorer.runs) {
        highestRunScorer = { name: player.name, runs };
      }
      if (wickets > highestWicketTaker.wickets) {
        highestWicketTaker = { name: player.name, wickets };
      }
    });

    return {
      overallRuns,
      overallWickets,
      highestRunScorer,
      highestWicketTaker,
    };
  };

  const { overallRuns, overallWickets, highestRunScorer, highestWicketTaker } = calculateStats(playerData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-300 p-6"> 
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Tournament Summary</h1>
        
        <div className="grid grid-cols-2 gap-6 text-lg text-gray-800">
          {/* Overall Stats */}
          <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg shadow-md">
            <h2 className="font-semibold">Overall Runs Scored</h2>
            <span className="text-blue-600 text-xl font-bold">{overallRuns}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-red-100 rounded-lg shadow-md">
            <h2 className="font-semibold">Overall Wickets Taken</h2>
            <span className="text-red-600 text-xl font-bold">{overallWickets}</span>
          </div>

          {/* Highest Performers */}
          <div className="flex flex-col items-center p-4 bg-green-100 rounded-lg shadow-md">
            <h2 className="font-semibold">Highest Run Scorer</h2>
            <span className="text-green-600 text-xl font-bold">{highestRunScorer.name}</span>
            <span className="text-gray-700">({highestRunScorer.runs} runs)</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-orange-100 rounded-lg shadow-md">
            <h2 className="font-semibold">Highest Wicket Taker</h2>
            <span className="text-orange-600 text-xl font-bold">{highestWicketTaker.name}</span>
            <span className="text-gray-700">({highestWicketTaker.wickets} wickets)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;
