'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

export default function AppSection() {
  const { t } = useLang()

  return (
    <section id="app" className="section">
      <div className="container">
        <div className="card" style={{
          padding: 'clamp(2.5rem,6vw,5rem)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(14,17,32,.96) 0%, rgba(20,15,6,.92) 100%)',
          borderColor: 'rgba(212,168,67,.14)',
        }}>
          {/* Left */}
          <div>
            <span className="gold-rule" />
            <h2 style={{ marginBottom: '1rem' }}>{t('app.title')}</h2>
            <p style={{ maxWidth: '100%', marginBottom: '2rem' }}>{t('app.subtitle')}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem', marginBottom: '2.5rem' }}>
              {([1,2,3] as const).map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
                  <span style={{ color: 'var(--success)', marginTop: '.1rem', flexShrink: 0 }}><Icon name="check-circle" size={18} /></span>
                  <span style={{ fontSize: '.9rem', color: 'var(--text-2)' }}>{t(`app.feature_${n}`)}</span>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { icon: 'smartphone' as const, top: t('app.download_on'), name: 'App Store' },
                { icon: 'download' as const,   top: t('app.get_on'),      name: 'Google Play' },
              ].map(btn => (
                <a key={btn.name} href="#waitlist"
                  style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem 1.5rem', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, color: 'var(--text-1)', transition: 'border-color .2s, background .2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.background='rgba(212,168,67,.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; e.currentTarget.style.background='rgba(255,255,255,.05)'; }}>
                  <span style={{ color: 'var(--text-2)' }}><Icon name={btn.icon} size={24} /></span>
                  <div>
                    <div style={{ fontSize: '.62rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{btn.top}</div>
                    <div style={{ fontSize: '.95rem', fontWeight: 600 }}>{btn.name}</div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <span className="pill pill-muted"><Icon name="smartphone" size={13} /> {t('app.size_label')}</span>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 210, height: 400, borderRadius: 36,
              background: 'linear-gradient(160deg, #191928 0%, #080b14 100%)',
              border: '1.5px solid rgba(212,168,67,.18)',
              boxShadow: '0 0 80px rgba(212,168,67,.07), 0 32px 80px rgba(0,0,0,.6)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Screen glow */}
              <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <span style={{ color: 'var(--gold)', opacity: .7 }}><Icon name="disc" size={52} /></span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--gold)', letterSpacing: '-.01em' }}>NKUMU</div>
              <div style={{ fontSize: '.68rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{t('app.coming_soon')}</div>
              {/* Fake progress */}
              <div style={{ width: '75%', height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 1, marginTop: '.5rem' }}>
                <div style={{ width: '55%', height: '100%', background: 'var(--gold)', borderRadius: 1 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:680px){#app .container > div{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}
