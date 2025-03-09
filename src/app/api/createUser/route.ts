import { createUser } from "@/firebase/UserService";
import { User } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
  message: string;
  data: any;
  statusCode: StatusCode;
}

export async function POST(req:Request) {
    try {
        const user = await req.json();
        const result = await createUser(user)
        return new Response(JSON.stringify(result), { status: 200 });
    }
    catch (error) {
        console.log(error)
        var response : ResponseData = {data: null, message: "Server Error", statusCode: StatusCode.SERVER_ERROR}
        return new Response(JSON.stringify(response), { status: 500 });
    }
}
