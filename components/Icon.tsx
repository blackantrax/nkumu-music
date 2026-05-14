// Inline SVG icon set — no emojis, consistent 24x24 viewBox
// All icons from Lucide design language

import type { CSSProperties } from 'react'
type IconProps = { size?: number; className?: string; style?: CSSProperties; 'aria-hidden'?: boolean }

const d = (path: string) => path

const icons = {
  play: d('M5 3l14 9-14 9V3z'),
  pause: d('M6 4h4v16H6V4zm8 0h4v16h-4V4z'),
  next: d('M5 4l10 8-10 8V4zm11 0h2v16h-2V4z'),
  prev: d('M19 4L9 12l10 8V4zm-11 0H6v16h2V4z'),
  music: d('M9 18V5l12-2v13M9 18a3 3 0 11-3-3 3 3 0 013 3zm12-2a3 3 0 11-3-3 3 3 0 013 3z'),
  trophy: d('M6 2h12v6a6 6 0 01-12 0V2zM4 2h2M18 2h2M12 14v4M8 22h8M10 18h4'),
  badge: d('M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z'),
  star: d('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'),
  globe: d('M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'),
  phone: d('M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z'),
  smartphone: d('M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 17a1 1 0 110-2 1 1 0 010 2z'),
  download: d('M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3'),
  check: d('M20 6L9 17l-5-5'),
  'check-circle': d('M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3'),
  arrow_right: d('M5 12h14M12 5l7 7-7 7'),
  menu: d('M3 12h18M3 6h18M3 18h18'),
  x: d('M18 6L6 18M6 6l12 12'),
  users: d('M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 110 8 4 4 0 010-8z'),
  bar_chart: d('M12 20V10M18 20V4M6 20v-4'),
  volume: d('M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07'),
  heart: d('M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'),
  map_pin: d('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 110 6 3 3 0 010-6z'),
  calendar: d('M3 4h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zM1 9h22M8 2v4M16 2v4'),
  ticket: d('M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z'),
  shield: d('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'),
  zap: d('M13 2L3 14h9l-1 8 10-12h-9l1-8z'),
  mic: d('M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8'),
  disc: d('M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z'),
  trending_up: d('M23 6l-9.5 9.5-5-5L1 18M17 6h6v6'),
  repeat: d('M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3'),
  shuffle: d('M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5'),
  mail: d('M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6'),
  info: d('M12 22a10 10 0 100-20 10 10 0 000 20zM12 8v4M12 16h.01'),
  eye: d('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 110 6 3 3 0 010-6z'),
  'eye-off': d('M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22'),
  award: d('M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12'),
}

export type IconName = keyof typeof icons

export default function Icon({ name, size = 20, className = '', style, 'aria-hidden': ariaHidden = true }: IconProps & { name: IconName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden={ariaHidden}
    >
      <path d={icons[name]} />
    </svg>
  )
}
