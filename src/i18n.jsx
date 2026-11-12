import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// ─────────────────────────────────────────────────────────────
// Tiny English / हिंदी language system.
//   t('English', 'हिंदी')  → text in the current language
//   f(obj, 'title')        → obj.titleHi in Hindi (if present), else obj.title
// Real quotes (Google reviews, founder's and legends' words) stay as written.
// ─────────────────────────────────────────────────────────────

const KEY = 'sos-lang'
const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (en) => en, f: (o, k) => o?.[k] })

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'hi') return saved
  } catch {}
  return typeof navigator !== 'undefined' && /^hi\b/i.test(navigator.language || '') ? 'hi' : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
    document.title =
      lang === 'hi' ? 'स्कूल ऑफ सॉकर | समस्तीपुर की फुटबॉल अकादमी' : 'School of Soccer | Football Academy in Samastipur'
  }, [lang])

  const setLang = useCallback((l) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {}
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (en, hi) => (lang === 'hi' && hi ? hi : en),
      f: (obj, key) => (lang === 'hi' && obj?.[`${key}Hi`] ? obj[`${key}Hi`] : obj?.[key]),
    }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

/** EN | हिं pill switch */
export function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  const btn = (code, label, aria) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      aria-label={aria}
      className={`rounded-full px-2.5 py-1 text-xs font-bold transition sm:px-3 sm:py-1.5 ${
        lang === code ? 'bg-accent text-pitch-950 shadow' : 'text-muted hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
  return (
    <div className={`inline-flex shrink-0 items-center rounded-full border border-line bg-pitch-800/80 p-0.5 backdrop-blur ${className}`} role="group" aria-label="Language / भाषा">
      {btn('en', 'EN', 'English')}
      {btn('hi', 'हिं', 'हिंदी में देखें')}
    </div>
  )
}
