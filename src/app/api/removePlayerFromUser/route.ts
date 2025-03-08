import { removePlayerFromUser } from "@/firebase/UserPlayerService";
import { User } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
    message : string;
    data: any;
    statusCode: StatusCode;
}

export async function POST(req:Request) {
    try {
        const {user_id, player_id} = await req.json();
        console.log({user_id, player_id});
        const statusCode : {status : StatusCode, leftOver : number } | {status : StatusCode, leftOver : null } = await removePlayerFromUser(user_id, player_id)
    
        var response : ResponseData = {data: null, message: statusCode.status, statusCode : statusCode.status}
        // TODO: Change the status of Response accordingly and remove unnessary eles if chains
        if(statusCode.status === StatusCode.SUCCESS) {
            return new Response(JSON.stringify(response), { status: 200 });
        }
        else if (statusCode.status === StatusCode.PLAYER_NOT_FOUND) {
            return new Response(JSON.stringify(response), { status: 404 });
        }
        else if (statusCode.status === StatusCode.USER_NOT_FOUND) {
            return new Response(JSON.stringify(response), { status: 404 });
        }
        else if (statusCode.status === StatusCode.ERROR_CALCULATING_PLAYER_VALUE) {
            return new Response(JSON.stringify(response), { status: 404 });
        }
        else if (statusCode.status === StatusCode.YOU_DONT_HAVE_VALID_MONEY) {
            return new Response(JSON.stringify(response), { status: 404 });
        }
        else if (statusCode.status === StatusCode.ERROR_REMOVING_PLAYER) {
            return new Response(JSON.stringify(response), { status: 404 });
        }
        else {
            return new Response(JSON.stringify(response), { status: 500 });
        }
    }
    catch (error) {
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}