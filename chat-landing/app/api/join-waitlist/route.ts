import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const loopsApiKey = process.env.LOOPS_API_KEY;
    const loopsListId = process.env.LOOPS_LIST_ID;

    if (!loopsApiKey) {
      console.error("Loops API key not configured");
      return NextResponse.json(
        { success: false, error: "Service not configured" },
        { status: 500 }
      );
    }

    console.log("Adding contact to Loops.so:", email);

    // Prepare request body
    const requestBody: {
      email: string;
      source: string;
      userGroup: string;
      mailingLists?: { [key: string]: boolean };
    } = {
      email: email,
      source: "JustTalk Platform Waitlist",
      userGroup: "waitlist",
    };

    // If LOOPS_LIST_ID is provided, add the contact to that specific mailing list
    if (loopsListId) {
      requestBody.mailingLists = { [loopsListId]: true };
    }

    // Create or update contact in Loops
    const loopsResponse = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${loopsApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const loopsData = await loopsResponse.json();

    if (!loopsResponse.ok) {
      // If contact already exists, that's okay
      if (loopsResponse.status === 409 || loopsData.message?.includes("already exists")) {
        return NextResponse.json({
          success: true,
          message: "You are in the waitlist already.",
          alreadyExists: true,
        });
      }
      
      console.error("Loops API error:", loopsData);
      return NextResponse.json(
        { success: false, error: "Failed to join waitlist" },
        { status: 400 }
      );
    }

    console.log("Successfully added to Loops:", loopsData);

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist!",
      alreadyExists: false,
    });
  } catch (error: any) {
    console.error("Error in join-waitlist:", error);
    
    return NextResponse.json(
      { success: false, error: error.message || "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
