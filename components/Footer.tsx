'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

export default function Footer() {
  const { t } = useLang()

  const cols = [
    {
      h: t('footer.col_platform'),
      links: [
        { l: t('footer.link_discover'),  h: '#artists'         },
        { l: t('footer.link_charts'),    h: '#charts'          },
        { l: t('footer.link_preorders'), h: '#preorders'       },
        { l: t('footer.link_pricing'),   h: '#pricing'         },
      ],
    },
    {
      h: t('footer.col_artists'),
      links: [
        { l: t('footer.link_distribute'), h: '#how'            },
        { l: t('footer.link_camuca'),      h: '#certifications' },
        { l: t('footer.link_royalties'),   h: '#pricing'        },
        { l: t('footer.link_pro'),         h: '#pricing'        },
      ],
    },
    {
      h: t('footer.col_company'),
      links: [
        { l: t('footer.link_about'),   h: '#'        },
        { l: t('footer.link_camas'),   h: '#awards'  },
        { l: t('footer.link_press'),   h: '#'        },
        { l: t('footer.link_contact'), h: '#waitlist'},
      ],
    },
  ]

  const socials: { icon: 'mail' | 'globe' | 'users' | 'trending_up'; label: string }[] = [
    { icon: 'mail',        label: 'Email'     },
    { icon: 'globe',       label: 'Web'       },
    { icon: 'users',       label: 'Community' },
    { icon: 'trending_up', label: 'Socials'   },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '.875rem', letterSpacing: '-.02em' }}>
              NKUMU
            </div>
            <p style={{ fontSize: '.875rem', maxWidth: 270, marginBottom: '1.5rem', lineHeight: 1.7 }}>
              {t('footer.tagline')}
            </p>

            <div style={{ display: 'flex', gap: '.625rem', marginBottom: '1.5rem' }}>
              {socials.map(s => (
                <a key={s.label} href="#waitlist" aria-label={s.label}
                  style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,.04)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', transition: 'border-color .2s, color .2s', minHeight: 36, minWidth: 36 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(212,168,67,.3)'; e.currentTarget.style.color='var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--glass-border)'; e.currentTarget.style.color='var(--text-2)'; }}>
                  <Icon name={s.icon} size={15} />
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <span className="pill pill-muted" style={{ fontSize: '.63rem' }}>Ontario, Canada</span>
              <span className="pill pill-gold"  style={{ fontSize: '.63rem' }}>CAMUCA</span>
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.h}>
              <div style={{ fontSize: '.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-3)', marginBottom: '1.125rem' }}>
                {col.h}
              </div>
              {col.links.map(link => (
                <a key={link.l} href={link.h} className="footer-link">{link.l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.875rem' }}>
          <span style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>
            © 2026 NKUMU Inc. — {t('footer.rights')}
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { l: t('footer.privacy'), h: '#' },
              { l: t('footer.terms'),   h: '#' },
              { l: t('footer.legal'),   h: '#' },
            ].map(({ l, h }) => (
              <a key={l} href={h} style={{ fontSize: '.78rem', color: 'var(--text-3)', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-2)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
