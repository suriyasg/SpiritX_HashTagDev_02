import bcrypt from "bcrypt";
import { StatusCode } from "@/constants/StatusCode";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createAdmin } from "@/firebase/AdminService";

export interface UserInputData {
  admin_name: string;
  password: string;
}

export interface SignUpResponseBody {
  message: string;
  data: string | undefined;
  statusCode: StatusCode;
}

async function registerUser(admin_name: string, password: string) {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const result = await createAdmin({
      admin_name,
      password: encryptedPassword,
      admin_id: "",
    });
    let response: SignUpResponseBody;
    if (!result) {
      response = {
        message: "User Creation Failed!",
        data: undefined,
        statusCode: StatusCode.FAILED_USER_CREATION,
      };
    } else if (result === StatusCode.USER_ALREADY_EXISTS) {
      response = {
        message: "Username Taken!",
        data: undefined,
        statusCode: StatusCode.USER_ALREADY_EXISTS,
      };
    } else {
      response = {
        message: "User Successfully Created!",
        data: result,
        statusCode: StatusCode.NEW_USER_CREATED,
      };
    }
    return response;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Internal Server Error");
  } finally {
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UserInputData;
    const { admin_name, password } = body;
    const cookieStore = await cookies();

    if (!admin_name || !password) {
      return Response.json(
        {
          message: "admin_name and password are required",
          data: undefined,
          statusCode: StatusCode.INVALID_INPUT,
        } as SignUpResponseBody,
        { status: 400 }
      );
    }
    const result: SignUpResponseBody = await registerUser(admin_name, password);
    if (result.statusCode === StatusCode.NEW_USER_CREATED) {
      const secret = process.env.JWT_SECRET_KEY as string;
      const token = jwt.sign(
        { admin_name: admin_name, user_id: result.data },
        secret,
        { expiresIn: "1h" }
      );
      const response = Response.json(result, { status: 201, headers: {} });
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600,
      });
      cookieStore.set("admin_name", admin_name, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600,
      }); // to user to login smoothly but security issue in public computers
      return response;
    } else if (result.statusCode === StatusCode.FAILED_USER_CREATION) {
      // see else can be used
      const response = Response.json(result, { status: 200 });
      return response;
    } else {
      const response = Response.json(result, { status: 200 });
      return response;
    }
  } catch (err) {
    console.error("error in Sign In :", err);
    const response: SignUpResponseBody = {
      message: "Internal Server Error",
      data: undefined,
      statusCode: StatusCode.SERVER_ERROR,
    };
    return Response.json(response, { status: 500 });
  }
}
