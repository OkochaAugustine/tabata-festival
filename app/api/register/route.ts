// app/api/register/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    console.log("POST /api/register called");

    const data = await req.json();
    console.log("Received registration data:", data);

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log("Invalid email detected:", data.email);
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ✅ Check for duplicate email in Supabase
    console.log("Checking for existing email in Supabase...");
    const { data: existing, error: fetchError } = await supabase
      .from("registrations")
      .select("email")
      .eq("email", data.email)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        console.log("No existing registration found (expected).");
      } else {
        console.error("Error fetching from Supabase:", fetchError);
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
      }
    }

    if (existing) {
      console.log("Duplicate email found:", data.email);
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Generate a unique registration code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log("Generated registration code:", code);

    // Add timestamp
    const timestamp = new Date().toISOString();

    // Insert registration into Supabase
    console.log("Inserting registration into Supabase...");
    const { error: insertError } = await supabase
      .from("registrations")
      .insert([{ ...data, code, timestamp }]);

    if (insertError) {
      console.error("Error inserting into Supabase:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    console.log("Registration successful:", { ...data, code, timestamp });

    return NextResponse.json({ message: "Registration successful", code });
  } catch (err) {
    console.error("Unexpected error in registration API:", err);
    return NextResponse.json({ error: "Failed to register", details: String(err) }, { status: 500 });
  }
}
