// components/QuickTour.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuickTour() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('paywall_tour_seen')
    if (!hasSeenTour) {
      // Small delay to let the app load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismissTour = () => {
    setIsVisible(false)
    localStorage.setItem('paywall_tour_seen', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Backdrop/Overlay - only around the toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto"
            onClick={dismissTour}
          />

          <div className="relative w-full max-w-xl mx-auto px-4 h-full">
            {/* The actual tooltip - positioned relative to where LanguageToggle usually is */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-[60px] right-4 md:right-8 z-[101] pointer-events-auto"
            >
              {/* Pulse effect on the toggle itself (visually) */}
              <div className="absolute -top-[44px] -right-[2px] w-[120px] h-[40px] pointer-events-none">
                <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-ping opacity-50" />
                <div className="absolute inset-0 border-2 border-indigo-400 rounded-xl" />
              </div>

              {/* Tooltip Card */}
              <div className="mt-4 glass-card-elevated !p-5 max-w-[260px] shadow-2xl shadow-indigo-500/20 border-indigo-500/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">සිංහල භාෂාව (Sinhala)</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      මෙම බොත්තම එබීමෙන් ඔබට සිංහල භාෂාවට මාරු විය හැක.
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={dismissTour}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors uppercase tracking-widest"
                >
                  Got it!
                </button>

                {/* Arrow */}
                <div className="absolute -top-2 right-12 w-4 h-4 bg-[#111827] border-t border-l border-indigo-500/30 rotate-45" />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
