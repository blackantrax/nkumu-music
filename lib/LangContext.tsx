'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Lang } from './i18n'

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (k) => k,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const stored = localStorage.getItem('nkumu_lang') as Lang | null
    if (stored === 'fr' || stored === 'en') setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('nkumu_lang', l)
  }

  function t(key: string): string {
    const keys = key.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let val: any = translations[lang]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return typeof val === 'string' ? val : key
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
