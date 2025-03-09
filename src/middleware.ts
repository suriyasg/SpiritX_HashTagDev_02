import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    console.log("Current URL:", request.url);
    console.log("Token:", token ?? "No token");

    const authRoutes = ["/api/auth/admin/login", "/api/auth/admin/signup", "/api/auth/user/login", "/api/auth/user/signup"];
    const authPages = ["admin/auth", "user/auth"];

    const adminProtectedRoutes = ["/api/createPlayer", "/api/deletePlayer", "/api/updatePlayer", "/api/getUserById"];
    const userProtectedRoutes = ["/api/addMultiplePlayersToUser", "/api/addPlayerToUser",  "/api/getAllPlayers", "/api/getLeaderBoard", "/api/getPlayerByCategory", "/api/removePlayerFromUser"];

    const adminProtectedPages = ["/admin/dashboard", "/admin/new-player"];
    const userProtectedPages = ["/user/dashboard", "/user/dashboard/budget", "/user/dashboard/leaderboard", "/user/dashboard/players", "/user/dashboard/players"];

    const isAuthPage = authPages.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)

    const isAdminProtectedRoute = adminProtectedRoutes.includes(pathname)
    const isUserProtectedRoute = userProtectedRoutes.includes(pathname)

    const isAdminProtectedPages = adminProtectedPages.includes(pathname);
    const isUserProtectedPages = userProtectedPages.includes(pathname);

    if (token) {
        try {
            const secret = process.env.JWT_SECRET_KEY as string;
            const { payload: decoded } = await jwtVerify(token, new TextEncoder().encode(secret));
            if(decoded.admin_name) {
                console.log("admin token")
            }
            console.log("User is authenticated.");
            // Prevent logged-in users from accessing login/signup pages
            if (isAuthPage) {
                console.log("auth page", pathname);
                if (decoded.admin_name) { // admin token
                    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
                }
                else {
                    return NextResponse.redirect(new URL("/user/dashboard", request.url));
                }
            }
            else if (isAuthRoute) {
                if (decoded.admin_name) {
                    return NextResponse.json({ message: "Already Admin Authenticated" }, { status: 200 });
                }
                else {
                    return NextResponse.json({ message: "Already User Authenticated" }, { status: 200 });
                }
            }
            else if (isAdminProtectedPages) {
                console.log("admin protected page", pathname);
                if (decoded.admin_name) {
                    return NextResponse.next();
                }
                else {
                    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
                }
            }
            else if (isAdminProtectedRoute) {
                if (decoded.admin_name) {
                    return NextResponse.next();
                }
                else {
                    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
                }
            }
            else if (isUserProtectedPages) {
                console.log("user protected page", pathname);
                if (decoded.admin_name) { // since admin don't have user charateristics we redirect him to log in as user
                    const response = NextResponse.next();
                    response.cookies.delete("token"); // Remove invalid token
                    return response;
                }
                else {
                    return NextResponse.next();
                }
            }
            else if (isUserProtectedRoute) {
                if (decoded.admin_name) { // we can allow him if he want to fetch any data from common endpoints
                    return NextResponse.next();
                }
                else {
                    return NextResponse.next();
                }
            }
            return NextResponse.next();
        } catch (error) {
            console.error("JWT verification failed:", error);
            const response = NextResponse.next();
            response.cookies.delete("token"); // Remove invalid token
            return response;
        }
    }
    else {
        console.log("No token found.");
        if (isAuthPage) {
            console.log("auth page", pathname);
            // return NextResponse.redirect(new URL("/admin/auth/login", request.url));
        }
        else if (isAuthRoute) {
            // return NextResponse.next();
        }
        else if (isAdminProtectedPages) {
            console.log("admin protected page", pathname);
            return NextResponse.redirect(new URL("/admin/auth/login", request.url));
        }
        else if (isAdminProtectedRoute) {
            return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
        }
        else if (isUserProtectedPages) {
            console.log("user protected page", pathname);
            return NextResponse.redirect(new URL("/user/auth/login", request.url));
        }
        else if (isUserProtectedRoute) {
            return NextResponse.json({ message: "Forbidden!" }, { status: 403 });

        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
        '/login'
    ],
}
