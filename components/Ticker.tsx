'use client'

import { useLang } from '@/lib/LangContext'

export default function Ticker() {
  const { t } = useLang()
  const items = t('ticker.items').split('·').map(s => s.trim()).filter(Boolean)
  const doubled = [...items, ...items]

  return (
    <div className="ticker-wrap" aria-label="Actualités" aria-live="off">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
