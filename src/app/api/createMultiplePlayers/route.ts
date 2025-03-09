import { createPlayer } from "@/firebase/PlayerService";
import { Player } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
    message : string;
    data: null;
    statusCode: StatusCode;
}

export async function POST(req:Request) {
    try {
        const players : Player[] = await req.json();
        console.log(players);
        
        const playerIds = await Promise.all(players.map(async (player : Player) => {
            return await createPlayer(player);
        }));
        
        console.log("Inserted Player IDs:", playerIds);
    
        if(playerIds) {
            var response : ResponseData = {data: null, message: "Successfully Created Player", statusCode: StatusCode.SUCCESS}
            return new Response(JSON.stringify(response), { status: 200 });
        }
        else{
            var response : ResponseData = {data: null, message: "Failed to Create Player", statusCode: StatusCode.FAILED_PLAYER_CREATION}
            return new Response(JSON.stringify(response), { status: 500 });
        }
    }
    catch (error) {
        console.log(error)
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}