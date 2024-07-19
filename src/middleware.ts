import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { pageLinks } from "./constants";

export async function middleware(req: NextRequest) {
  try {
    // Get the token from session
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const url = req.nextUrl.clone();
    if (token) {
      if (!token.user.verified) {
        url.pathname = pageLinks.verify;
        return NextResponse.redirect(url);
      }
    } else {
      url.pathname = pageLinks.login;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/quan-ly/:path*"],
};
