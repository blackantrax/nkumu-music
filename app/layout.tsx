import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/lib/LangContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'NKUMU — La Musique Camerounaise au Monde',
  description:
    'Plateforme de streaming musical camerounaise. Certification CAMUCA officielle, CAMAS Awards, pré-commandes et revenus directs pour les artistes.',
  keywords: ['musique camerounaise', 'streaming', 'afrobeat', 'makossa', 'CAMUCA', 'CAMAS', 'nkumu'],
  openGraph: {
    title: 'NKUMU — La Musique Camerounaise au Monde',
    description: 'Streaming, certification CAMUCA et CAMAS Awards pour la musique camerounaise.',
    type: 'website',
    locale: 'fr_CM',
    siteName: 'NKUMU',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
