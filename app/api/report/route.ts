import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

let _client: Anthropic | null = null;
function getClient() {
  if (_client) return _client;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  _client = new Anthropic({ apiKey: key });
  return _client;
}

/** Fetch real Ofcom data for a postcode — returns null gracefully if unavailable */
async function fetchOfcomData(postcode: string): Promise<string> {
  const broadbandKey = process.env.OFCOM_BROADBAND_API_KEY;
  const mobileKey = process.env.OFCOM_MOBILE_API_KEY;
  if (!broadbandKey && !mobileKey) return '';

  const clean = postcode.replace(/\s/g, '').toUpperCase();
  const lines: string[] = [];

  if (broadbandKey) {
    try {
      const res = await fetch(`https://api.ofcom.org.uk/broadband-coverage/${clean}`, {
        headers: { 'Ocp-Apim-Subscription-Key': broadbandKey, 'Accept': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        lines.push('REAL OFCOM BROADBAND DATA (use this instead of estimating):');
        lines.push(JSON.stringify(data, null, 2));
      }
    } catch { /* non-fatal */ }
  }

  if (mobileKey) {
    try {
      const res = await fetch(`https://api.ofcom.org.uk/mobile-coverage/${clean}`, {
        headers: { 'Ocp-Apim-Subscription-Key': mobileKey, 'Accept': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        lines.push('REAL OFCOM MOBILE DATA (use this instead of estimating):');
        lines.push(JSON.stringify(data, null, 2));
      }
    } catch { /* non-fatal */ }
  }

  return lines.join('\n');
}

/** Extract postcode from address string */
function extractPostcode(address: string): string {
  const match = address.match(/[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}/i);
  return match ? match[0].trim() : '';
}

const REPORT_SCHEMA = `{
  "address": "string",
  "postcode": "string",
  "broadband": {
    "providers": ["array of ISP names"],
    "maxSpeed": "string e.g. '1000 Mbps'",
    "uploadSpeed": "string e.g. '100 Mbps'",
    "latency": "string e.g. '10ms'",
    "fiberAvailable": true,
    "description": "string"
  },
  "shops": [{ "name": "string", "type": "string", "distance": "string" }],
  "schools": [{ "name": "string", "type": "string", "ofstedRating": "string", "distance": "string" }],
  "crime": { "level": "string", "recentStats": "string", "commonTypes": ["string"] },
  "transport": [{ "name": "string", "type": "string", "distance": "string" }],
  "healthcare": [{ "name": "string", "type": "string", "distance": "string" }],
  "gyms": [{ "name": "string", "type": "string", "distance": "string" }],
  "floodRisk": { "riskLevel": "string", "details": "string" },
  "summary": "string"
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { address } = body;
    if (!address?.trim()) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    // Try to get real Ofcom data
    const postcode = extractPostcode(address);
    const ofcomData = postcode ? await fetchOfcomData(postcode) : '';

    const ofcomSection = ofcomData
      ? `\n\nIMPORTANT — Real connectivity data from Ofcom for this postcode:\n${ofcomData}\nUse this real data to populate the broadband section accurately.`
      : '';

    const client = getClient();
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: `You are a UK property intelligence expert. Produce detailed area reports based on your knowledge of the UK. Return ONLY valid JSON matching the schema exactly — no markdown fences, no text outside the JSON.`,
      messages: [{
        role: 'user',
        content: `Generate a detailed property area report for this UK address: "${address}"${ofcomSection}

Return a JSON object matching this schema:
${REPORT_SCHEMA}

Include 3-6 realistic items for shops, schools, transport, healthcare, and gyms. Be specific with real or realistic names.`,
      }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const data = JSON.parse(cleaned);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Report generation error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to generate report: ${msg}` }, { status: 500 });
  }
}
