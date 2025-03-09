import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    console.log("Current URL:", request.url);
    console.log("Token:", token ?? "No token");

    // Allow only specific auth-related API routes
    const authAPI = /^\/api\/auth(\/user\/(login|signup)|\/admin\/(login|signup))$/;
    // Restrict all other "/api/*" routes
    const isProtectedAPI = /^\/api\//.test(pathname) && !authAPI.test(pathname);

    // Allow only /auth and its subpages (e.g., /auth/login, /auth/signup)
    const authPage = /^\/auth(\/|$)/;
    // Restrict protected pages
    const isProtectedPage = /^(\/dashboard|\/profile|\/settings|\/admin)/.test(pathname);

    if (token) {
        try {
            const secret = process.env.JWT_SECRET_KEY as string;
            const { payload: decoded } = await jwtVerify(token, new TextEncoder().encode(secret));

            console.log("User is authenticated.");

            // Prevent logged-in users from accessing login/signup pages
            if (authPage.test(pathname)) {
                return NextResponse.redirect(new URL("/home", request.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("JWT verification failed:", error);
            const response = NextResponse.next();
            response.cookies.delete("token"); // Remove invalid token
            return response;
        }
    } else {
        console.log("No token found.");

        // Block protected API routes
        if (isProtectedAPI) {
            console.log("Forbidden API access:", pathname);
            return NextResponse.json({ message: "Access denied!" }, { status: 403 });
        }

        // Redirect to login for protected pages
        if (isProtectedPage) {
            console.log("Redirecting to /login");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}
