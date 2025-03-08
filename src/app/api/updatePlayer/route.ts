import { updatePlayer } from "@/firebase/PlayerService";
import { Player } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
    message : string;
    data: any;
    statusCode: StatusCode;
}

export async function POST(req:Request) {
    try {
        const {player_id, player} = await req.json();
        console.log(player);
        const result = updatePlayer(player_id, player);
        return new Response(JSON.stringify(result), { status: 200 });
    }
    catch (error) {
        console.log(error)
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}