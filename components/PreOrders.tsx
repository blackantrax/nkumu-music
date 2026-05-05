'use client'

import { useLang } from '@/lib/LangContext'
import { ALBUMS, ARTISTS, fmtStreams } from '@/lib/data'
import Icon from './Icon'

const daysLeft = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000))

export default function PreOrders() {
  const { t } = useLang()
  const preorders = ALBUMS.filter(a => a.isPreorder)

  // Also show 2 recent albums as "available now"
  const recent = ALBUMS.filter(a => !a.isPreorder).slice(0, 2)
  const all = [...preorders, ...recent]

  return (
    <section id="preorders" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="gold-rule gold-rule--center" />
          <h2>{t('preorders.title')}</h2>
          <p>{t('preorders.subtitle')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.375rem' }}>
          {all.map(r => {
            const artist = ARTISTS.find(a => a.id === r.artistId)!
            const days = r.releaseDate ? daysLeft(r.releaseDate) : 0
            return (
              <div key={r.id} className="card" style={{
                padding: '1.625rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                borderColor: r.isPreorder ? 'rgba(212,168,67,.2)' : 'var(--glass-border)',
              }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 12,
                  background: `radial-gradient(circle at 40% 40%, hsl(${r.hue},30%,18%) 0%, var(--bg) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: `hsl(${r.hue},40%,55%)`, flexShrink: 0,
                }}>
                  <Icon name="disc" size={32} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text-1)', marginBottom: '.2rem' }}>{r.title}</div>
                      <div style={{ fontSize: '.78rem', color: 'var(--text-2)' }}>{artist.name}</div>
                    </div>
                    {r.isPreorder
                      ? <span className="pill pill-gold" style={{ fontSize: '.65rem', flexShrink: 0 }}>Pré-commande</span>
                      : <span className="pill" style={{ fontSize: '.65rem', flexShrink: 0, background: 'rgba(76,175,130,.1)', color: 'var(--success)', border: '1px solid rgba(76,175,130,.2)' }}>Disponible</span>
                    }
                  </div>
                  <div style={{ fontSize: '.74rem', color: 'var(--text-3)', marginBottom: '.75rem' }}>
                    {fmtStreams(artist.streams)} streams · {artist.genre} · {r.priceXaf.toLocaleString('fr-FR')} XAF
                  </div>
                  <div style={{ padding: '.625rem .875rem', borderRadius: 8, background: r.isPreorder ? 'rgba(212,168,67,.05)' : 'rgba(76,175,130,.04)', border: `1px solid ${r.isPreorder ? 'rgba(212,168,67,.1)' : 'rgba(76,175,130,.12)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.75rem', color: 'var(--text-2)' }}>
                      <Icon name="calendar" size={13} />
                      {r.isPreorder
                        ? (days === 0 ? t('preorders.today') : `${days} ${t('preorders.days')}`)
                        : t('preorders.today')
                      }
                    </div>
                    <a href="#waitlist" className="btn btn-gold" style={{ padding: '.35rem .875rem', fontSize: '.75rem', minHeight: 36 }}>
                      {t('preorders.cta')}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
