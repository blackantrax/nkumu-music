// Demo artist credentials — in production, replace with real auth (NextAuth, Supabase Auth, etc.)
export const DEMO_ARTISTS: Record<string, { password: string; artistId: string; name: string }> = {
  'lifka@nkumu.com':         { password: 'lifka2025',    artistId: 'lifka',        name: 'LiFkA' },
  'mondo@nkumu.com':         { password: 'mondo2025',    artistId: 'mondo-mubany', name: 'MondoMubany' },
  'pascal@nkumu.com':        { password: 'pascal2025',   artistId: 'pascal',       name: 'Pascal' },
  'stevedo@nkumu.com':       { password: 'stevedo2025',  artistId: 'stevedo',      name: 'Stevedo' },
  'ngahrosine@nkumu.com':    { password: 'ngah2025',     artistId: 'ngahrosine',   name: 'Ngahrosine' },
  'lifkanoma@nkumu.com':     { password: 'lili2025',     artistId: 'lili-anoma',   name: 'Lili Anoma' },
  'diablit@nkumu.com':        { password: 'diablit2025',  artistId: 'diablit',      name: 'Diablit' },
  'simba@nkumu.com':          { password: 'simba2025',    artistId: 'simba-draken', name: 'Simba Draken' },
  'trois@nkumu.com':          { password: 'trois2025',    artistId: 'trois-off',    name: 'Trois Officiel' },
  // Demo shortcut for testing
  'demo@nkumu.com':          { password: 'nkumu2025',    artistId: 'lifka',        name: 'LiFkA (Demo)' },
}

export const SESSION_KEY = 'nkumu_artist_session'

export interface ArtistSession {
  artistId: string
  name: string
  email: string
  expiresAt: number
}

export function getSession(): ArtistSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session: ArtistSession = JSON.parse(raw)
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function saveSession(session: Omit<ArtistSession, 'expiresAt'>) {
  const full: ArtistSession = {
    ...session,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(full))
}

export function clearSession() {
  if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY)
}
