import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.ELEVENLABS_API_KEY || !process.env.NEXT_PUBLIC_AGENT_ID) {
      throw new Error(`Missing env vars: hasApiKey=${!!process.env.ELEVENLABS_API_KEY}, hasAgentId=${!!process.env.NEXT_PUBLIC_AGENT_ID}`);
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${process.env.NEXT_PUBLIC_AGENT_ID}`,
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`ElevenLabs API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    return NextResponse.json({ signedUrl: data.signed_url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
