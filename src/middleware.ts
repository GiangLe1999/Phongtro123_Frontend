import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { pageLinks } from "./constants";

export async function middleware(req: NextRequest) {
  // try {
  //   // Get the token from session
  //   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //   const url = req.nextUrl.clone();
  //   if (
  //     req.nextUrl.pathname === pageLinks.login ||
  //     req.nextUrl.pathname === pageLinks.register
  //   ) {
  //     if (token) {
  //       url.pathname = pageLinks.home;
  //       return NextResponse.redirect(url);
  //     } else {
  //       return NextResponse.next();
  //     }
  //   }
  //   if (req.nextUrl.pathname === pageLinks.verify) {
  //     if (!token || (token && !token.user.verified)) {
  //       return NextResponse.next();
  //     } else {
  //       url.pathname = pageLinks.home;
  //       return NextResponse.redirect(url);
  //     }
  //   }
  //   if (token) {
  //     console.log(token.user.verified);
  //     if (!token.user.verified) {
  //       url.pathname = pageLinks.verify;
  //       return NextResponse.redirect(url);
  //     }
  //   } else {
  //     url.pathname = pageLinks.login;
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("Middleware error:", error);
  //   return NextResponse.next();
  // }
}

export const config = {
  // matcher: [
  //   "/quan-ly/:path*",
  //   "/xac-thuc-tai-khoan",
  //   "/dang-nhap-tai-khoan",
  //   "/dang-ky-tai-khoan",
  // ],
};
