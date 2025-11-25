// app/api/admin/registrations/route.ts
import { NextResponse } from "next/server";
import { supabaseClient } from "@/app/lib/supabase"; // <-- use your actual export

export async function GET() {
  try {
    console.log("Admin API called. Fetching registrations from Supabase...");

    const { data: registrations, error } = await supabaseClient
      .from("registrations")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
      return NextResponse.json({
        success: false,
        error: error.message,
        registrations: [],
      });
    }

    console.log("Fetched registrations:", registrations);

    return NextResponse.json({
      success: true,
      registrations,
    });
  } catch (err) {
    console.error("Admin API GET error:", err);
    return NextResponse.json({
      success: false,
      error: String(err),
      registrations: [],
    });
  }
}
