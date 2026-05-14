// lib/translations.ts

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
      students: "Number of Students",
      summary: "Fee Summary"
    },
    labels: {
      grade: "Grade Level",
      location: "Distance from Wariyapola (km)",
      method: "Class Method",
      frequency: "Sessions per Week",
      students: "Number of Students",
      payingFrequency: "Paying Frequency"
    },
    grades: {
      "6-9": "Grade 6-9 (Rs. 2,500)",
      "ol": "O/L Grade 10-11 (Rs. 3,500)",
      "al": "A/L Grade 12-13 (Rs. 5,000)"
    },
    methods: {
      online: "Online",
      physical: "Physical (In-person)"
    },
    buttons: {
      calculate: "Calculate Fee",
      shareWhatsApp: "Share via WhatsApp",
      reset: "Start Over",
      next: "Next",
      back: "Back",
      toggleLanguage: "සිංහල"
    },
    results: {
      monthlyFee: "Monthly Fee",
      sessionFee: "Per Session Fee",
      breakdown: "Fee Breakdown",
      baseFee: "Base Fee",
      distanceSurcharge: "Distance Surcharge",
      frequencySurcharge: "Frequency Surcharge",
      groupDiscount: "Group Discount",
      fuelCharge: "Fuel Charge",
      total: "Total Amount",
      summary: "Your Selected Details"
    },
    messages: {
      selectGrade: "Please select your grade level",
      enterDistance: "Enter distance from Wariyapola",
      selectMethod: "Choose online or physical classes",
      selectFrequency: "Select session frequency",
      selectStudents: "Specify number of students"
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
      students: "ශිෂ්‍ය සංඛ්‍යාව",
      payingFrequency: "ගාස්තු ගෙවීමේ සංඛ්‍යාතය"
    },
    grades: {
      "6-9": "ශ්‍රේණිය 6-9 (රු. 2,500)",
      "ol": "ඔ/ල් ශ්‍රේණිය 10-11 (රු. 3,500)",
      "al": "ඇ/ල් ශ්‍රේණිය 12-13 (රු. 5,000)"
    },
    methods: {
      online: "අන්තර්ජාලය",
      physical: "භෞතික (පුද්ගල)"
    },
    buttons: {
      calculate: "ගාස්තු ගණනය කරන්න",
      shareWhatsApp: "WhatsApp හි බෙදා ගන්න",
      reset: "නැවත ආරම්භ කරන්න",
      next: "ඊළඟ",
      back: "ආපසු",
      toggleLanguage: "English"
    },
    results: {
      monthlyFee: "මාසික ගාස්තුව",
      sessionFee: "සැසියට ගාස්තුව",
      breakdown: "ගාස්තු බිඩීම",
      baseFee: "මූල ගාස්තුව",
      distanceSurcharge: "දුරස්ථ අধිරූප",
      frequencySurcharge: "සංඛ්‍යාතය අධිරූප",
      groupDiscount: "සමූහ ছাড",
      fuelCharge: "ඉන්ධන ගාස්තුව",
      total: "සම්පූර්ණ ගෙවිය යුතු ගාස්තුව",
      summary: "ඔබේ තෝරා ගත් විස්තර"
    },
    messages: {
      selectGrade: "කරුණාකර ඔබේ ශ්‍රේණිය තෝරන්න",
      enterDistance: "වාරියපොල සිට ඔබේ නිවසට දුර ඇතුළු කරන්න",
      selectMethod: "අන්තර්ජාල හෝ භෞතික පන්ති තෝරන්න",
      selectFrequency: "සැසි සංඛ්‍යාතය තෝරන්න",
      selectStudents: "ශිෂ්‍ය සංඛ්‍යාව නිශ්චිත කරන්න"
    },
    payingFrequencies: {
      monthly: "මාසිකව",
      perSession: "සැසිය තුළ"
    },
    whatsappMessage: "පන්ති ගාස්තු ගණකය\n\nශ්‍රේණිය: {grade}\nපන්ති ක්‍රමය: {method}\nදුර: {distance}කි.මී.\nසංඛ්‍යාතය: {frequency}සතිහ/සතිය\nශිෂ්‍ය සංඛ්‍යාව: {students}\n\nමාසික ගාස්තුව: රු. {monthlyFee}\nසැසියට: රු. {sessionFee}\n\nදුරකතන: 0787124080"
  }
}

export type Language = 'en' | 'si'
export type TranslationKey = string
