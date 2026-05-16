import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('paywall_tour_seen')
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowTour(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const toggleLanguage = () => {
    if (showTour) dismissTour()
    setLanguage(language === 'en' ? 'si' : 'en')
  }

  const dismissTour = () => {
    setShowTour(false)
    localStorage.setItem('paywall_tour_seen', 'true')
  }

  return (
    <div className="relative">
      <motion.button
        id="language-toggle"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={toggleLanguage}
        className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative z-[101]"
        style={{
          background: showTour ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.04)',
          border: showTour ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
        }}
        title={`Switch to ${language === 'en' ? 'Sinhala' : 'English'}`}
      >
        <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-gray-300 group-hover:text-white transition-colors sinhala">
          {t('buttons.toggleLanguage')}
        </span>

        {/* Pulse effect when tour is active */}
        {showTour && (
          <div className="absolute inset-0 rounded-xl border-2 border-indigo-500 animate-ping opacity-50" />
        )}
      </motion.button>

      {/* Tour Tooltip */}
      <AnimatePresence>
        {showTour && (
          <>
            {/* Global backdrop to handle dismissal */}
            <div
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[1px]"
              onClick={dismissTour}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full mt-4 right-0 z-[102] w-[280px]"
            >
              <div className="glass-card-elevated !p-5 shadow-2xl shadow-indigo-500/20 border-indigo-500/30 sinhala">
                {/* Arrow */}
                <div className="absolute -top-1.5 right-6 w-3 h-3 bg-[#111827] border-t border-l border-indigo-500/30 rotate-45" />

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">සිංහල භාෂාව (Sinhala)</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      මෙමගින් ඔබට සියලු විස්තර සිංහල භාෂාවෙන් ලබා ගත හැකිය.
                    </p>
                  </div>
                </div>

                <button
                  onClick={dismissTour}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all uppercase tracking-widest active:scale-95 shadow-lg shadow-indigo-600/20"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
