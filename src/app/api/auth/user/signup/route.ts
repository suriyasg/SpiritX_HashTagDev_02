import bcrypt from "bcrypt";
import { StatusCode } from "@/constants/StatusCode";
import { createUser } from "@/firebase/UserService";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export interface UserInputData {
    username: string;
    password: string;
}

export interface SignUpResponseBody {
    message: string;
    data: string | undefined;
    statusCode: StatusCode;
}

async function registerUser(username: string, password: string) {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const result = await createUser({
            username, 
            password : encryptedPassword,
            user_id: "",
            money: 9000000
        })
        var response : SignUpResponseBody;
        if(!result) {
            response = {
                message: "User Creation Failed!",
                data: undefined,
                statusCode: StatusCode.FAILED_USER_CREATION
            }
        }
        else if(result === StatusCode.USER_ALREADY_EXISTS) {
            response = {
                message: "Username Taken!",
                data: undefined,
                statusCode: StatusCode.USER_ALREADY_EXISTS
            }
        }
        else {
            response = {
                message: "User Successfully Created!",
                data: result,
                statusCode: StatusCode.NEW_USER_CREATED
            }
        }
        return response;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Internal Server Error")
    } finally {

    }
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as UserInputData;
        const { username, password } = body;
        const cookieStore = await cookies();

        if (!username || !password) {
            return Response.json(
                { message: "username and password are required", data: undefined, statusCode: StatusCode.INVALID_INPUT } as SignUpResponseBody,
                { status: 400 }
            );
        }
        const result : SignUpResponseBody = await registerUser(username, password);
        if(result.statusCode ===  StatusCode.NEW_USER_CREATED) {
            const secret = process.env.JWT_SECRET_KEY as string;
            const token = jwt.sign({ username: username, user_id: result.data }, secret, { expiresIn: '1h' });
            const response = Response.json(result, { status: 201, headers : {} });
            cookieStore.set('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 });
            cookieStore.set('username', username, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 }); // to user to login smoothly but security issue in public computers
            return response;
        } 
        else if(result.statusCode ===  StatusCode.FAILED_USER_CREATION) { // see else can be used
            const response = Response.json(result, { status: 200 });
            return response;
        }
        else {
            const response = Response.json(result, { status: 200 });
            return response;
        }
    } catch (err) {
        console.error("error in Sign In :", err);
        const response : SignUpResponseBody = {
            message: "Internal Server Error",
            data: undefined,
            statusCode: StatusCode.SERVER_ERROR
        }
        return Response.json(response, {status : 500});
    }
}
