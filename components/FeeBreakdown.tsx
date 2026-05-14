// components/FeeBreakdown.tsx
'use client'

import { motion } from 'framer-motion'
import { FeeBreakdown, formatCurrency } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'

interface FeeBreakdownProps {
  breakdown: FeeBreakdown
}

export default function FeeBreakdownCard({ breakdown }: FeeBreakdownProps) {
  const { t } = useLanguage()

  const items = [
    { label: t('results.baseFee'), value: breakdown.baseFee },
    { label: t('results.distanceSurcharge'), value: breakdown.distanceSurcharge },
    { label: t('results.frequencySurcharge'), value: breakdown.frequencySurcharge },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('results.breakdown')}</h2>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 mb-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0"
          >
            <span className="text-gray-700">{item.label}</span>
            <span className="font-semibold text-gray-900">{formatCurrency(item.value)}</span>
          </motion.div>
        ))}

        {breakdown.groupDiscount > 0 && (
          <motion.div variants={item} className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-green-700 font-semibold">{t('results.groupDiscount')}</span>
            <span className="font-semibold text-green-700">-{formatCurrency(breakdown.groupDiscount)}</span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">{t('results.monthlyFee')}</p>
            <p className="text-3xl font-bold text-blue-600">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">{t('results.sessionFee')}</p>
            <p className="text-3xl font-bold text-indigo-600">Rs. {breakdown.sessionFee.toLocaleString('en-LK')}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
