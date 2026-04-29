import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

// Lazy init — avoids module-load-time crash if env var isn't available
let _client: Anthropic | null = null;
function getClient() {
  if (_client) return _client;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  _client = new Anthropic({ apiKey: key });
  return _client;
}

const REPORT_SCHEMA = `{
  "address": "string - the full address as provided",
  "postcode": "string - the UK postcode",
  "broadband": {
    "providers": ["array of ISP names available in the area"],
    "maxSpeed": "string e.g. '1000 Mbps'",
    "uploadSpeed": "string e.g. '100 Mbps'",
    "latency": "string e.g. '10ms'",
    "fiberAvailable": true,
    "description": "string - short description of broadband situation"
  },
  "shops": [
    { "name": "string", "type": "string e.g. Supermarket", "distance": "string e.g. '0.3 miles'" }
  ],
  "schools": [
    { "name": "string", "type": "string e.g. Primary/Secondary", "ofstedRating": "string e.g. Outstanding/Good", "distance": "string e.g. '0.5 miles'" }
  ],
  "crime": {
    "level": "string e.g. Low/Medium/High",
    "recentStats": "string - brief stats description",
    "commonTypes": ["array of common crime types"]
  },
  "transport": [
    { "name": "string", "type": "string e.g. Train/Bus/Tube", "distance": "string" }
  ],
  "healthcare": [
    { "name": "string", "type": "string e.g. GP Surgery/Hospital/Dentist", "distance": "string" }
  ],
  "gyms": [
    { "name": "string", "type": "string e.g. Gym/Leisure Centre/Yoga Studio", "distance": "string" }
  ],
  "floodRisk": {
    "riskLevel": "string e.g. Very Low/Low/Medium/High",
    "details": "string - details about flood history and risk factors"
  },
  "summary": "string - 2-3 sentence overall summary of the area for someone considering moving there"
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { address } = body;

    if (!address?.trim()) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const client = getClient();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: `You are a UK property intelligence expert. When given an address, produce a detailed area report based on your knowledge of the UK. Return ONLY valid JSON matching the schema exactly. Do not include markdown fences or any text outside the JSON object.`,
      messages: [
        {
          role: 'user',
          content: `Generate a detailed property area report for this UK address: "${address}"

Return a JSON object matching this schema exactly:
${REPORT_SCHEMA}

Include realistic, plausible data based on your knowledge of the area. For shops, schools, transport, healthcare, and gyms include 3-6 items each. Be specific with real or realistic names.`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    // Strip any accidental markdown fences
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();

    const data = JSON.parse(cleaned);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Report generation error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    // Return specific error to help debug
    return NextResponse.json(
      { error: `Failed to generate report: ${msg}` },
      { status: 500 }
    );
  }
}
