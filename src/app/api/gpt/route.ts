import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllPlayers } from "@/firebase/PlayerService";

const genAI = new GoogleGenerativeAI("AIzaSyClrTgCGw0Ev9ID-ptwWVAlml4OS5YOaxQ");

interface Player {
  name: string;
  university: string;
  category: string;
  total_runs: string;
  balls_faced: string;
  innings_played: string;
  wickets: string;
  overs_bowled: string;
  runs_conceded: string;
}

async function fetchPlayerData(): Promise<Player[]> {
  try {
    const data = await getAllPlayers();
    return Object.values(data);
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error;
  }
}

function formatPlayerStats(players: Player[]): string {
  return players
    .map(
      (p) =>
        `${p.name} from ${p.university} is a ${p.category}. Runs: ${p.total_runs}, Balls Faced: ${p.balls_faced}, Innings: ${p.innings_played}, Wickets: ${p.wickets}, Overs Bowled: ${p.overs_bowled}, Runs Conceded: ${p.runs_conceded}.`
    )
    .join("\n");
}

// Generate a response using Google Generative AI
async function generateAIResponse(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function POST(req: NextRequest) {
  try {
    // Fetch player data from the local API
    const players = await fetchPlayerData();
    if (!players || players.length === 0) {
      return NextResponse.json(
        { error: "No player data found" },
        { status: 400 }
      );
    }

    // Get user query from the request body
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    // Format player stats into a readable string
    const playersText = formatPlayerStats(players);

    // Create the prompt for the AI
    const prompt = `Imagine you are a Cricket Stats Assistant. In this prompt, I have attached a dataset called playerstats containing information about players and their statistics. Additionally, I will provide a query called userquery. Your task is to respond only to that query. When responding to userquery, you must follow these rules:

Rule 1: You must respond to the userquery based on the provided playerstats data.
Rule 2: In your response, do not include the phrase 'based on the given playerstats.' This means you should treat the dataset as your prebuilt data.
Rule 3: If the query contains any irrelevant questions (except if the query is about greeting you or asking about yourself—in such cases, you should greet the user and ask how you can help them), out-of-scope questions, or suggestions unrelated to the playerstats, you should respond with, 'I don’t have enough knowledge to answer that question.'
Rule 4: You should be able to suggest the best possible team of 11 players based on the data.

Player Stats:
${playersText}

User Query: ${query}`;

    // Generate AI response
    const responseText = await generateAIResponse(prompt);

    // Return the AI response
    return NextResponse.json({ output: responseText });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
