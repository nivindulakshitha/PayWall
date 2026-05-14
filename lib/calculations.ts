// lib/calculations.ts

export interface FeeCalculationInputs {
  grade: '6-9' | 'ol' | 'al'
  distance: number // in km
  method: 'online' | 'physical'
  frequency: number // sessions per week
  students: number
  hours?: number // class duration in hours
}

export interface FeeBreakdown {
  baseFee: number
  distanceSurcharge: number // Fuel charge based on distance
  fuelCharge: number // Student charge per student
  hoursSurcharge: number // Extra hours surcharge
  frequencySurcharge: number
  groupDiscount: number
  monthlyFee: number
  perStudentFee: number
  studentMultiplier?: number // For display: number of students
  distanceKm?: number // For display: total distance
  hours?: number // For display: class hours
}

const BASE_FEES: Record<string, number> = {
  '6-9': 2000,
  'ol': 3000,
  'al': 5000,
}

const STUDENT_MULTIPLIER_RATES: Record<string, number> = {
  '6-9': 250,   // Rs. 250 per student
  'ol': 500,    // Rs. 500 per student
  'al': 750,   // Rs. 750 per student
}

const DISTANCE_CONSTANT_KM = 8
const FUEL_CHARGE_PER_KM = 10 // Rs per km (will be multiplied by 2 for round trip)
const FUEL_ROUND_TRIP_MULTIPLIER = 2 // For come and go
const FREQUENCY_SURCHARGE_PERCENT = 0.1 // 10% per extra session
const EXTRA_HOURS_SURCHARGE_PERCENT = 0.1 // 10% per extra hour
const DEFAULT_HOURS: Record<string, number> = {
  '6-9': 2,   // 2 hours
  'ol': 2,    // 2 hours
  'al': 3,    // 3 hours
}
const GROUP_DISCOUNTS: Record<number, number> = {
  1: 0,
  2: 0.05, // -5% for 2 students
  3: 0.10, // -10% for 3+
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

  // Distance & Student charges (only for physical, add 8km constant)
  let distanceSurcharge = 0
  let fuelCharge = 0
  const totalDistance = distance + DISTANCE_CONSTANT_KM

  if (method === 'physical') {
    // Fuel charge: (distance + 8km) × 2 (round trip) × Rs. 10/km × frequency × 4 weeks
    const roundTripDistance = totalDistance * FUEL_ROUND_TRIP_MULTIPLIER
    distanceSurcharge = roundTripDistance * FUEL_CHARGE_PER_KM * frequency * 4
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
  const subtotalBeforeDiscount = baseFee + distanceSurcharge + fuelCharge + frequencySurcharge + hoursSurcharge

  // Group discount (removed - no student limit)
  const groupDiscount = 0

  // Monthly fee
  let monthlyFee = subtotalBeforeDiscount - groupDiscount

  // Round monthly fee to nearest 500
  monthlyFee = roundToNearest500(monthlyFee)

  // Per-student monthly fee
  const perStudentFee = Math.ceil(monthlyFee / students)

  return {
    baseFee,
    distanceSurcharge,
    fuelCharge,
    hoursSurcharge,
    frequencySurcharge,
    groupDiscount,
    monthlyFee,
    perStudentFee,
    studentMultiplier: students,
    distanceKm: totalDistance,
    hours: classHours,
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
• Distance from home: ${totalDistance}km
• Frequency: ${frequencyLabel}
• Duration: ${breakdown.hours}hrs
• Students: ${studentLabel}

*💰 Fee Summary:*
┌─────────────────────────────
│ Monthly Fee: *Rs. ${breakdown.monthlyFee.toLocaleString('en-LK')}*
│ Per Student: *Rs. ${breakdown.perStudentFee.toLocaleString('en-LK')}*
└─────────────────────────────

*📊 Fee Breakdown:*
• Base Fee: Rs. ${breakdown.baseFee.toLocaleString('en-LK')}
• Fuel Charge: Rs. ${breakdown.distanceSurcharge.toLocaleString('en-LK')}
• Student Charge (1x): Rs. ${breakdown.fuelCharge.toLocaleString('en-LK')}
• Frequency Surcharge: Rs. ${breakdown.frequencySurcharge.toLocaleString('en-LK')}
${breakdown.hoursSurcharge > 0 ? `• Extra Hours Surcharge: Rs. ${breakdown.hoursSurcharge.toLocaleString('en-LK')}\n` : ''}
*Contact: 0787124080*`
}
