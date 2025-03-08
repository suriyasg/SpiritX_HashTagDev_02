"use client";
import PlayerTable from "@/components/PlayerTable";
import TournamentSummary from "@/components/TournamentSummary";
import { Player } from "../../../../datamodel/types";
import { useRouter } from "next/navigation";
const playerData: Player[] = [
  {
    player_id: "1",
    name: "Chamika Chandimal",
    university: "University of the Visual & Performing Arts",
    category: "Batsman",
    total_runs: 50,
    balls_faced: 588,
    innings_played: 10,
    wickets: 0,
    overs_bowled: 3,
    runs_conceded: 21,
  },
  {
    player_id: "2",
    name: "Dimuth Dhananjaya",
    university: "University of the Visual & Performing Arts",
    category: "All-Rounder",
    total_runs: 250,
    balls_faced: 208,
    innings_played: 10,
    wickets: 8,
    overs_bowled: 40,
    runs_conceded: 240,
  },
  {
    player_id: "3",
    name: "Avishka Mendis",
    university: "Eastern University",
    category: "All-Rounder",
    total_runs: 210,
    balls_faced: 175,
    innings_played: 7,
    wickets: 7,
    overs_bowled: 35,
    runs_conceded: 210,
  },
  {
    player_id: "4",
    name: "Danushka Kumara",
    university: "University of the Visual & Performing Arts",
    category: "Batsman",
    total_runs: 780,
    balls_faced: 866,
    innings_played: 15,
    wickets: 0,
    overs_bowled: 5,
    runs_conceded: 35,
  },
  {
    player_id: "5",
    name: "Praveen Vandersay",
    university: "Eastern University",
    category: "Batsman",
    total_runs: 329,
    balls_faced: 365,
    innings_played: 7,
    wickets: 0,
    overs_bowled: 3,
    runs_conceded: 24,
  },
  {
    player_id: "6",
    name: "Niroshan Mathews",
    university: "University of the Visual & Performing Arts",
    category: "Batsman",
    total_runs: 275,
    balls_faced: 305,
    innings_played: 5,
    wickets: 0,
    overs_bowled: 2,
    runs_conceded: 18,
  },
  {
    player_id: "7",
    name: "Chaturanga Gunathilaka",
    university: "University of Moratuwa",
    category: "Bowler",
    total_runs: 132,
    balls_faced: 264,
    innings_played: 11,
    wickets: 29,
    overs_bowled: 88,
    runs_conceded: 528,
  },
  {
    player_id: "8",
    name: "Lahiru Rathnayake",
    university: "University of Ruhuna",
    category: "Batsman",
    total_runs: 742,
    balls_faced: 824,
    innings_played: 14,
    wickets: 0,
    overs_bowled: 1,
    runs_conceded: 8,
  },
  {
    player_id: "9",
    name: "Jeewan Thirimanne",
    university: "University of Jaffna",
    category: "Batsman",
    total_runs: 780,
    balls_faced: 866,
    innings_played: 15,
    wickets: 0,
    overs_bowled: 3,
    runs_conceded: 24,
  },
  {
    player_id: "10",
    name: "Kalana Samarawickrama",
    university: "Eastern University",
    category: "Batsman",
    total_runs: 728,
    balls_faced: 808,
    innings_played: 14,
    wickets: 0,
    overs_bowled: 4,
    runs_conceded: 32,
  },
  {
    player_id: "11",
    name: "Lakshan Vandersay",
    university: "University of the Visual & Performing Arts",
    category: "All-Rounder",
    total_runs: 405,
    balls_faced: 337,
    innings_played: 15,
    wickets: 15,
    overs_bowled: 75,
    runs_conceded: 450,
  },
  {
    player_id: "12",
    name: "Roshen Samarawickrama",
    university: "University of Kelaniya",
    category: "Bowler",
    total_runs: 140,
    balls_faced: 280,
    innings_played: 14,
    wickets: 46,
    overs_bowled: 140,
    runs_conceded: 560,
  },
  {
    player_id: "13",
    name: "Sammu Sandakan",
    university: "University of Ruhuna",
    category: "Bowler",
    total_runs: 120,
    balls_faced: 240,
    innings_played: 10,
    wickets: 26,
    overs_bowled: 80,
    runs_conceded: 320,
  },
  {
    player_id: "14",
    name: "Kalana Jayawardene",
    university: "University of Jaffna",
    category: "Bowler",
    total_runs: 120,
    balls_faced: 240,
    innings_played: 10,
    wickets: 33,
    overs_bowled: 100,
    runs_conceded: 400,
  },
  {
    player_id: "15",
    name: "Binura Samarawickrama",
    university: "University of the Visual & Performing Arts",
    category: "Bowler",
    total_runs: 77,
    balls_faced: 154,
    innings_played: 7,
    wickets: 21,
    overs_bowled: 63,
    runs_conceded: 252,
  },
  {
    player_id: "16",
    name: "Dasun Thirimanne",
    university: "Eastern University",
    category: "Bowler",
    total_runs: 121,
    balls_faced: 242,
    innings_played: 11,
    wickets: 29,
    overs_bowled: 88,
    runs_conceded: 440,
  },
  {
    player_id: "17",
    name: "Angelo Samarawickrama",
    university: "University of Kelaniya",
    category: "Batsman",
    total_runs: 424,
    balls_faced: 471,
    innings_played: 8,
    wickets: 0,
    overs_bowled: 1,
    runs_conceded: 7,
  },
  {
    player_id: "18",
    name: "Nuwan Jayawickrama",
    university: "University of Ruhuna",
    category: "Batsman",
    total_runs: 300,
    balls_faced: 333,
    innings_played: 6,
    wickets: 0,
    overs_bowled: 3,
    runs_conceded: 27,
  },
];

const Page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Welcome to Admin Dashboard
      </h1>

      <div className="w-full max-w-5xl space-y-8">
        {/* Player Table */}
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Player Statistics
            </h2>
            <div className="h-[400px] overflow-y-auto">
              <PlayerTable playerData={playerData} />
            </div>
          </div>
        </div>

        {/* Tournament Summary */}
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden items-center justify-center">
          <div className="p-4">
            <div className="justify-center items-center pl-10">
              <TournamentSummary playerData={playerData} />
            </div>
          </div>
        </div>
      </div>

      {/* Add New Player Button */}
      <button
        onClick={() => router.push("/admin/new-player")}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        Add New Player
      </button>
    </div>
  );
};

export default Page;
