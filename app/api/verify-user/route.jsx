// api/verify-user.js
import { db } from "@/config/db"; // Assuming you're using Drizzle ORM or another database ORM
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name, imageUrl } = await req.json();

  console.log("Received request data:", { email, name, imageUrl });

  try {
    // Check if user already exists in the database
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    console.log("Existing user check:", existingUser);

    if (existingUser.length > 0) {
      return NextResponse.json({ result: existingUser[0] });
    }

    // If user doesn't exist, insert new user into the database
    const newUser = await db
      .insert(Users)
      .values({
        name: name,
        email: email,
        imageUrl: imageUrl,
      })
      .returning();

    console.log("New user created:", newUser);

    return NextResponse.json({ result: newUser[0] });

  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json({ error: "Failed to verify user" }, { status: 500 });
  }
}
