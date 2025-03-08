import { updatePlayer } from "@/firebase/dbfunctions";
import { Player } from "../../../../datamodel/types";

export async function POST(req:Request) {
    const {player_id, player} = await req.json();
    console.log(player);
    const result = updatePlayer(player_id, player);
    return new Response(JSON.stringify(result), { status: 200 });
}