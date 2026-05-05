'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

export default function Hero() {
  const { t } = useLang()

  return (
    <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="hero-bg" />

      {/* Subtle side orbs */}
      <div style={{ position:'absolute', top:'15%', right:'-8%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(212,168,67,.04) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'5%', left:'-6%', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle, rgba(67,98,212,.03) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:'var(--z-raised)' as never, paddingBlock:'clamp(5rem,12vh,9rem)' }}>
        <div style={{ maxWidth:'var(--col-title)', margin:'0 auto', textAlign:'center' }}>

          {/* Pre-title */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.5rem' }}>
            <span className="pill pill-gold">{t('hero.pretitle')}</span>
          </div>

          {/* Headline */}
          <h1 style={{ marginBottom:'1.5rem', letterSpacing:'-.025em' }}>
            {t('hero.title_1')}{' '}
            <em style={{ color:'var(--gold)', fontStyle:'italic' }}>
              {t('hero.title_accent')}
            </em>
            <br />
            {t('hero.title_2')}
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize:'clamp(1rem, 2vw, 1.18rem)', maxWidth:540, margin:'0 auto 2.75rem', lineHeight:1.75 }}>
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#waitlist" className="btn btn-gold" style={{ fontSize:'1rem', padding:'.875rem 2.25rem' }}>
              <Icon name="mail" size={17} />
              {t('hero.cta_primary')}
            </a>
            <a href="#why" className="btn btn-outline" style={{ fontSize:'1rem', padding:'.875rem 2rem' }}>
              {t('hero.cta_secondary')}
              <Icon name="arrow_right" size={17} />
            </a>
          </div>

          {/* Trust bar */}
          <div style={{
            display:'flex', justifyContent:'center', gap:'clamp(1.5rem,4vw,3rem)',
            flexWrap:'wrap', marginTop:'4rem', paddingTop:'3rem',
            borderTop:'1px solid var(--glass-border)',
          }}>
            {[
              { icon: 'shield' as const,      label: t('hero.stat_1') },
              { icon: 'zap' as const,          label: t('hero.stat_2') },
              { icon: 'globe' as const,        label: t('hero.stat_3') },
            ].map(s => (
              <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'.625rem' }}>
                <span style={{ color:'var(--gold)', opacity:.8 }}>
                  <Icon name={s.icon} size={17} />
                </span>
                <span style={{ fontSize:'.82rem', color:'var(--text-2)', fontWeight:500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
