import { createPlayer } from "@/firebase/dbfunctions";
import { Player } from "../../../../datamodel/types";

export async function POST(req:Request) {
    const player = await req.json();
    console.log(player)
    const result = createPlayer(player)
    return new Response(JSON.stringify(result), { status: 200 });
}