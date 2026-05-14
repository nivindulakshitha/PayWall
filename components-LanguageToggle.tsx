// components/LanguageToggle.tsx
'use client'

import { useLanguage } from '@/lib/i18n'

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'si' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
      title={`Switch to ${language === 'en' ? 'Sinhala' : 'English'}`}
    >
      {t('buttons.toggleLanguage')}
    </button>
  )
}
