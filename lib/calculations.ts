// lib/calculations.ts

export interface FeeCalculationInputs {
  grade: '6-9' | 'ol' | 'al'
  distance: number // in km
  method: 'online' | 'physical'
  frequency: number // sessions per month
  students: number
  hours?: number // class duration in hours
  examYear?: number // 2026, 2027, 2028
}

export interface FeeBreakdown {
  baseFee: number
  fuelCharge: number // Fuel charge based on distance
  studentCharge: number // Student charge per student
  hoursSurcharge: number // Extra hours surcharge
  frequencySurcharge: number
  groupDiscount: number
  monthlyFee: number
  perStudentFee: number
  adjustment: number
  perStudentAdjustment: number
  studentMultiplier?: number // For display: number of students
  distanceKm?: number // For display: total distance
  hours?: number // For display: class hours
  studentRate?: number // For display: per-student rate from grade
  isFrequencySurchargeWaived?: boolean
}

const BASE_FEES: Record<string, number> = {
  '6-9': 2000,
  'ol': 4000,
  'al': 6000,
}

const STUDENT_MULTIPLIER_RATES: Record<string, number> = {
  '6-9': 250,   // Rs. 250 per student
  'ol_2026': 500,
  'ol_future': 750,
  'al_2026': 750,
  'al_future': 1500,
}

export const EXAM_YEARS = [2026, 2027, 2028] as const;

export const DISTANCE_CONSTANT_KM = 8

// Fuel cost calculation
const FUEL_PRICE_PER_LITRE = 434   // Rs. per litre
const KM_PER_LITRE = 50            // km per litre
const RAW_COST_PER_KM = FUEL_PRICE_PER_LITRE / KM_PER_LITRE
// Round UP to next multiple of 5
export const FUEL_CHARGE_PER_KM = Math.ceil(RAW_COST_PER_KM / 5) * 5  // = 10 Rs/km

const FUEL_ROUND_TRIP_MULTIPLIER = 2 // For come and go
const FREQUENCY_SURCHARGE_PERCENT = 0.2 // 10% per extra session
const EXTRA_HOURS_SURCHARGE_PERCENT = 0.1 // 10% per extra hour
const DEFAULT_HOURS: Record<string, number> = {
  '6-9': 2,   // 2 hours
  'ol': 2,    // 2 hours
  'al': 3,    // 3 hours
}


export function calculateFees(inputs: FeeCalculationInputs): FeeBreakdown {
  const { grade, distance, method, frequency, students, hours } = inputs

  // Base fee (monthly)
  const baseFee = BASE_FEES[grade] || BASE_FEES['6-9']

  // Get default hours for grade if not provided
  const classHours = hours || DEFAULT_HOURS[grade] || 2
  const defaultHours = DEFAULT_HOURS[grade] || 2

  // Hours surcharge: 10% of base per extra hour beyond default
  let hoursSurcharge = 0
  if (classHours > defaultHours) {
    const extraHours = classHours - defaultHours
    hoursSurcharge = baseFee * EXTRA_HOURS_SURCHARGE_PERCENT * extraHours
  }

  // Fuel & Student charges
  let fuelCharge = 0
  let studentCharge = 0
  const totalDistance = distance + DISTANCE_CONSTANT_KM

  if (method === 'physical') {
    // Fuel charge: totalDistance × 2 (round trip) × Rs.FUEL_CHARGE_PER_KM/km × frequency (sessions per month)
    const roundTripDistance = totalDistance * FUEL_ROUND_TRIP_MULTIPLIER
    fuelCharge = roundTripDistance * FUEL_CHARGE_PER_KM * frequency
  }

  // Student charge: Grade-based multiplier × number of students (Applies to both Online & Physical)
  // Student charge: Grade-based multiplier × number of students (Applies to both Online & Physical)
  let studentMultiplierRate = STUDENT_MULTIPLIER_RATES['6-9']
  if (grade === 'ol') {
    studentMultiplierRate = inputs.examYear && inputs.examYear > 2026 ? STUDENT_MULTIPLIER_RATES['ol_future'] : STUDENT_MULTIPLIER_RATES['ol_2026']
  } else if (grade === 'al') {
    studentMultiplierRate = inputs.examYear && inputs.examYear > 2026 ? STUDENT_MULTIPLIER_RATES['al_future'] : STUDENT_MULTIPLIER_RATES['al_2026']
  }
  
  studentCharge = studentMultiplierRate * students

  // Get student rate for display
  const studentRate = studentMultiplierRate

  // Frequency surcharge (+10% per extra session beyond 4x/month)
  let frequencySurcharge = 0
  if (frequency > 4) {
    const extraSessions = (frequency - 4) / 4
    frequencySurcharge = baseFee * FREQUENCY_SURCHARGE_PERCENT * extraSessions
  }

  // Waiver for 2026 A/L students
  const isFrequencySurchargeWaived = grade === 'al' && inputs.examYear === 2026
  const effectiveFrequencySurcharge = isFrequencySurchargeWaived ? 0 : frequencySurcharge

  // Monthly subtotal before discount
  const subtotalBeforeDiscount = baseFee + fuelCharge + studentCharge + effectiveFrequencySurcharge + hoursSurcharge

  // Group discount based on number of students
  let groupDiscount = 0
  if (students >= 2) {
    const discountRate = students >= 3 ? 0.10 : 0.05
    groupDiscount = subtotalBeforeDiscount * discountRate
  }

  // 1. Initial Monthly fee
  const rawMonthlyFee = subtotalBeforeDiscount - groupDiscount

  // 2. Calculate exact per-student fee
  const perStudentExact = rawMonthlyFee / students

  // 3. Round per-student fee to nearest 100
  // 2834 -> 2800, 2890 -> 2900, 2850 -> 2900
  const perStudentFee = Math.ceil(perStudentExact / 100) * 100

  // 4. Final adjusted monthly fee
  const monthlyFee = perStudentFee * students

  // 5. Rounding adjustment for breakdown
  const adjustment = monthlyFee - rawMonthlyFee
  const perStudentAdjustment = perStudentFee - perStudentExact

  return {
    baseFee,
    fuelCharge,
    studentCharge,
    hoursSurcharge,
    frequencySurcharge,
    groupDiscount,
    monthlyFee,
    perStudentFee,
    adjustment,
    perStudentAdjustment,
    studentMultiplier: students,
    distanceKm: totalDistance,
    hours: classHours,
    studentRate,
    isFrequencySurchargeWaived,
  }
}

export function roundToNearest500(value: number): number {
  return Math.ceil(value / 500) * 500
}

export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-LK')}`
}

import { translations, Language } from './translations'

export function generateWhatsAppMessage(
  inputs: FeeCalculationInputs,
  breakdown: FeeBreakdown,
  gradeLabel: string,
  methodLabel: string,
  studentLabel: string,
  language: Language = 'en'
): string {
  const t = (key: string) => {
    const keys = key.split('.')
    let val: any = translations[language]
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) val = val[k]
      else return key
    }
    return String(val)
  }

  const totalDistance = inputs.distance + DISTANCE_CONSTANT_KM
  const roundTripDistance = totalDistance * 2

  return `*${t('results.feeSummary')}*
- ${t('results.grade')}: ${gradeLabel}${inputs.grade !== '6-9' ? ` (${inputs.examYear})` : ''}
- ${t('results.method')}: ${methodLabel}
${inputs.method === 'physical' ? `- ${t('results.distance')}: ${totalDistance}km\n` : ''}- ${t('results.frequency')}: ${inputs.frequency} ${language === 'en' ? 'days' : 'දින'}
- ${t('results.duration')}: ${breakdown.hours}hrs
- ${t('results.students')}: ${studentLabel}

*${t('results.feeBreakdown')}*
- ${t('results.baseFee')}: Rs. ${breakdown.baseFee.toLocaleString('en-LK')}
${breakdown.fuelCharge > 0 ? `- ${t('results.fuelCharge')}: Rs. ${breakdown.fuelCharge.toLocaleString('en-LK')} (${roundTripDistance}km × Rs.${FUEL_CHARGE_PER_KM} × ${inputs.frequency} days)\n` : ''}- ${t('results.studentCharge')}: Rs. ${breakdown.studentCharge.toLocaleString('en-LK')} (Rs. ${breakdown.studentRate} × ${inputs.students} students)
${breakdown.frequencySurcharge > 0 ? `- ${t('results.frequencySurcharge')}: ${breakdown.isFrequencySurchargeWaived ? `~Rs. ${breakdown.frequencySurcharge.toLocaleString('en-LK')}~ (${t('results.waivedNote')})` : `Rs. ${breakdown.frequencySurcharge.toLocaleString('en-LK')} (10% per session > 4)`}\n` : ''}${breakdown.hoursSurcharge > 0 ? `- ${t('results.hoursSurcharge')}: Rs. ${breakdown.hoursSurcharge.toLocaleString('en-LK')} (10% extra per hour)\n` : ''}${breakdown.groupDiscount > 0 ? `- ${t('results.groupDiscount')}: -Rs. ${breakdown.groupDiscount.toLocaleString('en-LK')} (${inputs.students >= 3 ? '10%' : '5%'} off)\n` : ''}${breakdown.adjustment !== 0 ? `- ${t('results.adjustment')}: Rs. ${breakdown.adjustment.toLocaleString('en-LK')} (Round per student to 100)\n` : ''}
*» ${t('results.accordingly')}*
${t('results.monthlyFee')}: *Rs. ${breakdown.monthlyFee.toLocaleString('en-LK')}*
${t('results.perStudent')}: *Rs. ${breakdown.perStudentFee.toLocaleString('en-LK')}*

» _${t('results.politeNote')}_

» _${t('results.paymentDeadline')}_
${inputs.method === 'online' ? `\n» *${t('results.bankDetails')}*\n${t('bank.bank')}\n${t('bank.branch')}\n${t('bank.account')}\n${t('bank.holder')}\n` : ''}
» *${t('results.contact')}: 0787124080*
\n> _${inputs.students > 1 ? t('results.shareMessageMulti') : t('results.shareMessageSingle')}_\n`
}
