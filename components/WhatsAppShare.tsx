// components/WhatsAppShare.tsx
'use client'

import { motion } from 'framer-motion'
import { FeeCalculationInputs, FeeBreakdown, generateWhatsAppMessage } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'

interface WhatsAppShareProps {
  inputs: FeeCalculationInputs
  breakdown: FeeBreakdown
}

export default function WhatsAppShare({ inputs, breakdown }: WhatsAppShareProps) {
  const { t } = useLanguage()

  const getGradeLabel = () => {
    const gradeLabels: Record<string, string> = {
      '6-9': t('grades.6-9'),
      'ol': t('grades.ol'),
      'al': t('grades.al'),
    }
    return gradeLabels[inputs.grade]
  }

  const getMethodLabel = () => {
    return inputs.method === 'online' ? t('methods.online') : t('methods.physical')
  }

  const handleShare = () => {
    const message = generateWhatsAppMessage(
      inputs,
      breakdown,
      getGradeLabel(),
      getMethodLabel(),
      `${inputs.frequency}x ${t('labels.frequency')}`,
      `${inputs.students} ${t('labels.students')}`
    )

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/94787124080?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-6"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.89 1.227c-1.477.8-2.84 1.932-3.872 3.343-1.032 1.411-1.697 3.049-1.935 4.773-.192 1.337-.04 2.689.43 3.957.493 1.373 1.328 2.611 2.415 3.6 1.087.989 2.424 1.695 3.88 2.062 1.456.366 3.005.334 4.447-.099 1.442-.434 2.757-1.216 3.761-2.29l.071-.071c.984-1.097 1.727-2.446 2.151-3.908.424-1.462.372-3.049-.145-4.56-.517-1.51-1.39-2.868-2.567-3.889-1.177-1.022-2.629-1.684-4.185-1.945-.77-.128-1.574-.089-2.361.117zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
        {t('buttons.shareWhatsApp')}
      </motion.button>
      <p className="text-center text-sm text-gray-500 mt-3">
        📱 WhatsApp: <strong>0787124080</strong>
      </p>
    </motion.div>
  )
}
