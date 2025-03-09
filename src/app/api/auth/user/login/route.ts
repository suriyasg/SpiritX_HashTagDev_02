import bcrypt from "bcrypt";
import { StatusCode } from "@/constants/StatusCode";
import { createUser, getUser, getUserByUserName } from "@/firebase/UserService";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { User } from "../../../../../../datamodel/types";

export interface UserInputData {
    username: string;
    password: string;
}

export interface SignUpResponseBody {
    message: string;
    data: User | StatusCode | undefined;
    statusCode: StatusCode;
}

async function checkUser(username: string, password: string) {
    try {
        const result : any = await getUserByUserName(username)
        var response : SignUpResponseBody;
        if(!result) {
            response = {
                message: "DB Error",
                data: undefined,
                statusCode: StatusCode.DB_ERROR
            }
        }
        else if(result === StatusCode.NO_USERS_FOUND) {
            response = {
                message: "Invalid Credentials",
                data: undefined,
                statusCode: StatusCode.NO_USERS_FOUND
            }
        }
        else if(result === StatusCode.DB_ERROR) {
            response = {
                message: "DB Error",
                data: undefined,
                statusCode: StatusCode.DB_ERROR
            }
        }
        else {
            const isMatching = await bcrypt.compare(password, result.password)
            if(isMatching) {
                response = {
                    message: "User Successfully Logged IN!",
                    data: result,
                    statusCode: StatusCode.SUCCESS
                }
            } 
            else {
                response = {
                    message: "Invalid Credentials",
                    data: undefined,
                    statusCode: StatusCode.NO_USERS_FOUND
                }
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
        const result : SignUpResponseBody = await checkUser(username, password);
        if(result.statusCode ===  StatusCode.SUCCESS) {
            const secret = process.env.JWT_SECRET_KEY as string;
            const token = jwt.sign({ username: username, user_id: (result.data as User).user_id }, secret, { expiresIn: '1h' });
            const response = Response.json({...result, data : {user_id: (result.data as User).user_id, username}}, { status: 200, headers : {} });
            cookieStore.set('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 });
            cookieStore.set('username', username, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 }); // to user to login smoothly but security issue in public computers
            return response;
        } 
        else if(result.statusCode ===  StatusCode.DB_ERROR) { // see else can be used
            const response = Response.json(result, { status: 500 });
            return response;
        }
        else if(result.statusCode ===  StatusCode.NO_USERS_FOUND) { // see else can be used
            const response = Response.json(result, { status: 500 });
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
