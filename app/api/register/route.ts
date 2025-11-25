// app/api/register/route.ts
import { NextResponse } from "next/server";
import { supabaseClient } from "@/app/lib/supabase"; // <- use the client

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check for duplicates
    const { data: existing, error: fetchError } = await supabaseClient
      .from("registrations")
      .select("email")
      .eq("email", data.email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Generate code & insert
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = new Date().toISOString();

    const { error: insertError } = await supabaseClient
      .from("registrations")
      .insert([{ ...data, code, timestamp }]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Registration successful", code });
  } catch (err) {
    return NextResponse.json({ error: "Failed to register", details: String(err) }, { status: 500 });
  }
}
