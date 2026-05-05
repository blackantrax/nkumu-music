'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ARTISTS, TRACKS, CAMUCA_LEVELS, fmtStreams, type Artist, type Track } from '@/lib/data'
import { getSession, clearSession, type ArtistSession } from '@/lib/auth'

// ── Types ────────────────────────────────────────────────────────────────────
interface StreamEvent { name: string; city: string; country: string; trackId: string; trackTitle: string }
interface SSEPayload {
  streams: Record<string, number>
  updates: Record<string, number>
  activeListeners: number
  events: StreamEvent[]
  ts: number
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) { return fmtStreams(n) }
function fmtXaf(n: number) { return `${n.toLocaleString('fr-FR')} XAF` }

const CERT_COLORS: Record<string, string> = {
  bronze: '#cd7f32', silver: '#c0c0c0', gold: '#d4a843',
  platinum: '#e8e5e0', diamond: '#9ee8ff',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DashboardClient() {
  const router = useRouter()
  const [session, setSession] = useState<ArtistSession | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const s = getSession()
    if (!s) { router.replace('/dashboard/login'); return }
    setSession(s)
    setReady(true)
  }, [router])

  const artistId = session?.artistId ?? 'lifka'
  const artist = ARTISTS.find(a => a.id === artistId) ?? ARTISTS[0]
  const tracks = TRACKS.filter(t => t.artistId === artistId)

  function handleLogout() {
    clearSession()
    router.replace('/dashboard/login')
  }

  // Live state
  const [streams, setStreams] = useState<Record<string, number>>(
    Object.fromEntries(TRACKS.map(t => [t.id, t.streams]))
  )
  const [deltas, setDeltas] = useState<Record<string, number>>({})
  const [activeListeners, setActiveListeners] = useState(0)
  const [connected, setConnected] = useState(false)
  const [activityFeed, setActivityFeed] = useState<(StreamEvent & { id: number })[]>([])
  const feedRef = useRef(0)
  const esRef = useRef<EventSource | null>(null)

  // Calculated values
  const totalStreams = tracks.reduce((s, t) => s + (streams[t.id] ?? t.streams), 0)
  const revenueToday = Math.round(tracks.reduce((s, t) => s + (deltas[t.id] ?? 0), 0) * 2.5 * 3600)
  const certLevel = CAMUCA_LEVELS.find(l => l.level === artist.certification) ?? CAMUCA_LEVELS[0]
  const certIdx = CAMUCA_LEVELS.findIndex(l => l.level === artist.certification)
  const nextLevel = CAMUCA_LEVELS[certIdx + 1]
  const progress = nextLevel
    ? Math.min((totalStreams - (certIdx > 0 ? CAMUCA_LEVELS[certIdx - 1].threshold : 0)) / (nextLevel.threshold - (certIdx > 0 ? CAMUCA_LEVELS[certIdx - 1].threshold : 0)), 1)
    : 1

  const connectSSE = useCallback(() => {
    if (esRef.current) esRef.current.close()
    const es = new EventSource('/api/streams')
    esRef.current = es
    es.onopen = () => setConnected(true)
    es.onerror = () => setConnected(false)
    es.onmessage = (e) => {
      const data: SSEPayload = JSON.parse(e.data)
      setStreams(data.streams)
      setActiveListeners(data.activeListeners)
      if (Object.keys(data.updates).length > 0) {
        setDeltas(prev => {
          const next = { ...prev }
          for (const [id, n] of Object.entries(data.updates)) next[id] = (next[id] ?? 0) + n
          return next
        })
      }
      if (data.events.length > 0) {
        setActivityFeed(prev => [
          ...data.events.map(ev => ({ ...ev, id: ++feedRef.current })),
          ...prev.slice(0, 14),
        ])
      }
    }
    return es
  }, [])

  useEffect(() => {
    const es = connectSSE()
    return () => es.close()
  }, [connectSSE])

  if (!ready) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'var(--text-3)', fontSize: '.9rem' }}>Chargement…</span>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 64 }}>

      {/* ── Top bar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(8,11,20,.96)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1rem,4vw,2.5rem)', height: 60,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '.3rem' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold)' }}>NKUMU</span>
          <span style={{ fontSize: '.55rem', color: 'var(--text-3)', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase' }}>Dashboard</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: connected ? '#4caf82' : '#666',
              boxShadow: connected ? '0 0 0 3px rgba(76,175,130,.2)' : 'none',
              animation: connected ? 'pulse 2s infinite' : 'none',
            }} />
            <span style={{ fontSize: '.78rem', color: connected ? '#4caf82' : 'var(--text-3)', fontWeight: 600, letterSpacing: '.06em' }}>
              {connected ? 'EN DIRECT' : 'RECONNEXION…'}
            </span>
          </div>

          {/* Logged-in artist + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{ fontSize: '.82rem', color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--text-3)' }}>Connecté : </span>
              <strong style={{ color: 'var(--text-1)' }}>{session?.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'var(--surface)', border: '1px solid var(--glass-border)',
                color: 'var(--text-2)', borderRadius: 8, padding: '.3rem .75rem',
                fontSize: '.78rem', cursor: 'pointer', transition: 'border-color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--error)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '2rem' }}>

        {/* ── Artist hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, rgba(8,11,20,0) 100%)',
          border: '1px solid var(--glass-border)', borderRadius: 'var(--r-lg)',
          padding: 'clamp(1.5rem,4vw,2.5rem)',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          marginBottom: '2rem', flexWrap: 'wrap',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: `hsl(${artist.hue},30%,16%)`,
            border: `2px solid ${certLevel.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            fontSize: '1.8rem', fontWeight: 900, color: certLevel.color,
            fontFamily: 'var(--font-serif)',
          }}>
            {artist.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-1)' }}>{artist.name}</span>
              {artist.verified && (
                <span style={{ background: 'var(--gold-muted)', border: '1px solid var(--gold-border)', color: 'var(--gold)', borderRadius: 20, padding: '.15rem .6rem', fontSize: '.65rem', fontWeight: 700 }}>✓ Vérifié</span>
              )}
              <span style={{ background: `${certLevel.color}22`, border: `1px solid ${certLevel.color}55`, color: certLevel.color, borderRadius: 20, padding: '.15rem .7rem', fontSize: '.68rem', fontWeight: 700 }}>
                CAMUCA {certLevel.label.toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: '.85rem', color: 'var(--text-2)', marginTop: '.25rem' }}>{artist.handle} · {artist.genre} · {artist.location}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>
              <LiveNumber value={activeListeners} />
            </div>
            <div style={{ fontSize: '.75rem', color: 'var(--text-2)', marginTop: '.25rem' }}>personnes écoutent maintenant</div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <StatCard icon="▶" label="Streams totaux" value={fmt(totalStreams)} sub={`+${fmt(tracks.reduce((s, t) => s + (deltas[t.id] ?? 0), 0))} aujourd'hui`} accent />
          <StatCard icon="👂" label="Actifs maintenant" value={`${activeListeners}`} sub="auditeurs en direct" live />
          <StatCard icon="💰" label="Revenus estimés" value={fmtXaf(Math.round(totalStreams * 2.5))} sub="à 2.5 XAF / stream" />
          <StatCard icon={certLevel.emoji} label="Certification" value={`CAMUCA ${certLevel.label.toUpperCase()}`} sub={nextLevel ? `${fmt(nextLevel.threshold - totalStreams)} vers ${nextLevel.label}` : 'Niveau maximum'} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── Left column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Live track table */}
            <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-1)' }}>Streams par titre</h3>
                <span style={{ fontSize: '.72rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf82', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  Mise à jour en temps réel
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      {['#', 'Titre', 'Streams', '△ Aujourd\'hui', 'Revenus'].map(h => (
                        <th key={h} style={{ padding: '.6rem 1.25rem', textAlign: h === '#' ? 'center' : 'left', fontSize: '.66rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tracks.map((track, i) => {
                      const curr = streams[track.id] ?? track.streams
                      const delta = deltas[track.id] ?? 0
                      const rev = Math.round(curr * 2.5)
                      const pct = totalStreams > 0 ? (curr / totalStreams) * 100 : 0
                      return (
                        <tr key={track.id} style={{ borderBottom: '1px solid rgba(212,168,67,.04)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.025)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ padding: '.8rem 1.25rem', color: 'var(--text-3)', textAlign: 'center', fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ padding: '.8rem 1.25rem' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.3 }}>{track.title}</div>
                            {track.featuring && <div style={{ fontSize: '.72rem', color: 'var(--text-2)', marginTop: '.1rem' }}>ft. {track.featuring.join(', ')}</div>}
                            <div style={{ marginTop: '.35rem', height: 3, borderRadius: 2, background: 'var(--surface-2)', overflow: 'hidden', width: 100 }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gold)', borderRadius: 2 }} />
                            </div>
                          </td>
                          <td style={{ padding: '.8rem 1.25rem', color: 'var(--text-1)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                            <LiveNumber value={curr} />
                          </td>
                          <td style={{ padding: '.8rem 1.25rem' }}>
                            {delta > 0 && (
                              <span style={{ color: '#4caf82', fontWeight: 700, fontSize: '.8rem' }}>
                                +{fmt(delta)}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '.8rem 1.25rem', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>{fmtXaf(rev)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CAMUCA progress */}
            <section style={{ background: 'var(--surface)', border: `1px solid ${certLevel.color}33`, borderRadius: 'var(--r-lg)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-1)' }}>Progression CAMUCA</h3>
                <span style={{ fontSize: '1.5rem' }}>{certLevel.emoji}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem', fontSize: '.8rem' }}>
                <span style={{ color: certLevel.color, fontWeight: 700 }}>CAMUCA {certLevel.label.toUpperCase()}</span>
                {nextLevel && <span style={{ color: 'var(--text-2)' }}>Prochain: {nextLevel.emoji} {nextLevel.label}</span>}
              </div>
              <div style={{ height: 10, background: 'var(--surface-2)', borderRadius: 5, overflow: 'hidden', marginBottom: '.5rem' }}>
                <div style={{ height: '100%', width: `${Math.round(progress * 100)}%`, background: certLevel.color, borderRadius: 5, transition: 'width .5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: 'var(--text-3)' }}>
                <span>{fmt(totalStreams)} streams</span>
                {nextLevel && <span>Objectif: {fmt(nextLevel.threshold)}</span>}
              </div>
              {nextLevel && (
                <p style={{ marginTop: '.75rem', fontSize: '.8rem', color: 'var(--text-2)', marginBottom: 0 }}>
                  Encore <strong style={{ color: 'var(--text-1)' }}>{fmt(nextLevel.threshold - totalStreams)}</strong> streams pour atteindre le niveau <strong style={{ color: nextLevel.color }}>{nextLevel.label}</strong>. Au rythme actuel, estimation dans <strong style={{ color: 'var(--text-1)' }}>~{Math.ceil((nextLevel.threshold - totalStreams) / Math.max(1, Math.round(tracks.reduce((s, t) => s + (t.monthlyStreams ?? 0), 0) / 30)))} jours</strong>.
                </p>
              )}
            </section>

            {/* Audience breakdown */}
            <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-lg)', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-1)', marginBottom: '1.25rem' }}>Audience géographique</h3>
              {[
                { label: '🇨🇲 Cameroun', pct: 62 },
                { label: '🇫🇷 France',   pct: 18 },
                { label: '🇨🇦 Canada',   pct: 9  },
                { label: '🇧🇪 Belgique', pct: 6  },
                { label: '🌍 Autres',    pct: 5  },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.75rem' }}>
                  <span style={{ fontSize: '.82rem', color: 'var(--text-2)', width: 110, flexShrink: 0 }}>{row.label}</span>
                  <div style={{ flex: 1, height: 6, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${row.pct}%`, background: 'var(--success)', borderRadius: 3, transition: 'width .8s ease' }} />
                  </div>
                  <span style={{ fontSize: '.78rem', color: 'var(--text-3)', width: 30, textAlign: 'right' }}>{row.pct}%</span>
                </div>
              ))}
            </section>
          </div>

          {/* ── Right column: activity feed ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4caf82', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-1)' }}>Activité en direct</h3>
              </div>
              <div style={{ padding: '1rem', maxHeight: 400, overflowY: 'auto' }}>
                {activityFeed.length === 0 ? (
                  <p style={{ color: 'var(--text-3)', fontSize: '.8rem', textAlign: 'center', padding: '1.5rem 0', marginBottom: 0 }}>En attente d'activité…</p>
                ) : activityFeed.map(ev => (
                  <div key={ev.id} style={{
                    display: 'flex', gap: '.75rem', padding: '.65rem 0',
                    borderBottom: '1px solid rgba(212,168,67,.05)',
                    animation: 'fadeIn .4s ease',
                  }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{ev.country}</span>
                    <div>
                      <span style={{ fontSize: '.8rem', color: 'var(--text-1)', fontWeight: 600 }}>{ev.name}</span>
                      <span style={{ fontSize: '.8rem', color: 'var(--text-2)' }}> depuis {ev.city} écoute </span>
                      <span style={{ fontSize: '.8rem', color: 'var(--gold)', fontWeight: 600 }}>{ev.trackTitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick stats */}
            <section style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-lg)', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-1)', marginBottom: '1rem' }}>Ce mois-ci</h3>
              {[
                { label: 'Streams', value: fmt(tracks.reduce((s, t) => s + (t.monthlyStreams ?? 0), 0)) },
                { label: 'Cette semaine', value: fmt(tracks.reduce((s, t) => s + (t.weeklyStreams ?? 0), 0)) },
                { label: 'Revenus (mois)', value: fmtXaf(Math.round(tracks.reduce((s, t) => s + (t.monthlyStreams ?? 0), 0) * 2.5)) },
                { label: 'Abonnés', value: fmt(artist.subscribers) },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0', borderBottom: '1px solid rgba(212,168,67,.05)' }}>
                  <span style={{ fontSize: '.82rem', color: 'var(--text-2)' }}>{row.label}</span>
                  <span style={{ fontSize: '.82rem', color: 'var(--text-1)', fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: .4 } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent, live }: {
  icon: string; label: string; value: string; sub?: string; accent?: boolean; live?: boolean
}) {
  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid ${accent ? 'var(--gold-border)' : 'var(--glass-border)'}`,
      borderRadius: 'var(--r-md)', padding: '1.25rem 1.5rem',
    }}>
      <div style={{ fontSize: '1.4rem', marginBottom: '.5rem' }}>{icon}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: accent ? 'var(--gold)' : 'var(--text-1)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {live && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4caf82', display: 'inline-block', animation: 'pulse 2s infinite', flexShrink: 0 }} />}
      </div>
      <div style={{ fontSize: '.72rem', color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.2rem' }}>{label}</div>
      {sub && <div style={{ fontSize: '.72rem', color: 'var(--text-2)', marginTop: '.25rem' }}>{sub}</div>}
    </div>
  )
}

// Animated number that smoothly updates
function LiveNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value)
  const prev = useRef(value)

  useEffect(() => {
    if (value === prev.current) return
    prev.current = value
    // Quickly snap to new value (numbers are already incrementing live via SSE)
    setDisplayed(value)
  }, [value])

  return <span>{fmt(displayed)}</span>
}
