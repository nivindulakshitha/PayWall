// components/Calculator.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
    hours: undefined, // Will use default based on grade
  })

  const breakdown = calculateFees(inputs)

  const steps = [
    { id: 'grade', label: t('steps.grade') },
    { id: 'location', label: t('steps.location') },
    { id: 'method', label: t('steps.method') },
    { id: 'frequency', label: t('steps.frequency') },
    { id: 'hours', label: t('steps.hours') },
    { id: 'students', label: t('steps.students') },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
      setEditMode(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
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
    <div className="space-y-6">
      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        {steps.map((step, idx) => (
          <motion.div key={step.id} className="flex items-center flex-1 last:flex-none">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer transition-all ${
                editMode && idx === currentStep
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                  : idx <= currentStep
                  ? 'bg-blue-600 text-white'
                  : showResults
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => editMode && handleEdit(idx)}
            >
              {idx + 1}
            </motion.div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  idx < currentStep || showResults ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {!showResults && !editMode ? (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{steps[currentStep].label}</h2>
          <StepForm step={currentStep} inputs={inputs} setInputs={setInputs} />

          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                {t('buttons.back')}
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="flex-1 btn-primary"
            >
              {currentStep === steps.length - 1 ? t('buttons.calculate') : t('buttons.next')}
            </motion.button>
          </div>
        </motion.div>
      ) : editMode ? (
        <motion.div
          key={`edit-${currentStep}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{t('buttons.adjust')}: {steps[currentStep].label}</h2>
          </div>
          <StepForm step={currentStep} inputs={inputs} setInputs={setInputs} />

          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditMode(false)}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              {t('buttons.back')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveEdit}
              className="flex-1 btn-primary"
            >
              {t('buttons.calculate')}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Editable Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('results.summary')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: t('labels.grade'), value: inputs.grade === 'al' ? 'A/L' : inputs.grade === 'ol' ? 'O/L' : 'Grade 6-9', step: 0 },
                { label: t('labels.location'), value: `${inputs.distance + 8}km`, step: 1 },
                { label: t('labels.method'), value: inputs.method === 'online' ? t('methods.online') : t('methods.physical'), step: 2 },
                { label: t('labels.frequency'), value: `${inputs.frequency}x/week`, step: 3 },
                { label: t('labels.students'), value: `${inputs.students}`, step: 4 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleEdit(item.step)}
                  className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 cursor-pointer hover:border-blue-400 transition-all"
                >
                  <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-blue-600">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <FeeBreakdown breakdown={breakdown} />
          <WhatsAppShare inputs={inputs} breakdown={breakdown} />

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              {t('buttons.reset')}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
