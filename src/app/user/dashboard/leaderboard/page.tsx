"use client";
import { currUser } from "../page";
import { useRouter } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { db } from "@/firebase/firebase";
import { LeaderBoardRecord } from "../../../../../datamodel/types";
import { useEffect, useState } from "react";

const sampleLeaderboardData = [
    { user_id: "string", total: 1000 },
    { user_id: "001", total: 2000 },
    { user_id: "003", total: 3000 },
    { user_id: "004", total: 4000 },
    { user_id: "005", total: 5000 },
    { user_id: "006", total: 6000 },
    { user_id: "007", total: 7000 },
    { user_id: "008", total: 8000 },
    { user_id: "009", total: 9000 },
    { user_id: "010", total: 10000 },
];

const Page = () => {
    const router = useRouter();
    const [leaderboard, setLeaderboard] = useState<LeaderBoardRecord[]>([]);
    useEffect(() => {
        const leaderboardRef = ref(db, "LeaderBoard");
        // Listen for real-time changes
        onValue(leaderboardRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const sortedLeaderboard = Object.values(data) as LeaderBoardRecord[]
                console.log(sortedLeaderboard)
                setLeaderboard(sortedLeaderboard)
            }
        });
    }, []);
    const handleBackClick = () => {
        router.push("/user/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center justify-center p-8">
            {/* Leaderboard Card */}
            <div className="bg-white/80 backdrop-blur-lg border border-gray-300 p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    Leaderboard
                </h2>

                <div className="overflow-hidden rounded-lg">
                    <table className="w-full border-collapse text-gray-700 text-sm bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-indigo-200 text-gray-800 uppercase text-xs">
                                <th className="p-3 text-left">User ID</th>
                                <th className="p-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((data, index) => (
                                    <tr
                                        key={data.user_id}
                                        className={`border-b border-gray-300 hover:bg-indigo-100 transition duration-300 ${data.user_id === currUser.user_id
                                                ? "bg-yellow-300 font-bold"
                                                : "bg-white"
                                            }`}
                                    >
                                        <td className="p-3">
                                            {index + 1}. {data.user_id}
                                        </td>
                                        <td className="p-3 text-right">{data.team_total_points}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={handleBackClick}
                    className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Page;
