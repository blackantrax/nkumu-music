'use client'

import { useLang } from '@/lib/LangContext'
import Icon, { IconName } from './Icon'

const COUNTRIES = [
  { flag: '🇨🇲', name: 'Cameroun' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇧🇪', name: 'Belgique' },
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇨🇭', name: 'Suisse' },
]

export default function Communaute() {
  const { t } = useLang()

  const features: { icon: IconName; title: string; desc: string; color: string }[] = [
    { icon: 'heart', title: t('community.f1_title'), desc: t('community.f1_desc'), color: '#CC0000' },
    { icon: 'award', title: t('community.f2_title'), desc: t('community.f2_desc'), color: '#FCD116' },
    { icon: 'zap',   title: t('community.f3_title'), desc: t('community.f3_desc'), color: '#A8A9AD' },
  ]

  const stats: { val: string; icon: IconName }[] = [
    { val: t('community.stat_countries'), icon: 'globe' },
    { val: t('community.stat_fans'),      icon: 'users' },
    { val: t('community.stat_artists'),   icon: 'award' },
    { val: t('community.stat_streams'),   icon: 'zap' },
  ]

  return (
    <section id="communaute" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Fond avec diagonale rouge */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(204,0,0,0.06) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3,
        background: 'linear-gradient(to bottom, transparent, #CC0000 30%, #CC0000 70%, transparent)',
        opacity: .35,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* En-tête */}
        <div style={{ maxWidth: 680, marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 28, height: 2, borderRadius: 1, background: '#CC0000',
            }} />
            <span style={{
              fontSize: '.7rem', fontWeight: 700, letterSpacing: '.14em',
              textTransform: 'uppercase', color: '#CC0000',
            }}>
              {t('community.pretitle')}
            </span>
          </div>

          <h2 style={{ marginBottom: '1rem' }}>
            {t('community.title_1')}{' '}
            <em style={{ fontStyle: 'italic', color: '#CC0000' }}>
              {t('community.title_accent')}
            </em>
            <br />
            {t('community.title_2')}
          </h2>

          <p style={{ fontSize: 'clamp(.95rem, 1.7vw, 1.08rem)', maxWidth: 560, lineHeight: 1.8 }}>
            {t('community.subtitle')}
          </p>
        </div>

        {/* Layout 2 colonnes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'start',
        }} className="community-grid">

          {/* Colonne gauche — cartes features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {features.map(f => (
              <div key={f.title}
                style={{
                  background: 'var(--glass, rgba(14,17,32,.75))',
                  border: '1px solid var(--glass-border, rgba(212,168,67,.09))',
                  borderRadius: 'var(--r-md, 14px)',
                  padding: '1.5rem',
                  display: 'flex', gap: '1.125rem', alignItems: 'flex-start',
                  transition: 'border-color .2s, transform .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}44`; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border, rgba(212,168,67,.09))'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.color,
                }}>
                  <Icon name={f.icon} size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-1)', marginBottom: '.4rem' }}>
                    {f.title}
                  </div>
                  <p style={{ fontSize: '.87rem', lineHeight: 1.7, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <a href="#waitlist"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                padding: '.875rem 2rem', borderRadius: 100, marginTop: '.5rem',
                background: '#CC0000', color: '#fff',
                fontWeight: 700, fontSize: '.95rem',
                boxShadow: '0 4px 32px rgba(204,0,0,0.35)',
                transition: 'all .2s', width: 'fit-content',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E00000'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#CC0000'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Icon name="users" size={17} />
              {t('community.cta')}
            </a>
            <p style={{ fontSize: '.75rem', color: 'var(--text-3)', margin: '.5rem 0 0' }}>
              {t('community.cta_sub')}
            </p>
          </div>

          {/* Colonne droite — carte communauté visuelle */}
          <div>
            {/* Stats grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1rem', marginBottom: '1.75rem',
            }}>
              {stats.map(s => (
                <div key={s.val}
                  style={{
                    background: 'var(--glass, rgba(14,17,32,.75))',
                    border: '1px solid var(--glass-border, rgba(212,168,67,.09))',
                    borderRadius: 'var(--r-md, 14px)',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#CC0000', marginBottom: '.5rem', display: 'flex', justifyContent: 'center' }}>
                    <Icon name={s.icon} size={20} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-serif, "Bodoni Moda"), serif',
                    fontSize: 'clamp(.95rem, 2vw, 1.1rem)', fontWeight: 700,
                    color: 'var(--text-1)', lineHeight: 1.2,
                  }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Pays représentés */}
            <div style={{
              background: 'var(--glass, rgba(14,17,32,.75))',
              border: '1px solid var(--glass-border, rgba(212,168,67,.09))',
              borderRadius: 'var(--r-md, 14px)',
              padding: '1.5rem',
            }}>
              <div style={{
                fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em',
                textTransform: 'uppercase', color: 'var(--text-3)',
                marginBottom: '1rem',
              }}>
                🌍 Présents dans
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem' }}>
                {COUNTRIES.map(c => (
                  <div key={c.name}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '.375rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 100, padding: '.3rem .75rem',
                      fontSize: '.78rem', color: 'var(--text-2)',
                    }}
                  >
                    <span>{c.flag}</span>
                    {c.name}
                  </div>
                ))}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  borderRadius: 100, padding: '.3rem .75rem',
                  fontSize: '.78rem', color: 'var(--text-3)',
                  fontStyle: 'italic',
                }}>
                  + 9 autres pays
                </div>
              </div>

              {/* Barre de progression — croissance communauté */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
                  <span style={{ fontSize: '.72rem', color: 'var(--text-3)' }}>Croissance communauté</span>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#CC0000' }}>+34% ce mois</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: '68%', borderRadius: 2,
                    background: 'linear-gradient(to right, #CC0000, #FF3333)',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .community-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
