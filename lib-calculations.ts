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
  distanceSurcharge: number
  frequencySurcharge: number
  groupDiscount: number
  fuelCharge: number
  monthlyFee: number
  sessionFee: number
}

const BASE_FEES: Record<string, number> = {
  '6-9': 2500,
  'ol': 3500,
  'al': 5000,
}

const DISTANCE_CONSTANT_KM = 8
const DISTANCE_CHARGE_PER_KM = 30 // Rs per km per session
const FREQUENCY_SURCHARGE_PERCENT = 0.1 // 10% per extra session
const GROUP_DISCOUNTS: Record<number, number> = {
  1: 0,
  2: 0.05, // -5% for 2 students
  3: 0.10, // -10% for 3+
}
const SESSIONS_PER_MONTH = 4.33 // Average weeks in a month
const FUEL_RATE_PER_KM = 30 // Rs per km per session

export function calculateFees(inputs: FeeCalculationInputs): FeeBreakdown {
  const { grade, distance, method, frequency, students } = inputs

  // Base fee
  const baseFee = BASE_FEES[grade] || BASE_FEES['6-9']

  // Distance surcharge (only for physical, add 8km constant)
  let distanceSurcharge = 0
  if (method === 'physical') {
    const totalDistance = distance + DISTANCE_CONSTANT_KM
    const monthlySessionCount = frequency * SESSIONS_PER_MONTH
    distanceSurcharge = totalDistance * DISTANCE_CHARGE_PER_KM * monthlySessionCount
  }

  // Frequency surcharge (+10% per extra session beyond 1x/week)
  let frequencySurcharge = 0
  if (frequency > 1) {
    const extraSessions = frequency - 1
    frequencySurcharge = baseFee * FREQUENCY_SURCHARGE_PERCENT * extraSessions
  }

  // Group discount (-5% for 2, -10% for 3+)
  let groupDiscount = 0
  const discountRate = students >= 3 ? 0.10 : students === 2 ? 0.05 : 0
  const subtotal = baseFee + distanceSurcharge + frequencySurcharge
  groupDiscount = subtotal * discountRate

  // Fuel charge (physical only)
  let fuelCharge = 0
  if (method === 'physical') {
    const totalDistance = distance + DISTANCE_CONSTANT_KM
    const monthlySessionCount = frequency * SESSIONS_PER_MONTH
    fuelCharge = totalDistance * FUEL_RATE_PER_KM * monthlySessionCount
  }

  // Calculate monthly fee
  const monthlyFee = baseFee + distanceSurcharge + frequencySurcharge - groupDiscount + fuelCharge

  // Round to nearest 500
  const roundedMonthlyFee = roundToNearest500(monthlyFee)

  // Session fee
  const monthlySessionCount = frequency * SESSIONS_PER_MONTH
  const sessionFee = Math.ceil(roundedMonthlyFee / monthlySessionCount)

  return {
    baseFee,
    distanceSurcharge,
    frequencySurcharge,
    groupDiscount,
    fuelCharge,
    monthlyFee: roundedMonthlyFee,
    sessionFee,
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
  return `Class Fee Calculator

📚 ${gradeLabel}
🌐 ${methodLabel}
📍 Distance: ${inputs.distance + DISTANCE_CONSTANT_KM}km
📅 ${frequencyLabel}
👥 ${studentLabel}

💰 *Monthly Fee:* Rs. ${breakdown.monthlyFee.toLocaleString('en-LK')}
💵 *Per Session Fee:* Rs. ${breakdown.sessionFee.toLocaleString('en-LK')}

📊 *Fee Breakdown:*
• Base Fee: Rs. ${breakdown.baseFee.toLocaleString('en-LK')}
• Distance Surcharge: Rs. ${breakdown.distanceSurcharge.toLocaleString('en-LK')}
• Frequency Surcharge: Rs. ${breakdown.frequencySurcharge.toLocaleString('en-LK')}
• Fuel Charge: Rs. ${breakdown.fuelCharge.toLocaleString('en-LK')}
• Group Discount: -Rs. ${breakdown.groupDiscount.toLocaleString('en-LK')}

Contact: 0787124080`
}
