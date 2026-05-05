'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DEMO_ARTISTS, saveSession, getSession } from '@/lib/auth'
import Icon from '@/components/Icon'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (getSession()) router.replace('/dashboard')
  }, [router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const artist = DEMO_ARTISTS[email.toLowerCase().trim()]
      if (!artist || artist.password !== password) {
        setError('Identifiants incorrects. Vérifiez votre email et mot de passe.')
        setLoading(false)
        return
      }
      saveSession({ artistId: artist.artistId, name: artist.name, email: email.toLowerCase().trim() })
      router.push('/dashboard')
    }, 600)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <a href="/" style={{ marginBottom: '2.5rem', textAlign: 'center', textDecoration: 'none' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '-.02em' }}>NKUMU</div>
        <div style={{ fontSize: '.65rem', color: 'var(--text-3)', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', marginTop: '.2rem' }}>Espace Artiste</div>
      </a>

      <div style={{
        width: '100%', maxWidth: 420,
        background: 'var(--surface)', border: '1px solid var(--glass-border)',
        borderRadius: 'var(--r-lg)', padding: 'clamp(1.75rem,5vw,2.5rem)',
        boxShadow: 'var(--shadow-card)',
      }}>
        <h1 style={{ fontSize: '1.4rem', marginBottom: '.4rem' }}>Connexion</h1>
        <p style={{ fontSize: '.875rem', color: 'var(--text-2)', marginBottom: '2rem' }}>
          Accédez à votre tableau de bord et suivez vos streams en temps réel.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: '.4rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              Adresse email
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="artiste@nkumu.com" required autoComplete="email"
              style={{
                width: '100%', padding: '.75rem 1rem', borderRadius: 'var(--r-sm)',
                background: 'var(--surface-2)', border: `1px solid ${error ? 'var(--error)' : 'var(--glass-border)'}`,
                color: 'var(--text-1)', fontSize: '.9rem', outline: 'none',
                transition: 'border-color .2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
              onBlur={e => (e.currentTarget.style.borderColor = error ? 'var(--error)' : 'var(--glass-border)')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: '.4rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required autoComplete="current-password"
                style={{
                  width: '100%', padding: '.75rem 2.75rem .75rem 1rem', borderRadius: 'var(--r-sm)',
                  background: 'var(--surface-2)', border: `1px solid ${error ? 'var(--error)' : 'var(--glass-border)'}`,
                  color: 'var(--text-1)', fontSize: '.9rem', outline: 'none', transition: 'border-color .2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = error ? 'var(--error)' : 'var(--glass-border)')}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: '0.25rem' }}>
                <Icon name={showPass ? 'eye-off' : 'eye'} size={16} />
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(224,92,92,.1)', border: '1px solid rgba(224,92,92,.25)', borderRadius: 'var(--r-sm)', padding: '.75rem 1rem', fontSize: '.83rem', color: 'var(--error)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="btn btn-gold"
            style={{ width: '100%', padding: '.875rem', fontSize: '.95rem', justifyContent: 'center', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Connexion…' : 'Accéder au tableau de bord'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', padding: '1rem', background: 'var(--gold-muted)', borderRadius: 'var(--r-sm)', border: '1px solid var(--gold-border)' }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.4rem' }}>Accès démo</div>
          <div style={{ fontSize: '.78rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
            Email : <code style={{ color: 'var(--text-1)' }}>demo@nkumu.com</code><br />
            Mot de passe : <code style={{ color: 'var(--text-1)' }}>nkumu2025</code>
          </div>
        </div>
      </div>

      <a href="/" style={{ marginTop: '1.5rem', fontSize: '.8rem', color: 'var(--text-3)' }}>
        ← Retour au site
      </a>
    </div>
  )
}
