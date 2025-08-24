import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function middleware(req) {
  // ✅ Support both cookie and header
  const token =
    req.cookies.get("auth_token")?.value ||
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  // If no token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Verify JWT
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// ✅ Apply only to /dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
