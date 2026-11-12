import { useEffect, useState } from 'react'
import { Download, Share, PlusSquare, X, MoreVertical } from 'lucide-react'
import { useLang } from '../i18n'

const DISMISS_KEY = 'sos-install-dismissed'
const DISMISS_DAYS = 7
const SHOW_DELAY_MS = 3000
export const OPEN_INSTALL_EVENT = 'sos:open-install'

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

function recentlyDismissed() {
  try {
    const t = Number(localStorage.getItem(DISMISS_KEY))
    return t && Date.now() - t < DISMISS_DAYS * 864e5
  } catch {
    return false
  }
}

/**
 * "Install the app" banner.
 *  • Android / Chrome / Edge: one-tap Install using the browser's own install prompt.
 *  • iPhone / iPad (Safari has no install prompt): shows the two Add-to-Home-Screen steps.
 *  • Other browsers: shows where to find "Install app" in the browser menu.
 * Hidden once installed, and for 7 days after "Not now".
 */
export default function InstallApp() {
  const [deferred, setDeferred] = useState(null) // the browser's saved install prompt
  const [mode, setMode] = useState(null) // 'prompt' | 'ios' | 'manual'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isStandalone()) return // already running as the installed app

    let timer
    // Delayed auto-open; re-checks at fire time so a "Not now" in the meantime is respected
    const scheduleOpen = () => {
      clearTimeout(timer)
      if (recentlyDismissed()) return
      timer = setTimeout(() => {
        if (!recentlyDismissed()) setOpen(true)
      }, SHOW_DELAY_MS)
    }
    const onPrompt = (e) => {
      e.preventDefault() // keep it; we show our own button instead of the mini-infobar
      setDeferred(e)
      setMode('prompt')
      scheduleOpen()
    }
    const onInstalled = () => {
      setOpen(false)
      setDeferred(null)
    }
    const onOpenRequest = () => {
      clearTimeout(timer) // opened by hand — no need for the delayed auto-open
      setMode((m) => m || (isIOS() ? 'ios' : 'manual'))
      setOpen(true)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener(OPEN_INSTALL_EVENT, onOpenRequest)

    if (isIOS()) {
      setMode('ios')
      scheduleOpen()
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener(OPEN_INSTALL_EVENT, onOpenRequest)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {}
  }

  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    const { outcome } = await deferred.userChoice
    setDeferred(null)
    setOpen(false)
    if (outcome !== 'accepted') dismiss()
  }

  const { t } = useLang()
  if (!open || !mode) return null

  return (
    <div
      role="dialog"
      aria-labelledby="install-title"
      className="install-slide fixed bottom-4 left-4 right-24 z-40 max-w-sm rounded-2xl border border-line bg-pitch-800/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:p-5"
    >
      <button type="button" onClick={dismiss} className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-pitch-600 hover:text-ink" aria-label={t('Close', 'बंद करें')}>
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3 pr-6">
        <img src="/icons/icon-192.png" alt="" width="48" height="48" className="h-12 w-12 shrink-0 rounded-xl" />
        <div>
          <p id="install-title" className="font-display text-xl font-extrabold uppercase leading-tight">{t('Get the app', 'ऐप पाएँ')}</p>
          <p className="text-xs text-muted">{t('School of Soccer on your home screen — opens in one tap.', 'स्कूल ऑफ सॉकर आपकी होम स्क्रीन पर — एक टैप में खुलेगा।')}</p>
        </div>
      </div>

      {mode === 'prompt' && (
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={install} className="btn-primary !min-h-11 flex-1">
            <Download className="h-4 w-4" aria-hidden="true" /> {t('Install App', 'ऐप इंस्टॉल करें')}
          </button>
          <button type="button" onClick={dismiss} className="rounded-full px-4 text-sm font-semibold text-muted transition hover:text-ink">
            {t('Not now', 'अभी नहीं')}
          </button>
        </div>
      )}

      {mode === 'ios' && (
        <ol className="mt-4 grid gap-2 text-sm text-ink">
          <li className="flex items-center gap-2.5 rounded-xl bg-pitch-600/60 px-3 py-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-pitch-950">1</span>
            {t('Tap', 'Safari में')} <Share className="h-4 w-4 text-accent" aria-label="Share" /> <strong>Share</strong> {t('in Safari', 'दबाएँ')}
          </li>
          <li className="flex items-center gap-2.5 rounded-xl bg-pitch-600/60 px-3 py-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-pitch-950">2</span>
            {t('Choose', 'चुनें')} <PlusSquare className="h-4 w-4 text-accent" aria-hidden="true" /> <strong>Add to Home Screen</strong>
          </li>
        </ol>
      )}

      {mode === 'manual' && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-pitch-600/60 px-3 py-2.5 text-sm text-ink">
          <MoreVertical className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            {t('Open your browser menu and choose', 'ब्राउज़र का मेनू खोलें और चुनें')} <strong>Install app</strong> {t('or', 'या')} <strong>Add to Home screen</strong>.
          </span>
        </p>
      )}
    </div>
  )
}
