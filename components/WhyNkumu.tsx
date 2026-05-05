'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'
import type { IconName } from './Icon'

const PILLARS: { icon: IconName; key: 1 | 2 | 3 }[] = [
  { icon: 'zap',    key: 1 },
  { icon: 'shield', key: 2 },
  { icon: 'mic',    key: 3 },
]

export default function WhyNkumu() {
  const { t } = useLang()

  return (
    <section id="why" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('why.title')}</h2>
          <p>{t('why.subtitle')}</p>
        </div>

        <div className="grid-3">
          {PILLARS.map(({ icon, key }) => (
            <div key={key} className="card why-card">
              <div className="why-icon">
                <Icon name={icon} size={22} />
              </div>
              <span className="pill pill-gold" style={{ alignSelf: 'flex-start' }}>
                {t(`why.pill_${key}`)}
              </span>
              <h3 style={{ fontSize: '1.6rem' }}>{t(`why.title_${key}`)}</h3>
              <p style={{ maxWidth: '100%', marginBottom: 0, fontSize: '.9rem', lineHeight: 1.75 }}>
                {t(`why.desc_${key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
