// lib/calculations.ts

export interface FeeCalculationInputs {
  grade: '6-9' | 'ol' | 'al'
  distance: number // in km
  method: 'online' | 'physical'
  frequency: number // sessions per week
  students: number
}

export interface FeeBreakdown {
  baseFee: number
  distanceSurcharge: number // Base distance charge (shared)
  fuelCharge: number // Fuel charge based on students
  frequencySurcharge: number
  groupDiscount: number
  monthlyFee: number
  sessionFee: number
  studentMultiplier?: number // For display: number of students
  distanceKm?: number // For display: total distance
}

const BASE_FEES: Record<string, number> = {
  '6-9': 2000,
  'ol': 4000,
  'al': 6000,
}

const STUDENT_MULTIPLIER_RATES: Record<string, number> = {
  '6-9': 250,   // Rs. 250 per student
  'ol': 500,    // Rs. 500 per student
  'al': 1000,   // Rs. 1000 per student
}

const DISTANCE_CONSTANT_KM = 8
const DISTANCE_CHARGE_PER_KM = 50 // Rs per km per session
const FREQUENCY_SURCHARGE_PERCENT = 0.1 // 10% per extra session
const GROUP_DISCOUNTS: Record<number, number> = {
  1: 0,
  2: 0.05, // -5% for 2 students
  3: 0.10, // -10% for 3+
}
const SESSIONS_PER_MONTH = 4.33 // Average weeks in a month
const FUEL_RATE_PER_KM = 50 // Rs per km per session

export function calculateFees(inputs: FeeCalculationInputs): FeeBreakdown {
  const { grade, distance, method, frequency, students } = inputs

  // Base fee (monthly)
  const baseFee = BASE_FEES[grade] || BASE_FEES['6-9']

  // Distance & Student charges (only for physical, add 8km constant)
  let distanceSurcharge = 0
  let fuelCharge = 0
  const totalDistance = distance + DISTANCE_CONSTANT_KM

  if (method === 'physical') {
    // Distance charge: Monthly fixed = (distance + 8km) × 50 Rs/km
    distanceSurcharge = totalDistance * DISTANCE_CHARGE_PER_KM
    // Student charge: Grade-based multiplier × number of students
    const studentMultiplierRate = STUDENT_MULTIPLIER_RATES[grade] || STUDENT_MULTIPLIER_RATES['6-9']
    fuelCharge = studentMultiplierRate * students
  }

  // Frequency surcharge (+10% per extra session beyond 1x/week)
  let frequencySurcharge = 0
  if (frequency > 1) {
    const extraSessions = frequency - 1
    frequencySurcharge = baseFee * FREQUENCY_SURCHARGE_PERCENT * extraSessions
  }

  // Monthly subtotal before discount
  const subtotalBeforeDiscount = baseFee + distanceSurcharge + fuelCharge + frequencySurcharge

  // Group discount (-5% for 2, -10% for 3+)
  const discountRate = students >= 3 ? 0.10 : students === 2 ? 0.05 : 0
  const groupDiscount = subtotalBeforeDiscount * discountRate

  // Monthly fee
  let monthlyFee = subtotalBeforeDiscount - groupDiscount

  // Round monthly fee to nearest 500
  monthlyFee = roundToNearest500(monthlyFee)

  // Per-session fee: Monthly fee ÷ (sessions per week × 4 weeks)
  const totalSessionsPerMonth = frequency * 4
  let sessionFee = monthlyFee / totalSessionsPerMonth
  
  // Round session fee to nearest 50
  sessionFee = Math.ceil(sessionFee / 50) * 50

  return {
    baseFee,
    distanceSurcharge,
    fuelCharge,
    frequencySurcharge,
    groupDiscount,
    monthlyFee: sessionFee * totalSessionsPerMonth, // Recalculate to match rounded session fee
    sessionFee,
    studentMultiplier: students,
    distanceKm: totalDistance,
  }
}

export function roundToNearest500(value: number): number {
  return Math.ceil(value / 500) * 500
}

export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-LK')}`
}

export function generateWhatsAppMessage(
  inputs: FeeCalculationInputs,
  breakdown: FeeBreakdown,
  gradeLabel: string,
  methodLabel: string,
  frequencyLabel: string,
  studentLabel: string
): string {
  const totalDistance = inputs.distance + DISTANCE_CONSTANT_KM
  
  return `*📚 Class Fee Calculator*

*Selected Details:*
• Grade: ${gradeLabel}
• Method: ${methodLabel}
• Distance: ${totalDistance}km
• Frequency: ${frequencyLabel}
• Students: ${studentLabel}

*💰 Fee Summary:*
┌─────────────────────────────
│ Monthly Fee: *Rs. ${breakdown.monthlyFee.toLocaleString('en-LK')}*
│ Per Session: *Rs. ${breakdown.sessionFee.toLocaleString('en-LK')}*
└─────────────────────────────

*📊 Fee Breakdown:*
• Base Fee: Rs. ${breakdown.baseFee.toLocaleString('en-LK')}
• Distance Charge: Rs. ${breakdown.distanceSurcharge.toLocaleString('en-LK')}
• Student Charge (${breakdown.studentMultiplier}x students): Rs. ${breakdown.fuelCharge.toLocaleString('en-LK')}
• Frequency Surcharge: Rs. ${breakdown.frequencySurcharge.toLocaleString('en-LK')}
${breakdown.groupDiscount > 0 ? `• Group Discount: -Rs. ${breakdown.groupDiscount.toLocaleString('en-LK')}\n` : ''}
*Contact: 0787124080*`
}
