import { PropertyReport } from '../types';

/**
 * Fetches a structured property report via our Next.js API route,
 * which calls the Anthropic API server-side.
 */
export async function fetchPropertyReport(address: string): Promise<PropertyReport> {
  const response = await fetch('/api/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate report. Please check the address and try again.');
  }

  return response.json();
}

/**
 * Streams expert deep analysis via our Next.js API route (SSE stream).
 */
export async function* fetchDeepAnalysisStream(report: PropertyReport): AsyncGenerator<string> {
  const response = await fetch('/api/analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ report }),
  });

  if (!response.ok || !response.body) {
    yield 'The model was unable to complete the deep analysis at this time.';
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    // Each chunk is raw text from the streaming response
    const lines = chunk.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) yield parsed.text;
        } catch {
          // non-JSON lines, skip
        }
      }
    }
  }
}

/**
 * Fetches audio TTS for the summary via our Next.js API route.
 * Returns a base64-encoded audio string (PCM/WAV).
 */
export async function fetchAudioSummary(text: string): Promise<string> {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) return '';

    const data = await response.json();
    return data.audio || '';
  } catch {
    return '';
  }
}
