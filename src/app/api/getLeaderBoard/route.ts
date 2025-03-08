import { generateLeaderBoard } from "@/firebase/LeaderBoardService";
import { LeaderBoardRecord } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";


// we won't use this unless we need static leader board 
// we will use listeners in frontend instead for Real Time updates

interface ResponseData {
    message: string;
    data: any;
    statusCode: StatusCode;
}

export async function GET(req: Request) {
    try {
        const players = await generateLeaderBoard();
        return new Response(JSON.stringify(players), { status: 200 });
    }
    catch (error) {
        console.log(error)
        var response: ResponseData = { data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR }
        return new Response(JSON.stringify(response), { status: 500 });
    }
}