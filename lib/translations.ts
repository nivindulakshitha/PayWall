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
      examYear: "Examination Year",
      location: "Location Details",
      payment: "Payment Info",
      method: "Class Method",
      frequency: "Class Days per Month",
      hours: "Class Duration",
      students: "Number of Students",
      summary: "Fee Summary"
    },
    labels: {
      grade: "Grade Level",
      examYear: "Exam Year",
      location: "Total distance (km)",
      method: "Class Method",
      frequency: "Class Days (Month)",
      students: "Number of Students",
      hours: "Class Duration (Hours)",
      payingFrequency: "Paying Frequency",
      notApplicable: "N/A"
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
      fourDayFee: "4 Days Fee",
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
      adjustment: "Rounding Adjustment",
      summary: "Your Selections",
      summaryInstruction: "Tap the boxes below to adjust and see how the fee changes!",
      educationNote: "Education is a life-long investment, not an expense. This fee is a contribution for the dedicated effort and personal commitment I invest in your success.",
      paymentDeadline: "Please pay the 4 days fee by the last class day of each month.",
      feeSummary: "Fee Summary",
      accordingly: "Accordingly;",
      feeBreakdown: "Fee Breakdown",
      grade: "Grade",
      method: "Method",
      distance: "Distance",
      frequency: "Days/Month",
      duration: "Duration",
      students: "Students",
      perStudent: "Per Student",
      contact: "Contact",
      politeNote: "Feel free to message Sir privately if you have any concerns regarding fee payments.",
      shareMessageSingle: "Please give these details to your teacher!",
      shareMessageMulti: "Please give these details to your teacher and class mates!",
      bankDetails: "Bank Details",
      baseFeeDesc: "Base monthly fee",
      frequencyDesc: "10% per extra session",
      adjustmentDesc: "Round per student to nearest 100",
      noDiscount: "No discount (1 student)",
      discount2: "5% for 2 students",
      discount3: "10% for 3+ students",
      waived: "Waived",
      waivedNote: "Free for 2026 AL"
    },
    messages: {
      selectGrade: "Please select your grade level",
      selectYear: "Select your examination year",
      enterDistance: "Enter distance from Wariyapola",
      selectMethod: "Choose online or physical classes",
      selectFrequency: "Select number of class days per month",
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
    whatsappMessage: "Class Fee Calculator\n\nGrade: {grade}\nMethod: {method}\nDistance: {distance}km\nFrequency: {frequency} days/month\nNumber of Students: {students}\n\nMonthly Fee: Rs. {monthlyFee}\nPer Session: Rs. {sessionFee}\n\nContact: 0787124080",
    bank: {
      title: "Bank Details for Online Classes",
      account: "Account Number: 0088532455",
      bank: "Bank of Ceylon",
      branch: "Wariyapola Branch (379)",
      holder: "Account Holder: MR N M N L N BANDARA",
      copy: "Click to copy details",
      paymentNote: "Note: Please make the payment and share the receipt with your teacher."
    }
  },
  si: {
    title: "පන්ති ගාස්තු ගණකය",
    subtitle: "ඔබගේ උපකාරක පන්ති ගාස්තු පහසුවෙන් ගණනය කරගන්න",
    language: "සිංහල",
    steps: {
      grade: "ශ්‍රේණිය තෝරන්න",
      examYear: "විභාග වර්ෂය",
      location: "ස්ථානය",
      payment: "ගෙවීම් තොරතුරු",
      notApplicable: "අදාළ නොවේ",
      method: "පන්ති පවත්වන ආකාරය",
      frequency: "මාසයක් සදහා දින ගණන",
      hours: "පන්තියේ කාලසීමාව",
      students: "සිසුන් ගණන",
      summary: "ගාස්තු සාරාංශය"
    },
    labels: {
      grade: "ශ්‍රේණිය",
      examYear: "විභාග වර්ෂය",
      location: "මුළු දුර ප්‍රමාණය (කි.මී.)",
      method: "පන්ති පවත්වන ආකාරය",
      frequency: "මාසයක් සදහා දින ගණන",
      hours: "පන්තියේ කාලසීමාව (පැය)",
      students: "සිසුන් ගණන",
      payingFrequency: "ගාස්තු ගෙවන ආකාරය",
      notApplicable: "අදාළ නොවේ"
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
      fourDayFee: "දින 4 සඳහා ගාස්තුව",
      perStudentFee: "එක් සිසුවෙකු සඳහා ගාස්තුව",
      oneDayFee: "එක් දිනක් සඳහා ගාස්තුව",
      sessionFee: "එක් දිනක් සඳහා ගාස්තුව",
      breakdown: "ගාස්තු විස්තරය",
      detailedBreakdown: "විස්තරාත්මක ගාස්තු සටහන",
      baseFee: "මූලික ගාස්තුව",
      distanceSurcharge: "දුර ප්‍රමාණය සඳහා අයකිරීම",
      frequencySurcharge: "අමතර දින සඳහා අයකිරීම",
      groupDiscount: "කණ්ඩායම් වට්ටම",
      fuelCharge: "ඉන්ධන ගාස්තුව",
      hoursSurcharge: "අමතර පැය සඳහා අයකිරීම",
      studentCharge: "සිසුන් සඳහා අයකිරීම",
      total: "මුළු මුදල",
      adjustment: "වටයන ලද ගැලපුම",
      summary: "ඔබගේ තේරීම්",
      summaryInstruction: "ගාස්තුව වෙනස් වන ආකාරය බැලීමට පහත කොටු මත ක්ලික් කර වෙනස්කම් සිදු කරන්න!",
      educationNote: "අධ්‍යාපනය යනු ජීවිත කාලය පුරාම පවතින ආයෝජනයකි. මෙම ගාස්තුව ඔබගේ සාර්ථකත්වය වෙනුවෙන් මා දරන වෙහෙසට සහ කැපවීමට දක්වන දායකත්වයකි.",
      paymentDeadline: "කරුණාකර සෑම මසකම අවසාන පන්ති දිනයේදී දින 4ක ගාස්තුව ගෙවන්න.",
      feeSummary: "සාරාංශය",
      feeBreakdown: "ගාස්තු විස්තරය",
      accordingly: "ඒ අනුව;",
      grade: "ශ්‍රේණිය",
      method: "පන්ති ක්‍රමය",
      distance: "දුර",
      frequency: "දින ගණන",
      duration: "කාලය",
      students: "සිසුන්",
      perStudent: "එක් සිසුවෙකු සඳහා",
      contact: "අමතන්න",
      politeNote: "ඉහත ගණනය කිරීමෙහි ගැටළු හෝ ගාස්තු ගෙවීම් සම්බන්ධව අපහසුතා ඇත්නම් කරුණාකර ගුරුතුමාට පෞද්ගලිකව පණිවිඩයක් ලබා දෙන්න.",
      shareMessageSingle: "කරුණාකර මෙම විස්තර ඔබගේ ගුරුතුමාට ලබා දෙන්න!",
      shareMessageMulti: "කරුණාකර මෙම විස්තර ඔබගේ ගුරුතුමාට සහ පන්තියේ ළමුන්ට ලබා දෙන්න!",
      bankDetails: "බැංකු විස්තර",
      baseFeeDesc: "මූලික මාසික ගාස්තුව",
      frequencyDesc: "අමතර දින සඳහා 10% බැගින්",
      adjustmentDesc: "ආසන්නතම 100 ට වටයන ලදී",
      noDiscount: "වට්ටම් නොමැත",
      discount2: "සිසුන් 2ක් සඳහා 5% වට්ටමක්",
      discount3: "සිසුන් 3+ සඳහා 10% වට්ටමක්",
      waived: "නිදහස්",
      waivedNote: "2026 AL සඳහා නොමිලේ"
    },
    messages: {
      selectGrade: "කරුණාකර ඔබගේ ශ්‍රේණිය තෝරන්න",
      selectYear: "ඔබගේ විභාග වර්ෂය තෝරන්න",
      enterDistance: "වාරියපොල නගරයේ සිට ඔබගේ නිවසට ඇති දුර ඇතුළත් කරන්න",
      selectMethod: "අන්තර්ජාලය හරහා හෝ නිවසට පැමිණ පන්ති තෝරන්න",
      selectFrequency: "මාසයක් සදහා පවත්වන දින ගණන තෝරන්න",
      selectHours: "පන්තියේ කාලසීමාව තෝරන්න",
      selectStudents: "සිසුන් ගණන තෝරන්න",
      copiedToClipboard: "පිටපත් කරගන්නා ලදී!",
      shareMessage: "කරුණාකර මෙම විස්තර ඔබගේ ගුරුතුමාට සහ පන්තියේ ළමුන්ට ලබා දෙන්න!",
      linkText: "[සවිස්තරාත්මක ගණනය කිරීම සඳහා]\n"
    },
    payingFrequencies: {
      monthly: "මාසිකව",
      perSession: "දිනකට"
    },
    whatsappMessage: "පන්ති ගාස්තු ගණකය\n\nශ්‍රේණිය: {grade}\nපන්ති ක්‍රමය: {method}\nදුර: {distance}කි.මී.\nදින ගණන: මාසයක් සදහා දින {frequency}\nසිසුන් ගණන: {students}\n\nමාසික ගාස්තුව: රු. {monthlyFee}\nඑක් දිනකට: රු. {sessionFee}\n\nඅමතන්න: 0787124080",
    bank: {
      title: "අන්තර්ජාල පන්ති සඳහා බැංකු විස්තර",
      account: "ගිණුම් අංකය: 0088532455",
      bank: "ලංකා බැංකුව",
      branch: "වාරියපොල ශාඛාව (379)",
      holder: "ගිණුම් හිමියා: MR N M N L N BANDARA",
      copy: "පිටපත් කිරීමට ක්ලික් කරන්න",
      paymentNote: "සටහන: කරුණාකර ගෙවීම සිදු කර එහි රිසිට්පත ඔබේ ගුරුතුමාට ලබා දෙන්න."
    }
  }
}
