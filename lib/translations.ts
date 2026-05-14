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
      sessionFee: "Per Session Fee",
      breakdown: "Fee Breakdown",
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
      copiedToClipboard: "Copied to clipboard!"
    },
    payingFrequencies: {
      monthly: "Monthly",
      perSession: "Per Session"
    },
    whatsappMessage: "Class Fee Calculator\n\nGrade: {grade}\nMethod: {method}\nDistance: {distance}km\nFrequency: {frequency}x/week\nNumber of Students: {students}\n\nMonthly Fee: Rs. {monthlyFee}\nPer Session: Rs. {sessionFee}\n\nContact: 0787124080"
  },
  si: {
    title: "පන්ති ගාස්තු ගණකය",
    subtitle: "ඔබේ පුද්ගලික අධ්‍යාපන පන්ති ගාස්තු පහසුවෙන් ගණනය කරන්න",
    language: "සිංහල",
    steps: {
      grade: "ශ්‍රේණිය තෝරන්න",
      location: "පිහිටීම් විස්තර",
      method: "පන්ති ක්‍රමය",
      frequency: "සැසි සංඛ්‍යාතය",
      students: "ශිෂ්‍ය සংඛ්‍යාව",
      summary: "ගාස්තු සාරාංශ"
    },
    labels: {
      grade: "ශ්‍රේණිය",
      location: "වාරියපොල නගරයට දුර (කි.මී.)",
      method: "පන්ති ක්‍රමය",
      frequency: "සතිහ සැසි",
      hours: "පන්තිවල තිස්සේ (පැය)",
      students: "ශිෂ්‍ය සංඛ්‍යාව",
      payingFrequency: "ගාස්තු ගෙවීමේ සංඛ්‍යාතය"
    },
    grades: {
      "6-9": "ශ්‍රේණිය 6-9 (රු. 2,000)",
      "ol": "ඔ/ල් ශ්‍රේණිය 10-11 (රු. 4,000)",
      "al": "ඇ/ල් ශ්‍රේණිය 12-13 (රු. 6,000)"
    },
    methods: {
      online: "අන්තර්ජාලය",
      physical: "භෞතික (පුද්ගල)"
    },
    buttons: {
      calculate: "ගාස්තු ගණනය කරන්න",
      shareWhatsApp: "WhatsApp හි බෙදා ගන්න",
      copyClipboard: "පසුරු පුවරුවට පිටපත් කරන්න",
      openApp: "ගණනය කරන්න",
      reset: "නැවත ආරම්භ කරන්න",
      next: "ඊළඟ",
      back: "ආපසු",
      adjust: "සකස් කරන්න",
      toggleLanguage: "English"
    },
    results: {
      monthlyFee: "මාසික ගාස්තුව",
      perStudentFee: "එක් ශිෂ්‍යයට ගාස්තුව",
      sessionFee: "එක් සැසියට ගාස්තුව",
      breakdown: "ගාස්තු විස්තර",
      baseFee: "මූල ගාස්තුව",
      distanceSurcharge: "දුරස්ථ අধිරූප",
      frequencySurcharge: "අතිරේක සැසි ශුල්කය",
      groupDiscount: "සමූහ ছাড",
      fuelCharge: "ඉන්ධන ගාස්තුව",
      hoursSurcharge: "අතිරේක පැයවල ශුල්කය",
      studentCharge: "ශිෂ්‍ය ශුල්කය",
      total: "සම්පූර්ණ ගාස්තුව",
      summary: "ඔබේ තෝරාගැනීම"
    },
    messages: {
      selectGrade: "කරුණාකර ඔබේ ශ්‍රේණිය තෝරන්න",
      enterDistance: "වාරියපොල සිට ඔබේ නිවසට දුර ඇතුළු කරන්න",
      selectMethod: "අන්තර්ජාලය හෝ සිටින්න පන්තිය තෝරන්න",
      selectFrequency: "සතිපතින සැසි සංඛ්‍යාව තෝරන්න",
      selectHours: "පන්තිවල තිස්සේ තෝරන්න",
      selectStudents: "ශිෂ්‍ය සංඛ්‍යාව තෝරන්න",
      copiedToClipboard: "පසුරු පුවරුවට පිටපත් විය!"
    },
    payingFrequencies: {
      monthly: "මාසිකව",
      perSession: "සැසිකට"
    },
    whatsappMessage: "පන්ති ගාස්තු ගණකය\n\nශ්‍රේණිය: {grade}\nපන්ති ස්වරූපය: {method}\nදුර: {distance}කි.මී.\nසෙසු සැසි: {frequency}සතිය\nශිෂ්‍ය සංඛ්‍යාව: {students}\n\nමාසික ගාස්තුව: රු. {monthlyFee}\nසැසියට: රු. {sessionFee}\n\nසම්බන්ධතා: 0787124080"
  }
}

export type Language = 'en' | 'si'
export type TranslationKey = string
