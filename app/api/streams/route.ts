export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { TRACKS } from '@/lib/data'

// Simulated per-track stream state (server-side, shared across SSE connections)
// In production this would read from a real-time database (Supabase, Upstash, etc.)
const state: Record<string, number> = Object.fromEntries(
  TRACKS.map(t => [t.id, t.streams])
)

// Listener simulation: Poisson-like random increments
function tick() {
  const activeListeners = Math.floor(50 + Math.random() * 120) // 50-170 active now
  const updates: Record<string, number> = {}

  for (const t of TRACKS) {
    // Popular tracks get more concurrent listeners
    const weight = t.streams / Math.max(...TRACKS.map(x => x.streams))
    const listeners = Math.round(activeListeners * weight * (0.6 + Math.random() * 0.8))
    const increment = Math.floor(Math.random() * (listeners * 0.04 + 1)) // 0-4% of listeners stream at once
    if (increment > 0) {
      state[t.id] += increment
      updates[t.id] = increment
    }
  }

  // Simulate geographic origin for activity feed
  const CITIES = [
    { city: 'Yaoundé', country: '🇨🇲' }, { city: 'Douala', country: '🇨🇲' },
    { city: 'Paris', country: '🇫🇷' },   { city: 'Montréal', country: '🇨🇦' },
    { city: 'Bruxelles', country: '🇧🇪' },{ city: 'Lyon', country: '🇫🇷' },
    { city: 'Toronto', country: '🇨🇦' },  { city: 'New York', country: '🇺🇸' },
    { city: 'Bafoussam', country: '🇨🇲' },{ city: 'Bordeaux', country: '🇫🇷' },
  ]
  const NAMES = ['Kevins', 'Marie', 'Jean', 'Fatoumata', 'Eric', 'Ines', 'Boris', 'Sandra', 'Patrick', 'Carole']

  const events: { name: string; city: string; country: string; trackId: string; trackTitle: string }[] = []
  if (Math.random() > 0.4) { // ~60% chance of an event per tick
    const loc = CITIES[Math.floor(Math.random() * CITIES.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const track = TRACKS[Math.floor(Math.random() * TRACKS.length)]
    events.push({ name, city: loc.city, country: loc.country, trackId: track.id, trackTitle: track.title })
  }

  return {
    streams: Object.fromEntries(TRACKS.map(t => [t.id, state[t.id]])),
    updates,
    activeListeners,
    events,
    ts: Date.now(),
  }
}

export async function GET() {
  const encoder = new TextEncoder()

  const body = new ReadableStream({
    start(controller) {
      // Send initial state immediately
      const initial = tick()
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initial)}\n\n`))

      // Then update every 1.8 seconds
      const interval = setInterval(() => {
        try {
          const payload = tick()
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
        } catch {
          clearInterval(interval)
          controller.close()
        }
      }, 1800)

      // Heartbeat every 25s to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'))
        } catch {
          clearInterval(heartbeat)
        }
      }, 25_000)
    },
  })

  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
