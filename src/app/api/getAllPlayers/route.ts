import { getAllPlayers } from "@/firebase/PlayerService";
import { StatusCode } from "@/constants/StatusCode";

interface ResponseData {
  message: string;
  data: any;
  statusCode: StatusCode;
}

export async function GET(req: Request) {
  try {
    const players = await getAllPlayers();
    return new Response(JSON.stringify(players), { status: 200 });
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
