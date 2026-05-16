// components/FeeBreakdown.tsx
'use client'

import { motion } from 'framer-motion'
import { FeeBreakdown, formatCurrency, FUEL_CHARGE_PER_KM } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'

interface FeeBreakdownProps {
  breakdown: FeeBreakdown
  frequency?: number // sessions per week for per-day calculation
}

export default function FeeBreakdownCard({ breakdown, frequency = 4 }: FeeBreakdownProps) {
  const { t } = useLanguage()

  // Calculate one day fee: monthly fee / sessions per month
  const sessionsPerMonth = frequency
  const oneDayFee = Math.ceil(breakdown.monthlyFee / sessionsPerMonth)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Hero Fee Visualization */}
      <motion.div variants={itemVariants} className="relative mb-6 p-1">
        <div className="flex items-stretch gap-0 relative">
          {/* Main Root: Monthly Fee */}
          <div className="z-10 w-[42%]">
            <div 
              className="h-full rounded-2xl p-4 md:p-5 relative overflow-hidden flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.16), rgba(99, 102, 241, 0.06))',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.08)',
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/10 blur-2xl -mr-8 -mt-8" />
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">{t('results.monthlyFee')}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-black text-white tabular-nums tracking-tight">
                  Rs. {breakdown.monthlyFee.toLocaleString('en-LK')}
                </span>
              </div>
            </div>
          </div>

          {/* Branching Lines (SVG) */}
          <div className="relative w-8 md:w-12 flex-shrink-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 100" preserveAspectRatio="none">
              {/* Top Branch */}
              <path 
                d="M 0 50 Q 20 50, 20 25 L 40 25" 
                fill="none" 
                stroke="rgba(139, 92, 246, 0.3)" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              {/* Bottom Branch */}
              <path 
                d="M 0 50 Q 20 50, 20 75 L 40 75" 
                fill="none" 
                stroke="rgba(16, 185, 129, 0.3)" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              {/* Connecting Dots */}
              <circle cx="0" cy="50" r="3" fill="rgba(99, 102, 241, 0.6)" />
              <circle cx="40" cy="25" r="2.5" fill="rgba(139, 92, 246, 0.5)" />
              <circle cx="40" cy="75" r="2.5" fill="rgba(16, 185, 129, 0.5)" />
            </svg>
          </div>

          {/* Leaf Nodes: Components */}
          <div className="flex-1 flex flex-col gap-2.5">
            {/* Per Student Node */}
            <div 
              className="flex-1 rounded-xl p-3 md:p-4 relative overflow-hidden flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(139, 92, 246, 0.04))',
                border: '1px solid rgba(139, 92, 246, 0.15)',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[9px] font-bold text-purple-400/80 uppercase tracking-wider mb-1">{t('results.perStudentFee')}</p>
                  <p className="text-sm md:text-base font-bold text-white tabular-nums">
                    Rs. {breakdown.perStudentFee.toLocaleString('en-LK')} <span className="text-purple-400/60 font-medium">× {breakdown.studentMultiplier}</span>
                  </p>
                </div>
                <div className="text-[9px] font-medium text-gray-500 italic hidden md:block">
                  ({t('results.students')})
                </div>
              </div>
            </div>

            {/* One Day Node */}
            <div 
              className="flex-1 rounded-xl p-3 md:p-4 relative overflow-hidden flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.04))',
                border: '1px solid rgba(16, 185, 129, 0.15)',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[9px] font-bold text-emerald-400/80 uppercase tracking-wider mb-1">{t('results.oneDayFee')}</p>
                  <p className="text-sm md:text-base font-bold text-white tabular-nums">
                    Rs. {oneDayFee.toLocaleString('en-LK')} <span className="text-emerald-400/60 font-medium">× {sessionsPerMonth}</span>
                  </p>
                </div>
                <div className="text-[9px] font-medium text-gray-500 italic hidden md:block">
                  ({t('results.frequency')})
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Breakdown */}
      <motion.div
        variants={itemVariants}
        className="glass-card !p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('results.detailedBreakdown') || 'Calculation Details'}</h3>
        </div>

        {/* Bill Items */}
        <div className="px-5 py-4 space-y-0">
          {/* Base Fee */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-200">{t('results.baseFee')}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{t('results.baseFeeDesc')}</p>
            </div>
            <p className="text-sm font-semibold text-gray-200 tabular-nums">{formatCurrency(breakdown.baseFee)}</p>
          </div>

          {/* Fuel Charge */}
          {breakdown.fuelCharge > 0 && (
            <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <p className="text-sm font-medium text-gray-200">{t('results.fuelCharge')}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {breakdown.distanceKm}km × 2 (round trip) × Rs.{FUEL_CHARGE_PER_KM}/km × {frequency} days
                </p>
              </div>
              <p className="text-sm font-semibold text-amber-400 tabular-nums">+ {formatCurrency(breakdown.fuelCharge)}</p>
            </div>
          )}

          {/* Student Charge */}
          {breakdown.studentCharge > 0 && (
            <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <p className="text-sm font-medium text-gray-200">{t('results.studentCharge')}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{breakdown.studentMultiplier} x Rs.{breakdown.studentRate}</p>
              </div>
              <p className="text-sm font-semibold text-amber-400 tabular-nums">+ {formatCurrency(breakdown.studentCharge)}</p>
            </div>
          )}

          {/* Frequency Surcharge */}
          {breakdown.frequencySurcharge > 0 && (
            <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${breakdown.isFrequencySurchargeWaived ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                    {t('results.frequencySurcharge')}
                  </p>
                  {breakdown.isFrequencySurchargeWaived && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-tighter sinhala">
                      {t('results.waived')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{t('results.frequencyDesc')}</p>
              </div>
              <p className={`text-sm font-semibold tabular-nums ${breakdown.isFrequencySurchargeWaived ? 'text-gray-500 line-through decoration-emerald-500/50' : 'text-amber-400'}`}>
                {breakdown.isFrequencySurchargeWaived ? formatCurrency(breakdown.frequencySurcharge) : `+ ${formatCurrency(breakdown.frequencySurcharge)}`}
              </p>
            </div>
          )}

          {/* Hours Surcharge */}
          {breakdown.hoursSurcharge > 0 && (
            <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <p className="text-sm font-medium text-gray-200">{t('results.hoursSurcharge')}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">10% per extra hour</p>
              </div>
              <p className="text-sm font-semibold text-amber-400 tabular-nums">+ {formatCurrency(breakdown.hoursSurcharge)}</p>
            </div>
          )}

          {/* Group Discount */}
          <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div>
              <p className="text-sm font-medium text-gray-200">{t('results.groupDiscount')}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {breakdown.studentMultiplier && breakdown.studentMultiplier >= 3 
                  ? t('results.discount3') 
                  : breakdown.studentMultiplier === 2 
                    ? t('results.discount2') 
                    : t('results.noDiscount')}
              </p>
            </div>
            <p className={`text-sm font-semibold tabular-nums ${breakdown.groupDiscount > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
              {breakdown.groupDiscount > 0 ? `- ${formatCurrency(breakdown.groupDiscount)}` : 'Rs. 0'}
            </p>
          </div>
          {/* Rounding Adjustment */}
          {breakdown.adjustment !== 0 && (
            <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <p className="text-sm font-medium text-gray-200">{t('results.adjustment')}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {t('results.adjustmentDesc')} (Rs. {breakdown.perStudentAdjustment.toFixed(0)} x {breakdown.studentMultiplier})
                </p>
              </div>
              <p className={`text-sm font-semibold tabular-nums ${breakdown.adjustment > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {breakdown.adjustment > 0 ? `+ ${formatCurrency(breakdown.adjustment)}` : `- ${formatCurrency(Math.abs(breakdown.adjustment))}`}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between pt-4 mt-2" style={{ borderTop: '2px solid rgba(255,255,255,0.08)' }}>
            <span className="text-sm font-bold text-white uppercase tracking-wider">{t('results.total')}</span>
            <span className="text-lg font-extrabold gradient-text-accent tabular-nums">{formatCurrency(breakdown.monthlyFee)}</span>
          </div>

          {/* Per Student & Per Day */}
          <div className="mt-4 p-3.5 rounded-xl space-y-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')} / {breakdown.studentMultiplier} students</span>
              <span className="font-bold text-purple-400 tabular-nums">{formatCurrency(breakdown.perStudentFee)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Rs. {breakdown.monthlyFee.toLocaleString('en-LK')} / {sessionsPerMonth} sessions</span>
              <span className="font-bold text-emerald-400 tabular-nums">{formatCurrency(oneDayFee)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Deadline Note */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl p-3.5 flex items-center gap-3"
        style={{
          background: 'rgba(99, 102, 241, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-[11px] font-bold text-gray-400 leading-tight">
          {t('results.paymentDeadline')}
        </p>
      </motion.div>

      {/* Extra Hours Warning */}
      {breakdown.hoursSurcharge > 0 && (
        <motion.div
          variants={itemVariants}
          className="rounded-xl p-4"
          style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.12)',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-300 mb-0.5">Extra Hours Surcharge</p>
              <p className="text-[11px] text-amber-400/70 leading-relaxed">
                An additional {formatCurrency(breakdown.hoursSurcharge)} for exceeding the default class duration.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
