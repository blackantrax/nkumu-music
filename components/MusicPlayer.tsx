'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import { TRACKS as ALL_TRACKS, ARTISTS } from '@/lib/data'
import Icon from './Icon'

// Pick 3 tracks with streams for the demo player
const DEMO = ALL_TRACKS.slice(0, 3).map(t => ({
  title: t.title,
  artist: ARTISTS.find(a => a.id === t.artistId)?.name ?? '',
  dur: t.durationSec,
  explicit: t.explicit ?? false,
}))

const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

export default function MusicPlayer() {
  const { t } = useLang()
  const [idx, setIdx]     = useState(0)
  const [playing, setPlay] = useState(false)
  const [prog, setProg]   = useState(0.28)
  const [vol, setVol]     = useState(0.75)
  const track = DEMO[idx]

  const prev = () => { setIdx(i => (i - 1 + DEMO.length) % DEMO.length); setProg(0) }
  const next = () => { setIdx(i => (i + 1) % DEMO.length); setProg(0) }

  return (
    <div className="player" role="region" aria-label={t('player.demo')}>
      {/* Track info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem', minWidth: 0 }}>
        <div style={{ width: 42, height: 42, borderRadius: 8, background: 'var(--gold-muted)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
          <Icon name="disc" size={20} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {track.title}
            {track.explicit && <span style={{ marginLeft: 6, fontSize: '.55rem', background: 'rgba(224,92,92,.15)', color: '#e05c5c', padding: '1px 4px', borderRadius: 3, fontWeight: 700 }}>E</span>}
          </div>
          <div style={{ fontSize: '.7rem', color: 'var(--text-2)' }}>{track.artist}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem', minWidth: 180 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem' }}>
          <button onClick={prev} aria-label={t('player.prev')} style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer', minHeight: 44, minWidth: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
            <Icon name="prev" size={18} />
          </button>
          <button onClick={() => setPlay(!playing)} aria-label={playing ? t('player.pause') : t('player.play')}
            style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--gold)', border: 'none', color: '#080b14', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .15s', minHeight: 38, minWidth: 38 }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <Icon name={playing ? 'pause' : 'play'} size={16} />
          </button>
          <button onClick={next} aria-label={t('player.next')} style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer', minHeight: 44, minWidth: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
            <Icon name="next" size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%' }}>
          <span style={{ fontSize: '.65rem', color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums', width: 28, textAlign: 'right' }}>{fmt(Math.floor(prog * track.dur))}</span>
          <div className="progress" style={{ flex: 1 }} onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProg((e.clientX - r.left) / r.width) }}>
            <div className="progress-fill" style={{ width: `${prog * 100}%` }} />
          </div>
          <span style={{ fontSize: '.65rem', color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums', width: 28 }}>{fmt(track.dur)}</span>
        </div>
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', justifyContent: 'flex-end' }}>
        <span style={{ color: 'var(--text-2)' }}><Icon name="volume" size={17} /></span>
        <div className="progress" style={{ width: 72 }} onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setVol((e.clientX - r.left) / r.width) }}>
          <div className="progress-fill" style={{ width: `${vol * 100}%` }} />
        </div>
        <span className="pill pill-muted" style={{ fontSize: '.6rem' }}>{t('player.demo')}</span>
      </div>
    </div>
  )
}
