// components/StepForm.tsx
'use client'

import { motion } from 'framer-motion'
import { FeeCalculationInputs } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'

interface StepFormProps {
  step: number
  inputs: FeeCalculationInputs
  setInputs: (inputs: FeeCalculationInputs) => void
  onGradeChange?: (grade: '6-9' | 'ol' | 'al') => void
}

export default function StepForm({ step, inputs, setInputs, onGradeChange }: StepFormProps) {
  const { t } = useLanguage()

  const handleChange = (key: keyof FeeCalculationInputs, value: any) => {
    setInputs({ ...inputs, [key]: value })
    if (key === 'grade' && onGradeChange) {
      onGradeChange(value as '6-9' | 'ol' | 'al')
    }
  }

  const renderStep = () => {
    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0 },
    }

    switch (step) {
      case 0: // Grade
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm text-gray-400">{t('messages.selectGrade')}</p>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { value: '6-9', label: t('grades.6-9'), desc: 'Grades 6 to 9' },
                { value: 'ol', label: t('grades.ol'), desc: 'O/L Examination' },
                { value: 'al', label: t('grades.al'), desc: 'A/L Examination' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleChange('grade', option.value)}
                  className={`option-card text-left ${
                    inputs.grade === option.value ? 'option-card-active' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold text-sm ${inputs.grade === option.value ? 'text-indigo-300' : 'text-gray-200'}`}>
                        {option.label}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      inputs.grade === option.value
                        ? 'border-indigo-400 bg-indigo-500'
                        : 'border-gray-600'
                    }`}>
                      {inputs.grade === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 1: // Location/Distance
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm text-gray-400">{t('messages.enterDistance')}</p>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                {t('labels.location')}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={inputs.distance}
                  onChange={(e) => handleChange('distance', parseFloat(e.target.value) || 0)}
                  className="input-field text-lg font-semibold pr-12"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-500 font-bold">km</span>
              </div>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <p className="text-sm font-bold text-indigo-300/80">
                  Total: {inputs.distance + 7}km (distance + 7km constant)
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 2: // Method
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm text-gray-400">{t('messages.selectMethod')}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  value: 'online',
                  label: t('methods.online'),
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  value: 'physical',
                  label: t('methods.physical'),
                  icon: (
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChange('method', option.value)}
                  className={`option-card text-center py-6 ${
                    inputs.method === option.value ? 'option-card-active' : ''
                  }`}
                >
                  <div className={`mx-auto mb-3 ${inputs.method === option.value ? 'text-indigo-400' : 'text-gray-500'} transition-colors`}>
                    {option.icon}
                  </div>
                  <p className={`text-base font-bold ${inputs.method === option.value ? 'text-indigo-300' : 'text-gray-300'} transition-colors`}>
                    {option.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 3: // Frequency
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm text-gray-400">{t('messages.selectFrequency')}</p>
            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((freq) => (
                <motion.button
                  key={freq}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('frequency', freq)}
                  className={`option-card text-center py-5 ${
                    inputs.frequency === freq ? 'option-card-active' : ''
                  }`}
                >
                  <p className={`text-2xl font-bold mb-1 ${inputs.frequency === freq ? 'text-indigo-300' : 'text-gray-300'} transition-colors`}>
                    {freq}x
                  </p>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">/ week</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 4: // Hours/Duration
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm text-gray-400">{t('messages.selectHours')}</p>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                {t('labels.hours')}
              </label>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleChange('hours', Math.max(1, (inputs.hours || 2) - 1))}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-gray-300 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  -
                </motion.button>
                <div className="flex-1 text-center">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={inputs.hours || 2}
                    onChange={(e) => handleChange('hours', parseInt(e.target.value) || 2)}
                    className="input-field text-center text-3xl font-bold !py-4"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleChange('hours', Math.min(5, (inputs.hours || 2) + 1))}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-gray-300 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  +
                </motion.button>
              </div>
              <p className="text-center text-sm font-bold text-gray-600 mt-2 lowercase">hours per session</p>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <p className="text-sm font-bold text-amber-400/80">
                  Default: 6-9 &amp; O/L = 2hrs, A/L = 3hrs
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 5: // Students
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm text-gray-400">{t('messages.selectStudents')}</p>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                {t('labels.students')}
              </label>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleChange('students', Math.max(1, inputs.students - 1))}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-gray-300 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  -
                </motion.button>
                <div className="flex-1 text-center">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={inputs.students}
                    onChange={(e) => handleChange('students', parseInt(e.target.value) || 1)}
                    className="input-field text-center text-3xl font-bold !py-4"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleChange('students', inputs.students + 1)}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-gray-300 transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  +
                </motion.button>
              </div>
              <p className="text-center text-xs text-gray-600 mt-2">students per class</p>
              {inputs.students >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 rounded-lg"
                  style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.1)' }}
                >
                  <p className="text-xs text-emerald-400/80">
                    {inputs.students >= 3 ? '10% group discount applied!' : '5% group discount applied!'}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
    {renderStep()}
  </motion.div>
}
