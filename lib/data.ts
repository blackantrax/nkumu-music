// Shared artist/track data — kept in sync with mobile/src/data/artists.ts

export type CertificationLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | null

export interface Artist {
  id: string
  name: string
  handle: string
  genre: string
  certification: CertificationLevel
  subscribers: number
  streams: number
  verified: boolean
  bio: string
  hue: number          // color hue for gradient placeholder
  location: string
}

export interface Track {
  id: string
  albumId: string
  artistId: string
  title: string
  durationSec: number
  priceXaf: number
  explicit?: boolean
  featuring?: string[]
  streams: number
  monthlyStreams: number
  weeklyStreams: number
  lyrics?: string
}

export interface Album {
  id: string
  artistId: string
  title: string
  year: number
  priceXaf: number
  isPreorder?: boolean
  releaseDate?: string
  hue: number
}

export const ARTISTS: Artist[] = [
  { id: 'lifka',        name: 'LiFkA',          handle: '@LiFkA',        genre: 'Rap',            certification: 'gold',     subscribers: 402,   streams: 134_000,   verified: true,  bio: 'Rappeur camerounais, lyriciste reconnu comme le meilleur rap camerounais actuel.',                            hue: 140, location: 'Yaoundé' },
  { id: 'mondo-mubany', name: 'MondoMubany',    handle: '@MondoMubany',  genre: 'Afrobeat',       certification: 'platinum', subscribers: 1240,  streams: 520_000,   verified: true,  bio: "Star de l'Afrobeat camerounais avec des sonorités qui traversent les frontières.",                           hue: 30,  location: 'Douala' },
  { id: '5thez',        name: '5thezofficiel',  handle: '@5thezofficiel',genre: 'Rap',            certification: 'silver',   subscribers: 389,   streams: 67_000,    verified: true,  bio: 'Flow incisif et textes percutants. La nouvelle génération du rap camerounais.',                               hue: 220, location: 'Yaoundé' },
  { id: 'lucideman',    name: 'LUCIDEMAN',       handle: '@LUCIDEMAN',    genre: 'Rap',            certification: 'silver',   subscribers: 271,   streams: 58_000,    verified: true,  bio: 'Musique consciente et poésie urbaine. La voix de la rue camerounaise.',                                       hue: 270, location: 'Bafoussam' },
  { id: 'jenny-ice',    name: 'Jenny_Ice',       handle: '@Jenny_Ice',    genre: 'R&B',            certification: 'bronze',   subscribers: 156,   streams: 18_500,    verified: true,  bio: 'Voix cristalline et R&B chaleureux. La reine montante de la scène féminine camerounaise.',                   hue: 340, location: 'Douala' },
  { id: 'ngahrosine',   name: 'Ngahrosine',      handle: '@Ngahrosine',   genre: 'Afropop',        certification: 'gold',     subscribers: 891,   streams: 142_000,   verified: true,  bio: 'Chanteuse afropop aux influences multiculturelles. Ambiance garantie.',                                       hue: 45,  location: 'Paris / Douala' },
  { id: 'cedriclam',    name: 'CedricLaMouche',  handle: '@CedricLaM',    genre: 'Coupé-Décalé',  certification: 'bronze',   subscribers: 203,   streams: 22_000,    verified: false, bio: 'Roi du dancefloor avec ses productions Coupé-Décalé électrisantes.',                                         hue: 100, location: 'Yaoundé' },
  { id: 'coolh',        name: 'COOLH',            handle: '@COOLH',        genre: 'Rap',            certification: 'silver',   subscribers: 445,   streams: 73_000,    verified: true,  bio: "Nouvelles sonorités, flow unique. L'un des rappeurs les plus innovants du pays.",                            hue: 180, location: 'Douala' },
  { id: 'pascal',       name: 'Pascal',           handle: '@pascal',       genre: 'Gospel',         certification: 'diamond',  subscribers: 5400,  streams: 1_450_000, verified: true,  bio: "L'icône du Gospel camerounais. Voix inspirante, message universel.",                                         hue: 55,  location: 'Yaoundé' },
  { id: 'stevedo',      name: 'Stevedo',          handle: '@Stevedo',      genre: 'Makossa',        certification: 'platinum', subscribers: 2100,  streams: 680_000,   verified: true,  bio: 'Gardien du Makossa traditionnel modernisé. Légende vivante de la musique camerounaise.',                     hue: 300, location: 'Douala' },
  { id: 'mrbiyong',     name: 'MrBiyong',         handle: '@MrBiyong',     genre: 'Afrobeat',       certification: 'bronze',   subscribers: 178,   streams: 14_200,    verified: false, bio: "Producteur et artiste, il mélange Afrobeat et sonorités locales pour créer quelque chose d'unique.",       hue: 10,  location: 'Bafoussam' },
  { id: 'lili-anoma',   name: 'Lili Anoma',       handle: '@LiliAnoma',    genre: 'R&B',            certification: 'gold',     subscribers: 723,   streams: 134_000,   verified: true,  bio: "R&B aux accents africains. Sa voix transporte et ses textes touchent les cœurs.",                           hue: 320, location: 'Yaoundé' },
  { id: 'diablit',      name: 'Diablit',           handle: '@Diablit',      genre: 'Rap',            certification: 'silver',   subscribers: 510,   streams: 82_000,    verified: true,  bio: 'Rappeur aux textes engagés, mêlant réalité camerounaise et flow percutant.',                                   hue: 200, location: 'Douala' },
  { id: 'simba-draken', name: 'Simba Draken',      handle: '@SimbaDraken',  genre: 'Afrotrap',       certification: 'bronze',   subscribers: 290,   streams: 31_000,    verified: true,  bio: "Afrotrap puissant avec des influences panafricaines. La fierté de Douala.",                                    hue: 15,  location: 'Douala' },
  { id: 'trois-off',    name: 'Trois Officiel',    handle: '@TroisOfficiel',genre: 'Rap',            certification: 'gold',     subscribers: 614,   streams: 110_000,   verified: true,  bio: "Collectif rap camerounais alliant lyricisme, trap et culture de rue.",                                        hue: 255, location: 'Yaoundé' },
]

export const TRACKS: Track[] = [
  { id: 'yt1', albumId: 'nnpp', artistId: 'lifka', title: 'INTRO',    durationSec: 120, priceXaf: 500, streams: 134_200, monthlyStreams: 18_400, weeklyStreams: 4_200, lyrics: "Je suis là, encore debout\nMalgré la nuit, je vois le bout" },
  { id: 'yt2', albumId: 'nnpp', artistId: 'lifka', title: 'POSITION', durationSec: 218, priceXaf: 500, explicit: true, featuring: ['DOBY', 'RÉMI BETA'], streams: 138_900, monthlyStreams: 32_000, weeklyStreams: 8_900 },
  { id: 'yt3', albumId: 'nnpp', artistId: 'lifka', title: 'LA JOIE',  durationSec: 195, priceXaf: 500, streams: 136_100, monthlyStreams: 21_000, weeklyStreams: 6_100 },
  { id: 'yt4', albumId: 'nnpp', artistId: 'lifka', title: 'SKIP',     durationSec: 178, priceXaf: 500, featuring: ['SOJIP'], streams: 135_400, monthlyStreams: 19_000, weeklyStreams: 5_400 },
  { id: 'yt6', albumId: 'nnpp', artistId: 'lifka', title: 'MENTEUR',  durationSec: 231, priceXaf: 500, explicit: true, featuring: ['KING ARTHUR'], streams: 142_400, monthlyStreams: 41_000, weeklyStreams: 12_400 },
  { id: 'yt7', albumId: 'nnpp', artistId: 'lifka', title: 'YE WANDA', durationSec: 187, priceXaf: 500, explicit: true, streams: 155_800, monthlyStreams: 56_000, weeklyStreams: 15_800 },
  { id: 'm1',  albumId: 'mbebwo',        artistId: 'mondo-mubany', title: 'MBEBWO THE ALBUM', durationSec: 245, priceXaf: 500, streams: 89_000,    monthlyStreams: 28_000, weeklyStreams: 7_200 },
  { id: 't1',  albumId: 'toum-be-tara',  artistId: '5thez',        title: 'TOUM BE TARA',     durationSec: 198, priceXaf: 500, streams: 34_000,    monthlyStreams: 9_800,  weeklyStreams: 2_400 },
  { id: 'r1',  albumId: 'reset',         artistId: 'lucideman',    title: 'RESET',            durationSec: 212, priceXaf: 500, streams: 28_000,    monthlyStreams: 7_600,  weeklyStreams: 1_800 },
  { id: 'd1',  albumId: 'diablit-ep',   artistId: 'diablit',      title: 'VRAI PARLER',      durationSec: 207, priceXaf: 500, streams: 48_000,    monthlyStreams: 14_200, weeklyStreams: 3_600 },
  { id: 'd2',  albumId: 'diablit-ep',   artistId: 'diablit',      title: 'AUTOPSIE',         durationSec: 193, priceXaf: 500, explicit: true, streams: 34_000, monthlyStreams: 9_800, weeklyStreams: 2_400 },
  { id: 's1',  albumId: 'simba-vol1',   artistId: 'simba-draken', title: 'LION DEBOUT',      durationSec: 218, priceXaf: 500, streams: 31_000,    monthlyStreams: 8_900,  weeklyStreams: 2_100 },
  { id: 'tr1', albumId: 'trois-ep',     artistId: 'trois-off',    title: 'UNION',            durationSec: 234, priceXaf: 500, featuring: ['LiFkA'], streams: 68_000, monthlyStreams: 22_000, weeklyStreams: 5_800 },
  { id: 'tr2', albumId: 'trois-ep',     artistId: 'trois-off',    title: 'CAMEROUN FIRST',   durationSec: 201, priceXaf: 500, streams: 42_000,    monthlyStreams: 12_400, weeklyStreams: 3_100 },
]

export const ALBUMS: Album[] = [
  { id: 'nnpp',            artistId: 'lifka',        title: 'NON N\'AIE PAS PEUR', year: 2025, priceXaf: 3000, hue: 140 },
  { id: 'mbebwo',          artistId: 'mondo-mubany', title: 'MBEBWO THE ALBUM',    year: 2025, priceXaf: 4000, hue: 30  },
  { id: 'toum-be-tara',    artistId: '5thez',        title: 'TOUM BE TARA',        year: 2025, priceXaf: 2500, hue: 220 },
  { id: 'reset',           artistId: 'lucideman',    title: 'RESET',               year: 2025, priceXaf: 2000, hue: 270 },
  { id: 'upcoming-stevedo',artistId: 'stevedo',      title: 'MAKOSSA FOREVER',     year: 2026, priceXaf: 5000, hue: 300, isPreorder: true, releaseDate: '2026-05-22' },
  { id: 'bad',             artistId: 'lili-anoma',   title: 'BAD',                 year: 2025, priceXaf: 2000, hue: 320 },
  { id: 'diablit-ep',     artistId: 'diablit',      title: 'VRAI PARLER EP',      year: 2025, priceXaf: 2500, hue: 200 },
  { id: 'simba-vol1',     artistId: 'simba-draken', title: 'LION DEBOUT VOL.1',   year: 2025, priceXaf: 2000, hue: 15  },
  { id: 'trois-ep',       artistId: 'trois-off',    title: 'CAMEROUN FIRST EP',   year: 2025, priceXaf: 3000, hue: 255 },
]

export const CAMUCA_LEVELS = [
  { level: 'bronze',   threshold: 10_000,     color: '#cd7f32', glow: 'rgba(205,127,50,.3)',   emoji: '🥉', label: 'Bronze'  },
  { level: 'silver',   threshold: 50_000,     color: '#c0c0c0', glow: 'rgba(192,192,192,.25)', emoji: '🥈', label: 'Argent'  },
  { level: 'gold',     threshold: 100_000,    color: '#d4a843', glow: 'rgba(212,168,67,.35)',  emoji: '🥇', label: 'Or'      },
  { level: 'platinum', threshold: 500_000,    color: '#e8e5e0', glow: 'rgba(229,228,226,.25)', emoji: '💿', label: 'Platine' },
  { level: 'diamond',  threshold: 1_000_000,  color: '#9ee8ff', glow: 'rgba(158,232,255,.3)',  emoji: '💎', label: 'Diamant' },
] as const

export function fmtStreams(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n}`
}
