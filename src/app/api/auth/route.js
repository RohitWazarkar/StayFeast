import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";   // ✅ named import

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const db = await connectDB();

    // Fetch user by email
    const result = await db
      .request()
      .input("email", email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    const user = result.recordset[0];

    // If passwords are stored as plain text (like your sample row)
    const isMatch = password === user.passwordHash;

    // If you switch to bcrypt later, use this instead:
    // const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"; 
const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  JWT_SECRET,
  { expiresIn: "1h" }
);

    return NextResponse.json({ token, user });
  } catch (err) {
    console.error("❌ Login API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
