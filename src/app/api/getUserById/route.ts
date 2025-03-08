import { getPlayersByCategory, getUser } from "@/firebase/dbfunctions";
import { Player } from "../../../../datamodel/types";

export async function POST(req:Request) {
    const {user_id} = await req.json();
    console.log(user_id);
    const result = await getUser(user_id)
    return new Response(JSON.stringify(result), { status: 200 }) ;
}