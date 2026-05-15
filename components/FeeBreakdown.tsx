// components/FeeBreakdown.tsx
'use client'

import { motion } from 'framer-motion'
import { FeeBreakdown, formatCurrency } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'

interface FeeBreakdownProps {
  breakdown: FeeBreakdown
  frequency?: number // sessions per week for per-day calculation
}

export default function FeeBreakdownCard({ breakdown, frequency = 1 }: FeeBreakdownProps) {
  const { t } = useLanguage()

  // Calculate one day fee: monthly fee / (sessions per week * 4 weeks)
  const sessionsPerMonth = frequency * 4
  const oneDayFee = Math.ceil(breakdown.monthlyFee / sessionsPerMonth)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('results.breakdown')}</h2>

      {/* Key Fees Section */}
      <div className="grid grid-cols-3 gap-3 mb-8 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 p-4 rounded-lg border border-blue-200"
        >
          <p className="text-blue-700 text-xs font-semibold mb-1">{t('results.monthlyFee')}</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-900">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
        >
          <p className="text-indigo-700 text-xs font-semibold mb-1">{t('results.perStudentFee')}</p>
          <p className="text-2xl md:text-3xl font-bold text-indigo-900">Rs. {breakdown.perStudentFee.toLocaleString('en-LK')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 p-4 rounded-lg border border-green-200"
        >
          <p className="text-green-700 text-xs font-semibold mb-1">{t('results.oneDayFee')}</p>
          <p className="text-2xl md:text-3xl font-bold text-green-900">Rs. {oneDayFee.toLocaleString('en-LK')}</p>
        </motion.div>
      </div>

      {/* Detailed Bill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
      >
        {/* Bill Header */}
        <div className="bg-gray-100 px-4 md:px-6 py-3 md:py-4 border-b border-gray-300">
          <h3 className="font-bold text-gray-900 text-sm md:text-base">{t('results.detailedBreakdown') || 'Calculation Details'}</h3>
        </div>

        {/* Bill Items */}
        <div className="p-4 md:p-6 space-y-3">
          {/* Base Fee */}
          <div className="flex items-start justify-between gap-4 py-2">
            <div>
              <p className="font-semibold text-gray-900 text-sm md:text-base">{t('results.baseFee')}</p>
              <p className="text-xs text-gray-600 mt-1">Base monthly fee</p>
            </div>
            <p className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">{formatCurrency(breakdown.baseFee)}</p>
          </div>

          {/* Fuel Charge */}
          {breakdown.distanceSurcharge > 0 && (
            <div className="flex items-start justify-between gap-4 py-2 border-t border-gray-200 pt-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{t('results.fuelCharge')}</p>
                <p className="text-xs text-gray-600 mt-1">({breakdown.distanceKm - 8} + 8) × 2 × Rs.10 × {frequency} × 4 weeks</p>
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">+ {formatCurrency(breakdown.distanceSurcharge)}</p>
            </div>
          )}

          {/* Student Charge */}
          {breakdown.fuelCharge > 0 && (
            <div className="flex items-start justify-between gap-4 py-2 border-t border-gray-200 pt-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{t('results.studentCharge')}</p>
                <p className="text-xs text-gray-600 mt-1">{breakdown.studentMultiplier} × Rs.{breakdown.studentRate}</p>
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">+ {formatCurrency(breakdown.fuelCharge)}</p>
            </div>
          )}

          {/* Frequency Surcharge */}
          {breakdown.frequencySurcharge > 0 && (
            <div className="flex items-start justify-between gap-4 py-2 border-t border-gray-200 pt-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{t('results.frequencySurcharge')}</p>
                <p className="text-xs text-gray-600 mt-1">10% per extra session</p>
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">+ {formatCurrency(breakdown.frequencySurcharge)}</p>
            </div>
          )}

          {/* Hours Surcharge */}
          {breakdown.hoursSurcharge > 0 && (
            <div className="flex items-start justify-between gap-4 py-2 border-t border-gray-200 pt-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm md:text-base">{t('results.hoursSurcharge')}</p>
                <p className="text-xs text-gray-600 mt-1">10% per extra hour</p>
              </div>
              <p className="font-bold text-yellow-600 text-sm md:text-base whitespace-nowrap">+ {formatCurrency(breakdown.hoursSurcharge)}</p>
            </div>
          )}

          {/* Group Discount */}
          <div className="flex items-start justify-between gap-4 py-2 border-t border-gray-200 pt-3">
            <div>
              <p className="font-semibold text-gray-900 text-sm md:text-base">{t('results.groupDiscount')}</p>
              <p className="text-xs text-gray-600 mt-1">
                {breakdown.studentMultiplier >= 3 ? '10% for 3+ students' : breakdown.studentMultiplier === 2 ? '5% for 2 students' : 'No discount (1 student)'}
              </p>
            </div>
            <p className={`font-bold text-sm md:text-base whitespace-nowrap ${breakdown.groupDiscount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              {breakdown.groupDiscount > 0 ? `- ${formatCurrency(breakdown.groupDiscount)}` : 'Rs. 0'}
            </p>
          </div>

          {/* Total */}
          <div className="border-t-2 border-gray-300 pt-3 mt-4 flex items-center justify-between">
            <span className="font-bold text-gray-900 text-base md:text-lg">{t('results.total')}</span>
            <span className="font-bold text-blue-600 text-lg md:text-xl">{formatCurrency(breakdown.monthlyFee)}</span>
          </div>

          {/* Per Student & Per Day Calculations */}
          <div className="bg-gray-50 p-3 md:p-4 rounded mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-gray-700">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')} ÷ {breakdown.studentMultiplier} students</span>
              <span className="font-bold text-indigo-600">{formatCurrency(breakdown.perStudentFee)}</span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-gray-700">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')} ÷ {sessionsPerMonth} sessions</span>
              <span className="font-bold text-green-600">{formatCurrency(oneDayFee)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Extra Hours Warning */}
      {breakdown.hoursSurcharge > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <p className="text-sm text-yellow-900 font-semibold mb-1">Extra Hours Surcharge</p>
          <p className="text-xs md:text-sm text-yellow-800">
            An additional {formatCurrency(breakdown.hoursSurcharge)} has been added for exceeding the default class duration.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
