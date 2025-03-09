import { addPlayerToUser } from "@/firebase/UserPlayerService";
import { User } from "../../../../datamodel/types";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
  message: string;
  data: any;
  statusCode: StatusCode;
}

export async function POST(req: Request) {
  try {
    const { user_id, player_id } = await req.json();
    console.log({ user_id, player_id });
    const statusCode:
      | { status: StatusCode; leftOver: number }
      | { status: StatusCode; leftOver: null } = await addPlayerToUser(
      user_id,
      player_id
    );

    const response: ResponseData = {
      data: null,
      message: statusCode.status,
      statusCode: statusCode.status,
    };

    if (statusCode.status === StatusCode.SUCCESS) {
      return new Response(JSON.stringify(response), { status: 200 });
    } else if (statusCode.status === StatusCode.PLAYER_ALREADY_EXISTS) {
      return new Response(JSON.stringify(response), { status: 409 });
    } else if (statusCode.status === StatusCode.NOT_FOUND) {
      const response: ResponseData = {
        data: null,
        message: "",
        statusCode: statusCode.status,
      };
      return new Response(JSON.stringify(response), { status: 404 });
    } else {
      return new Response(JSON.stringify(response), { status: 500 });
    }
  } catch (error) {
    const response: ResponseData = {
      data: null,
      message: "Server Error",
      statusCode: StatusCode.SERVER_ERROR,
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
