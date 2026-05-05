'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'

type Tab = 'fan' | 'artist' | 'label'

export default function HowItWorks() {
  const { t } = useLang()
  const [tab, setTab] = useState<Tab>('fan')

  const tabs: { key: Tab }[] = [
    { key: 'fan' }, { key: 'artist' }, { key: 'label' },
  ]

  return (
    <section id="how" className="section">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('how.title')}</h2>
          <p>{t('how.subtitle')}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div className="tabs">
            {tabs.map(({ key }) => (
              <button key={key} className={`tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
                {t(`how.tab_${key}`)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {([1, 2, 3, 4] as const).map(n => (
            <div key={n} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
              <div className="step-num">{n}</div>
              <h4>{t(`how.${tab}_step_${n}_title`)}</h4>
              <p style={{ fontSize: '.86rem', maxWidth: '100%', marginBottom: 0 }}>{t(`how.${tab}_step_${n}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
