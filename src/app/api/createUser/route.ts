import { createUser } from "@/firebase/dbfunctions";
import { User } from "../../../../datamodel/types";

export async function POST(req:Request) {
    const user = await req.json();
    const result = await createUser(user)
    return new Response(JSON.stringify(result), { status: 200 });
}