'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'
import type { IconName } from './Icon'

const CARDS: { key: string; icon: IconName }[] = [
  { key: 'fan1',    icon: 'users'   },
  { key: 'artist1', icon: 'mic'     },
  { key: 'label1',  icon: 'disc'    },
  { key: 'fan2',    icon: 'globe'   },
]

export default function Testimonials() {
  const { t } = useLang()

  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('testimonials.title')}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.375rem' }}>
          {CARDS.map(({ key, icon }) => (
            <div key={key} className="card testi-card">
              <div className="testi-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={14} style={{ fill: 'var(--gold)', stroke: 'var(--gold)' } as React.CSSProperties} />
                ))}
              </div>
              <p style={{ maxWidth: '100%', fontSize: '.9rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--text-1)', marginBottom: 0 }}>
                &ldquo;{t(`testimonials.${key}_quote`)}&rdquo;
              </p>
              <div className="testi-author">
                <div className="testi-avatar">
                  <Icon name={icon} size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.875rem', color: 'var(--text-1)' }}>{t(`testimonials.${key}_name`)}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-2)', marginTop: '.1rem' }}>{t(`testimonials.${key}_role`)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
