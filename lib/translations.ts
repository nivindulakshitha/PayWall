// lib/translations.ts

export type Language = 'en' | 'si'
export type TranslationKey = string

export const translations = {
  en: {
    title: "Class Fee Calculator",
    subtitle: "Calculate your tuition class fees easily",
    language: "English",
    steps: {
      grade: "Select Grade",
      location: "Location Details",
      method: "Class Method",
      frequency: "Session Frequency",
      hours: "Class Duration",
      students: "Number of Students",
      summary: "Fee Summary"
    },
    labels: {
      grade: "Grade Level",
      location: "Distance from Wariyapola (km)",
      method: "Class Method",
      frequency: "Sessions per Week",
      students: "Number of Students",
      hours: "Class Duration (Hours)",
      payingFrequency: "Paying Frequency"
    },
    grades: {
      "6-9": "Grade 6-9 (Rs. 2,000)",
      "ol": "O/L Grade 10-11 (Rs. 4,000)",
      "al": "A/L Grade 12-13 (Rs. 6,000)"
    },
    methods: {
      online: "Online",
      physical: "Physical (In-person)"
    },
    buttons: {
      calculate: "Calculate Fee",
      shareWhatsApp: "Share via WhatsApp",
      copyClipboard: "Copy to Clipboard",
      openApp: "Open Calculator",
      reset: "Start Over",
      next: "Next",
      back: "Back",
      adjust: "Adjust",
      toggleLanguage: "සිංහල"
    },
    results: {
      monthlyFee: "Monthly Fee",
      perStudentFee: "Per Student Fee",
      oneDayFee: "One Day Fee",
      sessionFee: "Per Session Fee",
      breakdown: "Fee Breakdown",
      detailedBreakdown: "Detailed Fee Calculation",
      baseFee: "Base Fee",
      distanceSurcharge: "Distance Charge",
      frequencySurcharge: "Frequency Surcharge",
      groupDiscount: "Group Discount",
      studentCharge: "Student Charge",
      fuelCharge: "Fuel Charge",
      hoursSurcharge: "Extra Hours Surcharge",
      total: "Total Amount",
      summary: "Your Selected Details"
    },
    messages: {
      selectGrade: "Please select your grade level",
      enterDistance: "Enter distance from Wariyapola",
      selectMethod: "Choose online or physical classes",
      selectFrequency: "Select session frequency",
      selectHours: "Select class duration in hours",
      selectStudents: "Specify number of students",
      copiedToClipboard: "Copied to clipboard!",
      shareMessage: "Please send these details to your teacher and classmates!",
      linkText: "[ View & Edit Calculation ]\n"
    },
    payingFrequencies: {
      monthly: "Monthly",
      perSession: "Per Session"
    },
    whatsappMessage: "Class Fee Calculator\n\nGrade: {grade}\nMethod: {method}\nDistance: {distance}km\nFrequency: {frequency}x/week\nNumber of Students: {students}\n\nMonthly Fee: Rs. {monthlyFee}\nPer Session: Rs. {sessionFee}\n\nContact: 0787124080"
  },
  si: {
    title: "පන්ති ගාස්තු ගණකය",
    subtitle: "ඔබගේ උපකාරක පන්ති ගාස්තු පහසුවෙන් ගණනය කරගන්න",
    language: "සිංහල",
    steps: {
      grade: "ශ්‍රේණිය තෝරන්න",
      location: "ස්ථානය පිළිබඳ විස්තර",
      method: "පන්ති පවත්වන ආකාරය",
      frequency: "සතියට දින ගණන",
      hours: "පන්තියේ කාලසීමාව",
      students: "සිසුන් ගණන",
      summary: "ගාස්තු සාරාංශය"
    },
    labels: {
      grade: "ශ්‍රේණිය",
      location: "වාරියපොල නගරයේ සිට දුර (කි.මී.)",
      method: "පන්ති පවත්වන ආකාරය",
      frequency: "සතියට දින ගණන",
      hours: "පන්තියේ කාලසීමාව (පැය)",
      students: "සිසුන් ගණන",
      payingFrequency: "ගාස්තු ගෙවන ආකාරය"
    },
    grades: {
      "6-9": "6-9 ශ්‍රේණි (රු. 2,000)",
      "ol": "සාමාන්‍ය පෙළ 10-11 ශ්‍රේණි (රු. 4,000)",
      "al": "උසස් පෙළ 12-13 ශ්‍රේණි (රු. 6,000)"
    },
    methods: {
      online: "අන්තර්ජාලය හරහා (Online)",
      physical: "නිවසට පැමිණ (Physical)"
    },
    buttons: {
      calculate: "ගාස්තුව ගණනය කරන්න",
      shareWhatsApp: "WhatsApp හරහා යවන්න",
      copyClipboard: "පිටපත් කරගන්න (Copy)",
      openApp: "ගණනය කරන්න",
      reset: "නැවත මුල සිට",
      next: "ඉදිරියට",
      back: "ආපසු",
      adjust: "වෙනස් කරන්න",
      toggleLanguage: "English"
    },
    results: {
      monthlyFee: "මාසික ගාස්තුව",
      perStudentFee: "එක් සිසුවෙකු සඳහා ගාස්තුව",
      oneDayFee: "එක් දිනක් සඳහා ගාස්තුව",
      sessionFee: "එක් දිනක් සඳහා ගාස්තුව",
      breakdown: "ගාස්තු විස්තරය",
      detailedBreakdown: "විස්තරාත්මක ගාස්තු සටහන",
      baseFee: "මූලික ගාස්තුව",
      distanceSurcharge: "දුර ප්‍රමාණය සඳහා අයකිරීම",
      frequencySurcharge: "අමතර දින සඳහා අයකිරීම",
      groupDiscount: "කණ්ඩායම් වට්ටම",
      fuelCharge: "ප්‍රවාහන ගාස්තුව",
      hoursSurcharge: "අමතර පැය සඳහා අයකිරීම",
      studentCharge: "සිසුන් සඳහා අයකිරීම",
      total: "මුළු මුදල",
      summary: "ඔබගේ තෝරාගැනීම්"
    },
    messages: {
      selectGrade: "කරුණාකර ඔබගේ ශ්‍රේණිය තෝරන්න",
      enterDistance: "වාරියපොල නගරයේ සිට ඔබගේ නිවසට ඇති දුර ඇතුළත් කරන්න",
      selectMethod: "අන්තර්ජාලය හරහා හෝ නිවසට පැමිණ පන්ති තෝරන්න",
      selectFrequency: "සතියට පවත්වන දින ගණන තෝරන්න",
      selectHours: "පන්තියේ කාලසීමාව තෝරන්න",
      selectStudents: "සිසුන් ගණන තෝරන්න",
      copiedToClipboard: "පිටපත් කරගන්නා ලදී!",
      shareMessage: "කරුණාකර මෙම විස්තර ඔබගේ ගුරුතුමාට සහ පන්තියේ ළමුන්ට ලබා දෙන්න!",
      linkText: "[ ගණනය කිරීම් වෙනස් කරන්න / View & Edit ]\n"
    },
    payingFrequencies: {
      monthly: "මාසිකව",
      perSession: "දිනකට"
    },
    whatsappMessage: "පන්ති ගාස්තු ගණකය\n\nශ්‍රේණිය: {grade}\nපන්ති ක්‍රමය: {method}\nදුර: {distance}කි.මී.\nදින ගණන: {frequency} වරක්/සතියට\nසිසුන් ගණන: {students}\n\nමාසික ගාස්තුව: රු. {monthlyFee}\nඑක් දිනකට: රු. {sessionFee}\n\nඅමතන්න: 0787124080"
  }
}
