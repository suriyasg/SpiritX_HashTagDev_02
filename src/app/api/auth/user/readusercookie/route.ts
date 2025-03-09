import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { tokendata } from "../login/route";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log(decoded)
    return NextResponse.json({ "username": decoded.username,"user_id":decoded.user_id } as tokendata);
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
