import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    console.log('Received messages:', messages)

    // Tambahkan pesan sistem di awal daftar pesan
    const systemMessage = {
      role: 'system',
      content: 'Anda adalah AI yang bertugas untuk meresume konten berita. Berikan ringkasan yang jelas dan padat dari konten berita yang diberikan.'
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [systemMessage, ...messages],
    })

    console.log('Stream generated successfully')
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error in chat API:', error)
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request.', details: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}