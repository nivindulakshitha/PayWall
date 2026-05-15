// components/LanguageToggle.tsx
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'si' : 'en')
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={toggleLanguage}
      className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      title={`Switch to ${language === 'en' ? 'Sinhala' : 'English'}`}
    >
      <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="text-gray-300 group-hover:text-white transition-colors">
        {t('buttons.toggleLanguage')}
      </span>
    </motion.button>
  )
}
