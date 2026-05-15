// components/Calculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateFees, FeeCalculationInputs } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'
import StepForm from './StepForm'
import FeeBreakdown from './FeeBreakdown'
import WhatsAppShare from './WhatsAppShare'

export default function Calculator() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [inputs, setInputs] = useState<FeeCalculationInputs>({
    grade: 'ol',
    distance: 0,
    method: 'physical',
    frequency: 1,
    students: 1,
    hours: 2, // Default for O/L is 2 hours
    examYear: 2026,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.has('g')) {
        setInputs({
          grade: (params.get('g') || 'ol') as '6-9' | 'ol' | 'al',
          distance: parseFloat(params.get('d') || '0'),
          method: (params.get('m') || 'physical') as 'online' | 'physical',
          frequency: parseInt(params.get('f') || '1', 10),
          hours: parseInt(params.get('h') || '2', 10),
          students: parseInt(params.get('s') || '1', 10),
          examYear: parseInt(params.get('y') || '2026', 10),
        })
        setShowResults(true)
      }
    }
  }, [])

  const breakdown = calculateFees(inputs)

  // Update hours when grade changes
  const handleGradeChange = (grade: '6-9' | 'ol' | 'al') => {
    const defaultHours = grade === 'al' ? 3 : 2
    setInputs({ ...inputs, grade, hours: defaultHours })
  }

  const steps = [
    { id: 'grade', label: t('steps.grade'), icon: '01' },
    { id: 'examYear', label: t('steps.examYear'), icon: 'Y' },
    { id: 'method', label: t('steps.method'), icon: '02' },
    { id: 'location', label: inputs.method === 'online' ? t('steps.payment') : t('steps.location'), icon: '03' },
    { id: 'frequency', label: t('steps.frequency'), icon: '04' },
    { id: 'hours', label: t('steps.hours'), icon: '05' },
    { id: 'students', label: t('steps.students'), icon: '06' },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Skip examYear for grade 6-9
      if (currentStep === 0 && inputs.grade === '6-9') {
        setCurrentStep(2)
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      setShowResults(true)
      setEditMode(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      // Skip examYear for grade 6-9
      if (currentStep === 2 && inputs.grade === '6-9') {
        setCurrentStep(0)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setShowResults(false)
    setEditMode(false)
    setInputs({
      grade: 'ol',
      distance: 0,
      method: 'physical',
      frequency: 1,
      students: 1,
    })
  }

  const handleEdit = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setEditMode(true)
    setShowResults(false)
  }

  const handleSaveEdit = () => {
    setShowResults(true)
    setEditMode(false)
  }

  return (
    <div className="space-y-5">
      {/* Progress Bar */}
      <div className="glass-card !p-4 !rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            {showResults ? t('steps.summary') : `Step ${currentStep + 1}/${steps.length}`}
          </span>
          {showResults && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('buttons.reset')}
            </motion.button>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              className="flex-1 h-1.5 rounded-full overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
              }}
              onClick={() => {
                if (showResults || editMode) handleEdit(idx)
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: showResults || idx < currentStep
                    ? '100%'
                    : idx === currentStep && !showResults
                    ? '50%'
                    : '0%',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="h-full rounded-full"
                style={{
                  background: editMode && idx === currentStep
                    ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                    : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Current step label */}
        {!showResults && (
          <p className="text-xs text-gray-500 mt-2">
            {steps[currentStep].label}
          </p>
        )}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {!showResults && !editMode ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-elevated"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{steps[currentStep].label}</h2>
            <div className="divider my-4" />
            <StepForm
              step={currentStep}
              inputs={inputs}
              setInputs={setInputs}
              onGradeChange={handleGradeChange}
            />

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('buttons.back')}
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                {currentStep === steps.length - 1 ? t('buttons.calculate') : t('buttons.next')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={currentStep === steps.length - 1 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M9 5l7 7-7 7"} />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ) : editMode ? (
          <motion.div
            key={`edit-${currentStep}`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card-elevated"
            style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                {t('buttons.adjust')}
              </span>
              <h2 className="text-xl font-bold text-white">{steps[currentStep].label}</h2>
            </div>
            <div className="divider my-4" />
            <StepForm
              step={currentStep}
              inputs={inputs}
              setInputs={setInputs}
              onGradeChange={handleGradeChange}
            />

            <div className="flex gap-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEditMode(false)}
                className="flex-1 btn-secondary"
              >
                {t('buttons.back')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveEdit}
                className="flex-1 btn-primary"
              >
                {t('buttons.calculate')}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Editable Summary Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('results.summary')}</h3>
                <span className="text-xs font-bold text-gray-600">tap to edit</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  { label: t('labels.grade'), value: inputs.grade === 'al' ? 'A/L' : inputs.grade === 'ol' ? 'O/L' : '6-9', step: 0, color: 'indigo' },
                  ...(inputs.grade !== '6-9' ? [{ label: t('labels.examYear'), value: `${inputs.examYear}`, step: 1, color: 'orange' }] : []),
                  { label: t('labels.method'), value: inputs.method === 'online' ? t('methods.online') : t('methods.physical'), step: 2, color: 'cyan' },
                  { 
                    label: t('labels.location'), 
                    value: inputs.method === 'online' ? t('labels.notApplicable') : `${inputs.distance + 7}km`, 
                    step: 3, 
                    color: 'blue' 
                  },
                  { label: t('labels.frequency'), value: `${inputs.frequency}x/week`, step: 4, color: 'violet' },
                  { label: t('labels.hours'), value: `${inputs.hours || 2}hrs`, step: 5, color: 'purple' },
                  { label: t('labels.students'), value: `${inputs.students}`, step: 6, color: 'fuchsia' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleEdit(item.step)}
                    className="stat-card cursor-pointer group hover:border-indigo-500/30"
                  >
                    <p className="text-xs font-semibold text-gray-500 mb-1 group-hover:text-gray-400 transition-colors truncate">{item.label}</p>
                    <p className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors truncate">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <FeeBreakdown breakdown={breakdown} frequency={inputs.frequency} />
            <WhatsAppShare inputs={inputs} breakdown={breakdown} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
