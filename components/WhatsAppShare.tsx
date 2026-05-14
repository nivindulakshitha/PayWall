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

  const handleCopyToClipboard = () => {
    const message = generateWhatsAppMessage(
      inputs,
      breakdown,
      getGradeLabel(),
      getMethodLabel(),
      `${inputs.frequency}x ${t('labels.frequency')}`,
      `${inputs.students} ${t('labels.students')}`
    )
    navigator.clipboard.writeText(message)
  }

  const handleCopyToClipboard = () => {
    const message = generateWhatsAppMessage(
      inputs,
      breakdown,
      getGradeLabel(),
      getMethodLabel(),
      `${inputs.frequency}x ${t('labels.frequency')}`,
      `${inputs.students} ${t('labels.students')}`
    )

    navigator.clipboard.writeText(message).then(() => {
      alert(t('messages.copiedToClipboard') || 'Copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy')
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-6 space-y-4"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopyToClipboard}
        className="w-full px-6 py-4 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
        <span className="text-lg">{t('buttons.copyClipboard') || 'Copy to Clipboard'}</span>
      </motion.button>

      <p className="text-center text-sm text-gray-500">
        📱 WhatsApp: <strong>0787124080</strong>
      </p>
    </motion.div>
  )
}
