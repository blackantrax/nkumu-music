'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#artists', label: t('nav.artists') },
    { href: '#certifications', label: t('nav.certifications') },
    { href: '#awards', label: t('nav.awards') },
    { href: '#pricing', label: t('nav.pricing') },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 'var(--z-sticky)' as never,
      background: 'rgba(8,11,20,0.94)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid var(--glass-border)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: '1.5rem', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'baseline', gap: '.375rem', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '-.02em' }}>
            NKUMU
          </span>
          <span style={{ fontSize: '.58rem', color: 'var(--text-3)', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase' }}>
            Music
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '.125rem', alignItems: 'center', flex: 1, justifyContent: 'center' }}
          className="desktop-nav">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ padding: '.5rem .875rem', fontSize: '.85rem', color: 'var(--text-2)', borderRadius: 100, transition: 'color .2s', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', flexShrink: 0 }}>
          {/* FR / EN */}
          <div className="tabs" style={{ padding: '2px' }}>
            {(['fr', 'en'] as const).map(l => (
              <button key={l} className={`tab${lang === l ? ' active' : ''}`}
                onClick={() => setLang(l)}
                style={{ padding: '.3rem .625rem', fontSize: '.72rem', minHeight: 32 }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a href="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '.375rem',
            padding: '.4rem .9rem', fontSize: '.78rem', fontWeight: 600,
            borderRadius: 20, border: '1px solid rgba(76,175,130,.3)',
            color: '#4caf82', background: 'rgba(76,175,130,.08)',
            transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(76,175,130,.15)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(76,175,130,.08)' }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4caf82', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Dashboard Artiste
          </a>

          <a href="#waitlist" className="btn btn-gold" style={{ padding: '.5rem 1.25rem', fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: '.375rem' }}>
            {t('nav.cta_join')}
          </a>

          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} aria-label="Menu"
            className="hamburger-btn"
            style={{ background: 'none', border: 'none', color: 'var(--text-1)', cursor: 'pointer', padding: '.5rem', display: 'none', minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>
            {open ? <Icon name="x" size={20} /> : <Icon name="menu" size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(8,11,20,.98)', borderTop: '1px solid var(--glass-border)', padding: '1rem 1.25rem 1.5rem' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '.875rem .5rem', color: 'var(--text-1)', fontSize: '1.05rem', fontWeight: 500, borderBottom: '1px solid var(--glass-border)' }}>
              {l.label}
            </a>
          ))}
          <a href="#waitlist" onClick={() => setOpen(false)}
            className="btn btn-gold"
            style={{ marginTop: '1.25rem', width: '100%', fontSize: '.95rem' }}>
            {t('nav.cta_join')}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
