// pages/api/middleware.ts

import { NextApiResponse, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the token from session
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
      // Attach the token to the request headers
      req.headers[
        "Authorization"
      ] = `Bearer ${token.backendTokens.accessToken}`;
    }

    // Continue to the next handler
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    throw error;
  }
}
