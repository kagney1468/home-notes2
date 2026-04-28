import { NextRequest, NextResponse } from 'next/server';

/**
 * TTS endpoint.
 * Anthropic does not currently offer a text-to-speech API.
 * This route returns an empty audio response so the UI degrades gracefully
 * (the audio player simply doesn't appear).
 *
 * To restore TTS in future, integrate a provider such as:
 *   - ElevenLabs  (ELEVENLABS_API_KEY)
 *   - OpenAI TTS  (OPENAI_API_KEY)
 *   - Azure Cognitive Speech
 *
 * The UI checks for a non-empty `audio` string before rendering the player.
 */
export async function POST(_req: NextRequest) {
  return NextResponse.json({ audio: '' });
}
