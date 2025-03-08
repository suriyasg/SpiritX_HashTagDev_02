import { addPlayerToUser } from "@/firebase/dbfunctions";
import { User } from "../../../../datamodel/types";

export async function POST(req:Request) {
    const {user_id, player_id} = await req.json();
    console.log({user_id, player_id});
    const result = await addPlayerToUser(user_id, player_id)
    return new Response(JSON.stringify(result), { status: 200 });
}