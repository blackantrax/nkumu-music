'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

export default function Waitlist() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) { setError(t('waitlist.error')); return }
    setSubmitted(true)
    setError('')
  }

  return (
    <section id="waitlist" className="section" style={{ background: 'linear-gradient(180deg, rgba(8,11,20,0) 0%, rgba(14,10,3,.5) 100%)' }}>
      <div className="container">
        <div className="card card-gold" style={{ maxWidth: 660, margin: '0 auto', padding: 'clamp(2.5rem,6vw,4.5rem)', textAlign: 'center' }}>
          <span className="gold-rule gold-rule--center" />
          <h2 style={{ marginBottom: '.875rem' }}>{t('waitlist.title')}</h2>
          <p style={{ maxWidth: 480, margin: '0 auto 1.5rem' }}>{t('waitlist.subtitle')}</p>

          {/* Benefit badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '.625rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {([1,2,3] as const).map(n => (
              <span key={n} className="pill pill-gold">
                <Icon name="check" size={11} />
                {t(`waitlist.badge_${n}`)}
              </span>
            ))}
          </div>

          {submitted ? (
            <div style={{ padding: '1.5rem', borderRadius: 12, background: 'rgba(212,168,67,.07)', border: '1px solid rgba(212,168,67,.18)' }}>
              <span style={{ color: 'var(--gold)', display: 'block', marginBottom: '.5rem' }}><Icon name="check-circle" size={32} /></span>
              <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.05rem', maxWidth: '100%', marginBottom: '.25rem' }}>{t('waitlist.success_title')}</p>
              <p style={{ maxWidth: '100%', fontSize: '.875rem', marginBottom: 0 }}>{t('waitlist.success_msg')}</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                className="input"
                placeholder={t('waitlist.placeholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: '1 1 220px' }}
                required
              />
              <button type="submit" className="btn btn-gold" style={{ flexShrink: 0 }}>
                {t('waitlist.cta')}
                <Icon name="arrow_right" size={16} />
              </button>
              {error && <p style={{ width: '100%', color: 'var(--error)', fontSize: '.82rem', margin: 0, maxWidth: '100%' }}>{error}</p>}
            </form>
          )}

          <p style={{ marginTop: '1.125rem', fontSize: '.72rem', color: 'var(--text-3)', maxWidth: '100%' }}>
            <Icon name="shield" size={12} style={{ display:'inline', verticalAlign:'middle', marginRight:4 } as React.CSSProperties} />
            {t('waitlist.privacy')}
          </p>
        </div>
      </div>
    </section>
  )
}
