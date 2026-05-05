'use client'

import { useLang } from '@/lib/LangContext'
import { ARTISTS, CAMUCA_LEVELS, fmtStreams } from '@/lib/data'
import Icon from './Icon'

export default function FeaturedArtists() {
  const { t } = useLang()

  return (
    <section id="artists" className="section">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('artists.title')}</h2>
          <p>{t('artists.subtitle')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1.125rem' }}>
          {ARTISTS.map(a => {
            const certLevel = CAMUCA_LEVELS.find(l => l.level === a.certification)
            return (
              <div key={a.id}
                style={{
                  position: 'relative', borderRadius: 'var(--r-md)', overflow: 'hidden',
                  aspectRatio: '3/4', minHeight: 220, cursor: 'pointer',
                  transition: 'transform .25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 40% 30%, hsl(${a.hue},30%,16%) 0%, var(--bg) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: `hsl(${a.hue},40%,55%)`, opacity: .3 }}>
                    <Icon name="mic" size={72} />
                  </span>
                </div>

                {certLevel && (
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    background: `${certLevel.color}22`, border: `1px solid ${certLevel.color}66`,
                    borderRadius: 20, padding: '.2rem .5rem',
                    fontSize: '.6rem', fontWeight: 700, color: certLevel.color,
                    backdropFilter: 'blur(8px)',
                  }}>
                    {certLevel.emoji} {certLevel.label.toUpperCase()}
                  </div>
                )}

                {a.verified && (
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.5rem', fontWeight: 700, color: '#000',
                  }}>✓</div>
                )}

                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,11,20,.95) 0%, transparent 55%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '1rem',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '.92rem', color: 'var(--text-1)', marginBottom: '.15rem' }}>{a.name}</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-2)', marginBottom: '.35rem' }}>{a.genre}</div>
                  <div style={{ fontSize: '.66rem', color: 'var(--text-3)' }}>{fmtStreams(a.streams)} streams</div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontSize: '.8rem', color: 'var(--text-3)', marginBottom: 0 }}>{t('artists.preview_notice')}</p>
        </div>
      </div>
    </section>
  )
}
