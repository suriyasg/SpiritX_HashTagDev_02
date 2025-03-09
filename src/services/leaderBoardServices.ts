import axios from "axios";

export const getLeaderBoard = async () => {
  try {
    const response = await axios.get("/leaderboard");
    console.log("response", response.data);
    return response.data.leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard", error);
  }
};
