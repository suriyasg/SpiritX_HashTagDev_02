import { createPlayer } from "@/firebase/PlayerService";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
  message: string;
  data: any;
  statusCode: StatusCode;
}

export async function POST(req: Request) {
  try {
    const player = await req.json();
    console.log(player);
    const player_id = await createPlayer(player);

    if (player_id) {
      const response: ResponseData = {
        data: null,
        message: "Successfully Created Player",
        statusCode: StatusCode.SUCCESS,
      };
      return new Response(JSON.stringify(response), { status: 200 });
    } else {
      const response: ResponseData = {
        data: null,
        message: "Failed to Create Player",
        statusCode: StatusCode.FAILED_PLAYER_CREATION,
      };
      return new Response(JSON.stringify(response), { status: 500 });
    }
  } catch (error) {
    console.log(error);
    const response: ResponseData = {
      data: null,
      message: "Server Error",
      statusCode: StatusCode.SERVER_ERROR,
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
