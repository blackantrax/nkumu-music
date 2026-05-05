'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

const CERTS = [
  { label: 'Bronze',   threshold: '10 000',     hex: '#cd7f32', glow: 'rgba(205,127,50,.3)' },
  { label: 'Argent',   threshold: '50 000',     hex: '#c0c0c0', glow: 'rgba(192,192,192,.25)' },
  { label: 'Or',       threshold: '100 000',    hex: '#d4a843', glow: 'rgba(212,168,67,.35)' },
  { label: 'Platine',  threshold: '500 000',    hex: '#e8e5e0', glow: 'rgba(229,228,226,.25)' },
  { label: 'Diamant',  threshold: '1 000 000',  hex: '#9ee8ff', glow: 'rgba(158,232,255,.3)' },
]

export default function CertificationsSection() {
  const { t } = useLang()

  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('certifications.title')}</h2>
          <p>{t('certifications.subtitle')}</p>
        </div>

        {/* CAMUCA intro */}
        <div className="card card-gold" style={{ padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.75rem', alignItems: 'center' }}>
          <div className="why-icon" style={{ width: 64, height: 64, borderRadius: 18 }}>
            <Icon name="shield" size={28} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.5rem' }}>CAMUCA</div>
            <p style={{ maxWidth: '100%', marginBottom: 0, lineHeight: 1.75 }}>{t('certifications.camuca_description')}</p>
          </div>
        </div>

        {/* Certification levels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.125rem', marginBottom: '3.5rem' }}>
          {CERTS.map(c => (
            <div key={c.label} className="card cert-card" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem', filter: `drop-shadow(0 0 14px ${c.glow})` }}>
                <Icon name="badge" size={40} style={{ color: c.hex }} />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: c.hex, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.5rem' }}>
                {c.label}
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--text-2)' }}>
                {c.threshold}
                <br />
                <span style={{ color: 'var(--text-3)', fontSize: '.7rem' }}>{t('certifications.streams_label')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h3>{t('certifications.process_title')}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {([1, 2, 3, 4] as const).map(n => (
            <div key={n} className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="step-num">{n}</div>
              <div>
                <h4 style={{ marginBottom: '.35rem' }}>{t(`certifications.step_${n}_title`)}</h4>
                <p style={{ fontSize: '.84rem', maxWidth: '100%', marginBottom: 0 }}>{t(`certifications.step_${n}_desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
