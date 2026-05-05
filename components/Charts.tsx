'use client'

import { useLang } from '@/lib/LangContext'
import { TRACKS, ARTISTS, fmtStreams } from '@/lib/data'
import Icon from './Icon'

// Trends are deterministic (weekly / monthly ratio) to avoid hydration mismatch
const TOP_TRACKS = [...TRACKS]
  .sort((a, b) => b.streams - a.streams)
  .slice(0, 8)
  .map(t => ({
    ...t,
    trend: `+${Math.round((t.weeklyStreams / Math.max(t.monthlyStreams, 1)) * 100 * 0.28)}%`,
  }))

export default function Charts() {
  const { t } = useLang()

  return (
    <section id="charts" className="section">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('charts.title')}</h2>
          <p>{t('charts.subtitle')}</p>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '28px 44px 1fr 80px 60px',
            gap: '.875rem', padding: '.6rem 1.125rem',
            borderBottom: '1px solid var(--glass-border)',
            fontSize: '.68rem', fontWeight: 700, color: 'var(--text-3)',
            textTransform: 'uppercase', letterSpacing: '.08em',
          }}>
            <span>#</span><span />
            <span>{t('charts.col_title')}</span>
            <span style={{ textAlign: 'right' }}>{t('charts.col_streams')}</span>
            <span className="track-trend" style={{ textAlign: 'right' }}>{t('charts.col_trend')}</span>
          </div>

          {TOP_TRACKS.map((tr, i) => {
            const artist = ARTISTS.find(a => a.id === tr.artistId)!
            return (
              <div key={tr.id} className="track-row"
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ color: i < 3 ? 'var(--gold)' : 'var(--text-3)', fontSize: '.78rem', fontWeight: 700, textAlign: 'center' }}>{i + 1}</span>
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  background: `hsl(${artist.hue}, 30%, 16%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: `hsl(${artist.hue}, 40%, 55%)`, opacity: .75,
                }}>
                  <Icon name="music" size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--text-1)', lineHeight: 1.3 }}>
                    {tr.title}
                    {tr.explicit && <span style={{ marginLeft: 6, fontSize: '.6rem', background: 'rgba(224,92,92,.15)', color: '#e05c5c', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>E</span>}
                  </div>
                  <div style={{ fontSize: '.74rem', color: 'var(--text-2)', marginTop: '.15rem' }}>
                    {artist.name}
                    {tr.featuring && <span style={{ color: 'var(--text-3)' }}> ft. {tr.featuring.join(', ')}</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                  <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--text-1)' }}>{fmtStreams(tr.streams)}</div>
                </div>
                <div className="track-trend" style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '.76rem', fontWeight: 700, color: 'var(--success)' }}>{tr.trend}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontSize: '.78rem', color: 'var(--text-3)', marginBottom: 0 }}>{t('charts.preview_notice')}</p>
        </div>
      </div>
    </section>
  )
}
