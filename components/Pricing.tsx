'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

const PLANS = [
  { key: 'free',    monthly: 0,    yearly: 0,     featured: false },
  { key: 'premium', monthly: 2500, yearly: 25000, featured: true  },
  { key: 'pro',     monthly: 9900, yearly: 99000, featured: false },
]

export default function Pricing() {
  const { t } = useLang()
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('pricing.title')}</h2>
          <p>{t('pricing.subtitle')}</p>
        </div>

        {/* Period toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.875rem', marginBottom: '3rem' }}>
          <span style={{ fontSize: '.875rem', color: !yearly ? 'var(--text-1)' : 'var(--text-2)' }}>{t('pricing.monthly')}</span>
          <button onClick={() => setYearly(!yearly)} aria-label="Toggle billing period"
            style={{
              width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', position: 'relative',
              background: yearly ? 'var(--gold)' : 'rgba(255,255,255,.1)', transition: 'background .2s', flexShrink: 0,
            }}>
            <span style={{
              position: 'absolute', top: 3, left: yearly ? 25 : 3, width: 20, height: 20,
              borderRadius: '50%', background: '#fff', transition: 'left .2s',
            }} />
          </button>
          <span style={{ fontSize: '.875rem', color: yearly ? 'var(--text-1)' : 'var(--text-2)', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            {t('pricing.yearly')}
            <span className="pill pill-gold" style={{ fontSize: '.62rem' }}>−17%</span>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {PLANS.map(({ key, monthly, yearly: y, featured }) => {
            const price = yearly ? y : monthly
            return (
              <div key={key} className={`card pricing-card${featured ? ' card-gold featured' : ''}`} style={{ position: 'relative' }}>
                {featured && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#080b14', fontSize: '.68rem', fontWeight: 700, padding: '.28rem 1rem', borderRadius: '0 0 8px 8px', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                    {t('pricing.popular')}
                  </div>
                )}

                <div>
                  <h4 style={{ textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.25rem' }}>{t(`pricing.${key}_name`)}</h4>
                  <p style={{ fontSize: '.82rem', maxWidth: '100%', marginBottom: '1.25rem' }}>{t(`pricing.${key}_desc`)}</p>
                </div>

                <div className="price-num">
                  {price === 0
                    ? <span style={{ fontSize: '2.25rem' }}>{t('pricing.free_label')}</span>
                    : <>{price.toLocaleString('fr-CM')}<span style={{ fontSize: '.9rem', color: 'var(--text-2)', fontFamily: 'var(--font-sans)', fontWeight: 400, marginLeft: '.25rem' }}>XAF/{yearly ? t('pricing.year') : t('pricing.month')}</span></>
                  }
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem', flex: 1 }}>
                  {[1,2,3,4,5,6].map(i => {
                    const val = t(`pricing.${key}_f${i}`)
                    if (!val) return null
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', fontSize: '.875rem', color: 'var(--text-2)' }}>
                        <span style={{ color: 'var(--success)', marginTop: '.1rem', flexShrink: 0 }}><Icon name="check" size={15} /></span>
                        <span>{val}</span>
                      </div>
                    )
                  })}
                </div>

                <a href="#waitlist" className={`btn ${featured ? 'btn-gold' : 'btn-outline'}`} style={{ textAlign: 'center' }}>
                  {t('pricing.cta')}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
