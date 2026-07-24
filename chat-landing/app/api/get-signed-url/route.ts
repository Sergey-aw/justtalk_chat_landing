import { NextRequest, NextResponse } from 'next/server';
import { AGENT_IDS } from '@/lib/agents';

export async function GET(req: NextRequest) {
  try {
    const defaultAgentId = process.env.NEXT_PUBLIC_AGENT_ID;

    if (!process.env.ELEVENLABS_API_KEY || !defaultAgentId) {
      throw new Error(`Missing env vars: hasApiKey=${!!process.env.ELEVENLABS_API_KEY}, hasAgentId=${!!defaultAgentId}`);
    }

    // Per-card agent id, but allow-listed: only ids we actually ship (or the env default)
    // are honoured, so nobody can use our key to open a session on an arbitrary agent.
    const requested = req.nextUrl.searchParams.get('agentId');
    const agentId =
      requested && (AGENT_IDS.has(requested) || requested === defaultAgentId)
        ? requested
        : defaultAgentId;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
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
