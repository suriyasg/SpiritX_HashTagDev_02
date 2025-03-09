import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyClrTgCGw0Ev9ID-ptwWVAlml4OS5YOaxQ");

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json(); // Get user query

    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    // Load player data
    const players = [
        {
          "Name": "Chamika Chandimal",
          "University": "University of the Visual & Performing Arts",
          "Category": "Batsman",
          "Total Runs": "530",
          "Balls Faced": "588",
          "Innings Played": "10",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "21"
        },
        {
          "Name": "Dimuth Dhananjaya",
          "University": "University of the Visual & Performing Arts",
          "Category": "All-Rounder",
          "Total Runs": "250",
          "Balls Faced": "208",
          "Innings Played": "10",
          "Wickets": "8",
          "Overs Bowled": "40",
          "Runs Conceded": "240"
        },
        {
          "Name": "Avishka Mendis",
          "University": "Eastern University",
          "Category": "All-Rounder",
          "Total Runs": "210",
          "Balls Faced": "175",
          "Innings Played": "7",
          "Wickets": "7",
          "Overs Bowled": "35",
          "Runs Conceded": "210"
        },
        {
          "Name": "Danushka Kumara",
          "University": "University of the Visual & Performing Arts",
          "Category": "Batsman",
          "Total Runs": "780",
          "Balls Faced": "866",
          "Innings Played": "15",
          "Wickets": "0",
          "Overs Bowled": "5",
          "Runs Conceded": "35"
        },
        {
          "Name": "Praveen Vandersay",
          "University": "Eastern University",
          "Category": "Batsman",
          "Total Runs": "329",
          "Balls Faced": "365",
          "Innings Played": "7",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "24"
        },
        {
          "Name": "Niroshan Mathews",
          "University": "University of the Visual & Performing Arts",
          "Category": "Batsman",
          "Total Runs": "275",
          "Balls Faced": "305",
          "Innings Played": "5",
          "Wickets": "0",
          "Overs Bowled": "2",
          "Runs Conceded": "18"
        },
        {
          "Name": "Chaturanga Gunathilaka",
          "University": "University of Moratuwa",
          "Category": "Bowler",
          "Total Runs": "132",
          "Balls Faced": "264",
          "Innings Played": "11",
          "Wickets": "29",
          "Overs Bowled": "88",
          "Runs Conceded": "528"
        },
        {
          "Name": "Lahiru Rathnayake",
          "University": "University of Ruhuna",
          "Category": "Batsman",
          "Total Runs": "742",
          "Balls Faced": "824",
          "Innings Played": "14",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "8"
        },
        {
          "Name": "Jeewan Thirimanne",
          "University": "University of Jaffna",
          "Category": "Batsman",
          "Total Runs": "780",
          "Balls Faced": "866",
          "Innings Played": "15",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "24"
        },
        {
          "Name": "Kalana Samarawickrama",
          "University": "Eastern University",
          "Category": "Batsman",
          "Total Runs": "728",
          "Balls Faced": "808",
          "Innings Played": "14",
          "Wickets": "0",
          "Overs Bowled": "4",
          "Runs Conceded": "32"
        },
        {
          "Name": "Lakshan Vandersay",
          "University": "University of the Visual & Performing Arts",
          "Category": "All-Rounder",
          "Total Runs": "405",
          "Balls Faced": "337",
          "Innings Played": "15",
          "Wickets": "15",
          "Overs Bowled": "75",
          "Runs Conceded": "450"
        },
        {
          "Name": "Roshen Samarawickrama",
          "University": "University of Kelaniya",
          "Category": "Bowler",
          "Total Runs": "140",
          "Balls Faced": "280",
          "Innings Played": "14",
          "Wickets": "46",
          "Overs Bowled": "140",
          "Runs Conceded": "560"
        },
        {
          "Name": "Sammu Sandakan",
          "University": "University of Ruhuna",
          "Category": "Bowler",
          "Total Runs": "120",
          "Balls Faced": "240",
          "Innings Played": "10",
          "Wickets": "26",
          "Overs Bowled": "80",
          "Runs Conceded": "320"
        },
        {
          "Name": "Kalana Jayawardene",
          "University": "University of Jaffna",
          "Category": "Bowler",
          "Total Runs": "120",
          "Balls Faced": "240",
          "Innings Played": "10",
          "Wickets": "33",
          "Overs Bowled": "100",
          "Runs Conceded": "400"
        },
        {
          "Name": "Binura Samarawickrama",
          "University": "University of the Visual & Performing Arts",
          "Category": "Bowler",
          "Total Runs": "77",
          "Balls Faced": "154",
          "Innings Played": "7",
          "Wickets": "21",
          "Overs Bowled": "63",
          "Runs Conceded": "252"
        },
        {
          "Name": "Dasun Thirimanne",
          "University": "Eastern University",
          "Category": "Bowler",
          "Total Runs": "121",
          "Balls Faced": "242",
          "Innings Played": "11",
          "Wickets": "29",
          "Overs Bowled": "88",
          "Runs Conceded": "440"
        },
        {
          "Name": "Angelo Samarawickrama",
          "University": "University of Kelaniya",
          "Category": "Batsman",
          "Total Runs": "424",
          "Balls Faced": "471",
          "Innings Played": "8",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "7"
        },
        {
          "Name": "Nuwan Jayawickrama",
          "University": "University of Ruhuna",
          "Category": "Batsman",
          "Total Runs": "300",
          "Balls Faced": "333",
          "Innings Played": "6",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "27"
        },
        {
          "Name": "Kusal Dhananjaya",
          "University": "South Eastern University",
          "Category": "Batsman",
          "Total Runs": "480",
          "Balls Faced": "533",
          "Innings Played": "10",
          "Wickets": "0",
          "Overs Bowled": "2",
          "Runs Conceded": "16"
        },
        {
          "Name": "Chamika Bandara",
          "University": "Eastern University",
          "Category": "Batsman",
          "Total Runs": "270",
          "Balls Faced": "300",
          "Innings Played": "5",
          "Wickets": "0",
          "Overs Bowled": "5",
          "Runs Conceded": "45"
        },
        {
          "Name": "Dilruwan Shanaka",
          "University": "University of Peradeniya",
          "Category": "Batsman",
          "Total Runs": "384",
          "Balls Faced": "426",
          "Innings Played": "8",
          "Wickets": "0",
          "Overs Bowled": "5",
          "Runs Conceded": "45"
        },
        {
          "Name": "Danushka Jayawickrama",
          "University": "University of Peradeniya",
          "Category": "All-Rounder",
          "Total Runs": "350",
          "Balls Faced": "291",
          "Innings Played": "14",
          "Wickets": "14",
          "Overs Bowled": "70",
          "Runs Conceded": "350"
        },
        {
          "Name": "Charith Shanaka",
          "University": "University of Colombo",
          "Category": "Batsman",
          "Total Runs": "477",
          "Balls Faced": "530",
          "Innings Played": "9",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "27"
        },
        {
          "Name": "Asela Nissanka",
          "University": "University of Sri Jayewardenepura",
          "Category": "Batsman",
          "Total Runs": "765",
          "Balls Faced": "850",
          "Innings Played": "15",
          "Wickets": "0",
          "Overs Bowled": "0",
          "Runs Conceded": "1"
        },
        {
          "Name": "Wanindu Hasaranga",
          "University": "University of Colombo",
          "Category": "Bowler",
          "Total Runs": "120",
          "Balls Faced": "240",
          "Innings Played": "10",
          "Wickets": "30",
          "Overs Bowled": "90",
          "Runs Conceded": "540"
        },
        {
          "Name": "Asela Vandersay",
          "University": "University of the Visual & Performing Arts",
          "Category": "Bowler",
          "Total Runs": "154",
          "Balls Faced": "308",
          "Innings Played": "14",
          "Wickets": "37",
          "Overs Bowled": "112",
          "Runs Conceded": "448"
        },
        {
          "Name": "Pathum Fernando",
          "University": "University of Peradeniya",
          "Category": "Batsman",
          "Total Runs": "450",
          "Balls Faced": "500",
          "Innings Played": "10",
          "Wickets": "0",
          "Overs Bowled": "2",
          "Runs Conceded": "18"
        },
        {
          "Name": "Angelo Kumara",
          "University": "Eastern University",
          "Category": "Batsman",
          "Total Runs": "330",
          "Balls Faced": "366",
          "Innings Played": "6",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "8"
        },
        {
          "Name": "Danushka Rajapaksa",
          "University": "University of Peradeniya",
          "Category": "Batsman",
          "Total Runs": "441",
          "Balls Faced": "490",
          "Innings Played": "9",
          "Wickets": "0",
          "Overs Bowled": "5",
          "Runs Conceded": "35"
        },
        {
          "Name": "Suranga Shanaka",
          "University": "South Eastern University",
          "Category": "Bowler",
          "Total Runs": "55",
          "Balls Faced": "110",
          "Innings Played": "5",
          "Wickets": "13",
          "Overs Bowled": "40",
          "Runs Conceded": "160"
        },
        {
          "Name": "Pathum Dhananjaya",
          "University": "Eastern University",
          "Category": "Batsman",
          "Total Runs": "360",
          "Balls Faced": "400",
          "Innings Played": "8",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "9"
        },
        {
          "Name": "Asela Asalanka",
          "University": "South Eastern University",
          "Category": "Batsman",
          "Total Runs": "550",
          "Balls Faced": "611",
          "Innings Played": "11",
          "Wickets": "0",
          "Overs Bowled": "0",
          "Runs Conceded": "1"
        },
        {
          "Name": "Minod Rathnayake",
          "University": "University of Kelaniya",
          "Category": "Bowler",
          "Total Runs": "154",
          "Balls Faced": "308",
          "Innings Played": "14",
          "Wickets": "37",
          "Overs Bowled": "112",
          "Runs Conceded": "448"
        },
        {
          "Name": "Binura Lakmal",
          "University": "University of Kelaniya",
          "Category": "Batsman",
          "Total Runs": "540",
          "Balls Faced": "600",
          "Innings Played": "12",
          "Wickets": "0",
          "Overs Bowled": "2",
          "Runs Conceded": "16"
        },
        {
          "Name": "Praveen Asalanka",
          "University": "Eastern University",
          "Category": "Batsman",
          "Total Runs": "477",
          "Balls Faced": "530",
          "Innings Played": "9",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "7"
        },
        {
          "Name": "Angelo Jayawardene",
          "University": "University of Jaffna",
          "Category": "Batsman",
          "Total Runs": "468",
          "Balls Faced": "520",
          "Innings Played": "9",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "21"
        },
        {
          "Name": "Kamindu Asalanka",
          "University": "University of Moratuwa",
          "Category": "Bowler",
          "Total Runs": "135",
          "Balls Faced": "270",
          "Innings Played": "15",
          "Wickets": "45",
          "Overs Bowled": "135",
          "Runs Conceded": "810"
        },
        {
          "Name": "Sadeera Rajapaksa",
          "University": "University of Jaffna",
          "Category": "All-Rounder",
          "Total Runs": "275",
          "Balls Faced": "229",
          "Innings Played": "11",
          "Wickets": "8",
          "Overs Bowled": "44",
          "Runs Conceded": "264"
        },
        {
          "Name": "Sandakan Hasaranga",
          "University": "University of Kelaniya",
          "Category": "Batsman",
          "Total Runs": "795",
          "Balls Faced": "883",
          "Innings Played": "15",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "7"
        },
        {
          "Name": "Bhanuka Rajapaksa",
          "University": "University of Moratuwa",
          "Category": "All-Rounder",
          "Total Runs": "364",
          "Balls Faced": "303",
          "Innings Played": "14",
          "Wickets": "11",
          "Overs Bowled": "56",
          "Runs Conceded": "336"
        },
        {
          "Name": "Chamika Rajapaksa",
          "University": "University of Ruhuna",
          "Category": "Batsman",
          "Total Runs": "450",
          "Balls Faced": "500",
          "Innings Played": "9",
          "Wickets": "0",
          "Overs Bowled": "1",
          "Runs Conceded": "7"
        },
        {
          "Name": "Kamindu Lakmal",
          "University": "University of the Visual & Performing Arts",
          "Category": "Batsman",
          "Total Runs": "780",
          "Balls Faced": "866",
          "Innings Played": "15",
          "Wickets": "0",
          "Overs Bowled": "5",
          "Runs Conceded": "35"
        },
        {
          "Name": "Lakshan Gunathilaka",
          "University": "University of Peradeniya",
          "Category": "Bowler",
          "Total Runs": "84",
          "Balls Faced": "168",
          "Innings Played": "7",
          "Wickets": "21",
          "Overs Bowled": "63",
          "Runs Conceded": "315"
        },
        {
          "Name": "Tharindu Thirimanne",
          "University": "South Eastern University",
          "Category": "Batsman",
          "Total Runs": "611",
          "Balls Faced": "678",
          "Innings Played": "13",
          "Wickets": "0",
          "Overs Bowled": "2",
          "Runs Conceded": "18"
        },
        {
          "Name": "Dinesh Samarawickrama",
          "University": "University of Jaffna",
          "Category": "Batsman",
          "Total Runs": "400",
          "Balls Faced": "444",
          "Innings Played": "8",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "27"
        },
        {
          "Name": "Suranga Sandakan",
          "University": "University of Moratuwa",
          "Category": "Batsman",
          "Total Runs": "235",
          "Balls Faced": "261",
          "Innings Played": "5",
          "Wickets": "0",
          "Overs Bowled": "4",
          "Runs Conceded": "36"
        },
        {
          "Name": "Sandakan Dickwella",
          "University": "University of Jaffna",
          "Category": "Batsman",
          "Total Runs": "368",
          "Balls Faced": "408",
          "Innings Played": "8",
          "Wickets": "0",
          "Overs Bowled": "3",
          "Runs Conceded": "27"
        },
        {
          "Name": "Sammu Rajapaksa",
          "University": "University of Ruhuna",
          "Category": "Batsman",
          "Total Runs": "240",
          "Balls Faced": "266",
          "Innings Played": "5",
          "Wickets": "0",
          "Overs Bowled": "2",
          "Runs Conceded": "16"
        },
        {
          "Name": "Suranga Bandara",
          "University": "University of Moratuwa",
          "Category": "Bowler",
          "Total Runs": "154",
          "Balls Faced": "308",
          "Innings Played": "14",
          "Wickets": "46",
          "Overs Bowled": "140",
          "Runs Conceded": "840"
        },
        {
          "Name": "Tharindu Embuldeniya",
          "University": "University of the Visual & Performing Arts",
          "Category": "All-Rounder",
          "Total Runs": "264",
          "Balls Faced": "220",
          "Innings Played": "12",
          "Wickets": "12",
          "Overs Bowled": "60",
          "Runs Conceded": "360"
        }
      ];

    // Convert players array to a readable format for AI
    const playersText = players
      .map(
        (p) =>
          `${p.Name} from ${p.University} is a ${p.Category}. Runs: ${p["Total Runs"]}, Balls Faced: ${p["Balls Faced"]}, Innings: ${p["Innings Played"]}, Wickets: ${p.Wickets}, Overs Bowled: ${p["Overs Bowled"]}, Runs Conceded: ${p["Runs Conceded"]}.`
      )
      .join("\n");

    // Create a structured prompt
    const prompt = `Imagine you are a Cricket Stats Assistant. In this prompt, I have attached a dataset called playerstats containing information about players and their statistics. Additionally, I will provide a query called userquery. Your task is to respond only to that query. When responding to userquery, you must follow these rules:

Rule 1: You must respond to the userquery based on the provided playerstats data.
Rule 2: In your response, do not include the phrase 'based on the given playerstats.' This means you should treat the dataset as your prebuilt data.
Rule 3:If the query contains any irrelevant questions (except if the query is about greeting you or asking about yourself—in such cases, you should greet the user and ask how you can help them), out-of-scope questions, or suggestions unrelated to the playerstats, you should respond with, 'I don’t have enough knowledge to answer that question
Rule 4: You should be able to suggest the best possible team of 11 players based on the data .\n\n${playersText}\n\nUser Query: ${query}`;

    // Generate response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ output: responseText });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
