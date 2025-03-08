import { getPlayersByCategory } from "@/firebase/dbfunctions";
import { Player } from "../../../../datamodel/types";

export async function POST(req:Request) {
    const {category} = await req.json();
    console.log(category);
    const players = await getPlayersByCategory(category)
    return new Response(JSON.stringify(players), { status: 200 }) ;
}