// components/StepForm.tsx
'use client'

import { motion } from 'framer-motion'
import { FeeCalculationInputs } from '@/lib/calculations'
import { useLanguage } from '@/lib/i18n'

interface StepFormProps {
  step: number
  inputs: FeeCalculationInputs
  setInputs: (inputs: FeeCalculationInputs) => void
}

export default function StepForm({ step, inputs, setInputs }: StepFormProps) {
  const { t } = useLanguage()

  const handleChange = (key: keyof FeeCalculationInputs, value: any) => {
    setInputs({ ...inputs, [key]: value })
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
            <p className="text-gray-600 mb-4">{t('messages.selectGrade')}</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: '6-9', label: t('grades.6-9') },
                { value: 'ol', label: t('grades.ol') },
                { value: 'al', label: t('grades.al') },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange('grade', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                    inputs.grade === option.value
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 1: // Location/Distance
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 mb-4">{t('messages.enterDistance')}</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('labels.location')}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.distance}
                onChange={(e) => handleChange('distance', parseFloat(e.target.value) || 0)}
                className="input-field"
                placeholder="e.g., 5"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 {t('labels.location')} (actual distance + 8km constant = total)
              </p>
            </div>
          </motion.div>
        )

      case 2: // Method
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 mb-4">{t('messages.selectMethod')}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'online', label: t('methods.online'), icon: '🌐' },
                { value: 'physical', label: t('methods.physical'), icon: '🏢' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange('method', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-center font-semibold ${
                    inputs.method === option.value
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 3: // Frequency
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 mb-4">{t('messages.selectFrequency')}</p>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((freq) => (
                <motion.button
                  key={freq}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('frequency', freq)}
                  className={`p-4 rounded-lg border-2 transition-all text-center font-bold text-lg ${
                    inputs.frequency === freq
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {freq}x/week
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 4: // Hours/Duration
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 mb-4">{t('messages.selectHours')}</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('labels.hours')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleChange('hours', Math.max(1, (inputs.hours || 2) - 1))}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={inputs.hours || 2}
                  onChange={(e) => handleChange('hours', parseInt(e.target.value) || 2)}
                  className="input-field text-center flex-1 text-lg font-bold"
                />
                <button
                  onClick={() => handleChange('hours', Math.min(5, (inputs.hours || 2) + 1))}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Default: 6-9 & O/L: 2hrs, A/L: 3hrs
              </p>
            </div>
          </motion.div>
        )

      case 5: // Students
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-gray-600 mb-4">{t('messages.selectStudents')}</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('labels.students')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleChange('students', Math.max(1, inputs.students - 1))}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={inputs.students}
                  onChange={(e) => handleChange('students', parseInt(e.target.value) || 1)}
                  className="input-field text-center flex-1 text-lg font-bold"
                />
                <button
                  onClick={() => handleChange('students', inputs.students + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold"
                >
                  +
                </button>
              </div>
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
