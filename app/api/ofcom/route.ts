import { NextRequest, NextResponse } from 'next/server';

/**
 * Ofcom Connected Nations API proxy
 * Fetches real broadband and mobile coverage data for a UK postcode
 * API keys stored as OFCOM_BROADBAND_API_KEY and OFCOM_MOBILE_API_KEY
 */

export async function POST(req: NextRequest) {
  try {
    const { postcode } = await req.json();
    if (!postcode?.trim()) {
      return NextResponse.json({ error: 'Postcode required' }, { status: 400 });
    }

    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();
    const broadbandKey = process.env.OFCOM_BROADBAND_API_KEY;
    const mobileKey = process.env.OFCOM_MOBILE_API_KEY;

    const results: Record<string, unknown> = { postcode: cleanPostcode };

    // ── Broadband data ────────────────────────────────────────────────────────
    if (broadbandKey) {
      try {
        const bbRes = await fetch(
          `https://api.ofcom.org.uk/broadband-coverage/${cleanPostcode}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': broadbandKey,
              'Accept': 'application/json',
            },
          }
        );
        if (bbRes.ok) {
          results.broadband = await bbRes.json();
        } else {
          const errText = await bbRes.text();
          results.broadband_error = `${bbRes.status}: ${errText.slice(0, 200)}`;
        }
      } catch (err) {
        results.broadband_error = (err as Error).message;
      }
    } else {
      results.broadband_error = 'OFCOM_BROADBAND_API_KEY not configured';
    }

    // ── Mobile data ───────────────────────────────────────────────────────────
    if (mobileKey) {
      try {
        const mobRes = await fetch(
          `https://api.ofcom.org.uk/mobile-coverage/${cleanPostcode}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': mobileKey,
              'Accept': 'application/json',
            },
          }
        );
        if (mobRes.ok) {
          results.mobile = await mobRes.json();
        } else {
          const errText = await mobRes.text();
          results.mobile_error = `${mobRes.status}: ${errText.slice(0, 200)}`;
        }
      } catch (err) {
        results.mobile_error = (err as Error).message;
      }
    } else {
      results.mobile_error = 'OFCOM_MOBILE_API_KEY not configured';
    }

    return NextResponse.json(results);
  } catch (err: unknown) {
    console.error('Ofcom API error:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
