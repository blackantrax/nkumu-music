'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'
import type { IconName } from './Icon'

const CATS: { key: string; icon: IconName }[] = [
  { key: 'artist_year',      icon: 'trophy'    },
  { key: 'album_year',       icon: 'disc'      },
  { key: 'song_year',        icon: 'music'     },
  { key: 'new_artist',       icon: 'star'      },
  { key: 'best_video',       icon: 'zap'       },
  { key: 'diaspora_artist',  icon: 'globe'     },
]

const FACTS: { icon: IconName; key: 'location' | 'date' | 'attendance' }[] = [
  { icon: 'map_pin',  key: 'location'   },
  { icon: 'calendar', key: 'date'       },
  { icon: 'users',    key: 'attendance' },
]

export default function Awards() {
  const { t } = useLang()

  return (
    <section id="awards" className="section section-alt camas-stage">
      <div className="camas-cone" />

      <div className="container" style={{ position: 'relative', zIndex: 'var(--z-raised)' as never }}>
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <div style={{ fontSize: '.78rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '.875rem' }}>
            {t('awards.pretitle')}
          </div>
          <h2 style={{
            background: 'linear-gradient(135deg, var(--text-1) 0%, var(--gold) 55%, var(--text-1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t('awards.title')}
          </h2>
          <p>{t('awards.subtitle')}</p>
        </div>

        {/* Key facts */}
        <div className="grid-3" style={{ marginBottom: '3.5rem' }}>
          {FACTS.map(f => (
            <div key={f.key} className="card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem' }}>
              <span style={{ color: 'var(--gold)' }}><Icon name={f.icon} size={24} /></span>
              <span style={{ fontSize: '.875rem', color: 'var(--text-2)', fontWeight: 500 }}>{t(`awards.${f.key}`)}</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h3>{t('awards.categories_title')}</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '.875rem' }}>
          {CATS.map(c => (
            <div key={c.key} className="card" style={{ padding: '1.125rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'border-color .25s, transform .25s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,67,.28)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'none'; }}>
              <span style={{ color: 'var(--gold)', flexShrink: 0 }}><Icon name={c.icon} size={20} /></span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text-1)' }}>{t(`awards.category_${c.key}`)}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginTop: '.15rem' }}>{t('awards.vote_label')}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#waitlist" className="btn btn-gold" style={{ fontSize: '.95rem', padding: '.875rem 2.25rem' }}>
            <Icon name="star" size={17} />
            {t('awards.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
