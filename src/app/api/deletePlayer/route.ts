import { createPlayer, deletePlayer } from "@/firebase/PlayerService";
import { Player } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
    message : string;
    data: any;
    statusCode: StatusCode;
}

export async function POST(req:Request) {
    try {
        const {player_id} = await req.json();
        console.log(player_id)
        const result = await deletePlayer(player_id);
    
        if(result) {
            var response : ResponseData = {data: null, message: "Successfully Deleted Player", statusCode: StatusCode.SUCCESS}
            return new Response(JSON.stringify(response), { status: 200 });
        }
        else{
            var response : ResponseData = {data: null, message: "Failed to delete Player", statusCode: StatusCode.FAILED_PLAYER_DELETION}
            return new Response(JSON.stringify(response), { status: 500 });
        }
    }
    catch (error) {
        console.log(error)
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}