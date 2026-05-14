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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('results.breakdown')}</h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border-2 border-blue-200 space-y-6"
      >
        <div className="text-center">
          <p className="text-gray-600 text-sm font-semibold mb-3">{t('results.monthlyFee')}</p>
          <p className="text-4xl font-bold text-blue-600">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')}</p>
        </div>
        
        <div className="border-t border-blue-300 pt-6">
          <p className="text-gray-600 text-sm font-semibold mb-3">{t('results.perStudentFee')}</p>
          <p className="text-4xl font-bold text-indigo-600">Rs. {breakdown.perStudentFee.toLocaleString('en-LK')}</p>
        </div>

        {breakdown.hoursSurcharge > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-50 p-4 rounded border border-yellow-200 mt-4"
          >
            <p className="text-sm text-yellow-800">
              <strong>{t('results.hoursSurcharge')}:</strong> {formatCurrency(breakdown.hoursSurcharge)}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
