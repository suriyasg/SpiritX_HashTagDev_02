import { addMultiplePlayersToUser, addPlayerToUser } from "@/firebase/UserPlayerService";
import { User } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
    message : string;
    data: any;
    statusCode: StatusCode;
}

interface Result {
    status: StatusCode;
    leftOver: number | null;
} 
type ResultType = Result | Result[];

export async function POST(req:Request) {
    try {
        const {user_id, player_ids} = await req.json();
        console.log({user_id, player_ids});
        const statusCode : ResultType = await addMultiplePlayersToUser(user_id, player_ids)
        
    
        var response : ResponseData = {data: statusCode, message: "", statusCode : StatusCode.SUCCESS}
        return new Response(JSON.stringify(response), { status: 200 });

        // if(statusCode.status === StatusCode.SUCCESS) {
        //     return new Response(JSON.stringify(response), { status: 200 });
        // }
        // else if (statusCode.status === StatusCode.PLAYER_ALREADY_EXISTS) {
        //     return new Response(JSON.stringify(response), { status: 409 });
        // }
        // else if (statusCode.status === StatusCode.NOT_FOUND) {
        //     var response : ResponseData = {data: null, message: "", statusCode: statusCode.status}
        //     return new Response(JSON.stringify(response), { status: 404 });
        // }
        // else {
        //     return new Response(JSON.stringify(response), { status: 500 });
        // }
    }
    catch (error) {
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}