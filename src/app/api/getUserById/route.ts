import { getUser } from "@/firebase/UserService";
import { User } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";
import { NextResponse } from "next/server";

interface ResponseData {
    message : string;
    data: any;
    statusCode: StatusCode;
}

export async function POST(req:Request) {
    try {
        const {user_id} = await req.json();
        console.log(user_id);
        const result = await getUser(user_id)
        console.log("hiiii",result)
        return NextResponse.json({result}, { status: 200 }) ;
    }
    catch (error) {
        console.log(error)
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}