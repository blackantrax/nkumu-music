'use client'

import { useLang } from '@/lib/LangContext'
import Icon from './Icon'

export default function Hero() {
  const { t } = useLang()

  return (
    <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

      {/* ── Fond noir + orbes rouges ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 60% 40%, rgba(204,0,0,0.09) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 60%, rgba(180,0,0,0.05) 0%, transparent 60%)',
      }} />

      {/* Ligne diagonale rouge — détail industriel */}
      <div style={{
        position: 'absolute', top: 0, right: '35%', width: 1, height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(204,0,0,0.15) 40%, rgba(204,0,0,0.25) 60%, transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, paddingBlock: 'clamp(5rem, 12vh, 9rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }}
          className="hero-grid">

          {/* ─────────────────────── COLONNE GAUCHE ─────────────────────── */}
          <div>
            {/* Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1.75rem' }}>
              <span style={{ display: 'flex', gap: 3 }}>
                {['#007A3D', '#CE1126', '#FCD116'].map((c, i) => (
                  <span key={i} style={{ display: 'block', width: 18, height: 3, borderRadius: 2, background: c }} />
                ))}
              </span>
              <span style={{
                fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em',
                textTransform: 'uppercase', color: 'var(--text-2)',
              }}>
                {t('hero.pretitle')}
              </span>
            </div>

            {/* Titre principal */}
            <h1 style={{ marginBottom: '1.25rem', lineHeight: 1.05, letterSpacing: '-.03em' }}>
              <span style={{ display: 'block', color: 'var(--text-1)' }}>{t('hero.title_1')}</span>
              <em style={{
                display: 'block', fontStyle: 'normal',
                color: '#CC0000',
                textShadow: '0 0 60px rgba(204,0,0,0.35)',
              }}>
                {t('hero.title_accent')}
              </em>
              <span style={{ display: 'block', color: 'var(--text-1)' }}>{t('hero.title_2')}</span>
            </h1>

            {/* Sous-titre */}
            <p style={{
              fontSize: 'clamp(.95rem, 1.8vw, 1.1rem)', maxWidth: 480,
              lineHeight: 1.8, marginBottom: '2.5rem', color: 'var(--text-2)',
            }}>
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href="#artists" style={{
                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                padding: '.875rem 2rem', borderRadius: 100,
                background: '#CC0000', color: '#fff',
                fontWeight: 700, fontSize: '.95rem',
                boxShadow: '0 4px 32px rgba(204,0,0,0.4)',
                transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E00000'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#CC0000'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <Icon name="play" size={17} />
                {t('hero.cta_primary')}
              </a>
              <a href="#communaute" style={{
                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                padding: '.875rem 1.75rem', borderRadius: 100,
                background: 'transparent', color: 'var(--text-1)',
                fontWeight: 600, fontSize: '.95rem',
                border: '1.5px solid rgba(240,236,228,.18)',
                transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(204,0,0,0.5)'; e.currentTarget.style.color = '#CC0000' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,236,228,.18)'; e.currentTarget.style.color = 'var(--text-1)' }}
              >
                {t('hero.cta_secondary')}
                <Icon name="arrow_right" size={17} />
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap',
              paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.07)',
            }}>
              {[
                { val: '82K',    label: t('hero.stat_streams') },
                { val: '510',    label: t('hero.stat_fans') },
                { val: 'ARGENT', label: t('hero.stat_cert') },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: 'var(--font-serif, "Bodoni Moda"), serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700,
                    color: '#CC0000', lineHeight: 1, marginBottom: '.25rem',
                  }}>{s.val}</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-3)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────── COLONNE DROITE : Carte Diablit ─────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-visual-col">
            <div style={{
              position: 'relative',
              width: '100%', maxWidth: 400,
              borderRadius: 20,
              background: 'linear-gradient(145deg, #0F0000 0%, #1A0000 40%, #0A0A0A 100%)',
              border: '1px solid rgba(204,0,0,0.25)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(204,0,0,0.08)',
              overflow: 'hidden',
              padding: '2rem',
              minHeight: 460,
            }}>

              {/* Glow rouge en haut à droite */}
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 200, height: 200, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(204,0,0,0.25), transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Badge F.O.P */}
              <div style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                background: 'rgba(204,0,0,0.15)', border: '1px solid rgba(204,0,0,0.4)',
                borderRadius: 6, padding: '.25rem .625rem',
                fontSize: '.65rem', fontWeight: 800, letterSpacing: '.15em',
                color: '#CC0000',
              }}>
                F.O.P
              </div>

              {/* Label artiste du moment */}
              <div style={{
                fontSize: '.62rem', fontWeight: 700, letterSpacing: '.18em',
                textTransform: 'uppercase', color: 'var(--text-3)',
                marginBottom: '.75rem',
              }}>
                {t('hero.artist_label')}
              </div>

              {/* Nom DIABLIT */}
              <div style={{
                fontFamily: 'var(--font-serif, "Bodoni Moda"), serif',
                fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 800,
                letterSpacing: '-.02em', lineHeight: .95,
                color: '#fff',
                marginBottom: '.5rem',
              }}>
                DIABLIT
              </div>

              {/* Genre */}
              <div style={{
                fontSize: '.72rem', fontWeight: 600, letterSpacing: '.14em',
                textTransform: 'uppercase', color: 'var(--text-3)',
                marginBottom: '1.75rem',
              }}>
                DRILL · TRAP · DOUALA
              </div>

              {/* Badge CAMUCA Argent */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '.375rem',
                background: 'rgba(168,169,173,0.1)', border: '1px solid rgba(168,169,173,0.3)',
                borderRadius: 6, padding: '.3rem .75rem',
                fontSize: '.65rem', fontWeight: 700, letterSpacing: '.08em',
                color: '#A8A9AD', marginBottom: '2rem',
              }}>
                <Icon name="award" size={11} />
                CERTIFIÉ ARGENT CAMUCA
              </div>

              {/* Waveform animé — rouge */}
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 3,
                height: 36, marginBottom: '1.5rem', opacity: .8,
              }}>
                {[35, 70, 50, 90, 60, 80, 40, 75, 55, 85, 45, 65, 50, 70, 40].map((h, i) => (
                  <span key={i} style={{
                    flex: 1, borderRadius: 2,
                    background: '#CC0000',
                    height: `${h}%`,
                    animation: `heroWave 1.4s ease-in-out ${i * 0.09}s infinite alternate`,
                  }} />
                ))}
              </div>

              {/* Lecteur mini */}
              <div style={{
                background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '.875rem 1rem',
                display: 'flex', alignItems: 'center', gap: '.875rem',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: 'linear-gradient(135deg, #CC0000, #660000)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="mic" size={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#fff', marginBottom: '.2rem' }}>A.V.C</div>
                  <div style={{ fontSize: '.7rem', color: 'var(--text-3)' }}>Diablit · F.O.P</div>
                </div>
                <button style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#CC0000', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name="play" size={14} />
                </button>
              </div>

              {/* Barre de progression */}
              <div style={{ marginTop: '.75rem', height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: '38%', background: '#CC0000', borderRadius: 2,
                  animation: 'progressPulse 4s linear infinite',
                }} />
              </div>

              {/* Grain overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                opacity: .03,
              }} />
            </div>

            {/* Float badges */}
            <div style={{
              position: 'absolute', top: '18%', left: '-5%',
              display: 'flex', alignItems: 'center', gap: '.5rem',
              background: 'var(--glass, rgba(14,17,32,.85))',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 40, padding: '.5rem 1rem',
              fontSize: '.75rem', fontWeight: 600, color: '#fff',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
              animation: 'floatBadge 5s ease-in-out infinite',
            }} className="hero-float-badge-1">
              <Icon name="users" size={13} />
              510 abonnés
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur scroll */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        color: 'var(--text-3)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase',
      }}>
        <div style={{
          width: 1, height: 36,
          background: 'linear-gradient(to bottom, rgba(204,0,0,0.5), transparent)',
          animation: 'scrollLine 2.2s ease-in-out infinite',
        }} />
        <span>DÉFILER</span>
      </div>

      <style>{`
        @keyframes heroWave {
          0%   { transform: scaleY(1); }
          100% { transform: scaleY(0.35); }
        }
        @keyframes progressPulse {
          0%   { width: 35%; }
          100% { width: 42%; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scrollLine {
          0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%  { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-col { display: none !important; }
          .hero-float-badge-1 { display: none !important; }
        }
      `}</style>
    </section>
  )
}
