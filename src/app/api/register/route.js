import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

// NOTE: To match your current login (plain compare), we store password as is.
// For production, hash with bcrypt and update your login accordingly.

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, passwordHash, role, phone, createdAt } = body;

    if (!name || !email || !passwordHash || !role || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();

    // Check if email exists
    const existing = await db
      .request()
      .input("email", email)
      .query("SELECT id FROM Users WHERE email = @email");

    if (existing.recordset.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Insert
    await db
      .request()
      .input("name", name)
      .input("email", email)
      .input("passwordHash", passwordHash)
      .input("role", role)
      .input("phone", phone)
      .input("createdAt", createdAt || new Date().toISOString())
      .query(`
        INSERT INTO Users (name, email, passwordHash, role, phone, createdAt)
        VALUES (@name, @email, @passwordHash, @role, @phone, @createdAt)
      `);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
