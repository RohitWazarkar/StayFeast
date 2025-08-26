import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_8iadzmfB_6odohe4imZ2efxjQCToohijp");

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, rating, suggestion, phone } = body;

    const createdAt = new Date().toLocaleString();

    await resend.emails.send({
      from: "Feedback Form <onboarding@resend.dev>",
      to: "rohitwazarkar17899@gmail.com",
      subject: "New Feedback Received",
      html: `
        <h2>New Feedback Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Rating:</b> ⭐ ${rating}/5</p>
        <p><b>Suggestion:</b> ${suggestion}</p>
        <p><b>Created At:</b> ${createdAt}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
