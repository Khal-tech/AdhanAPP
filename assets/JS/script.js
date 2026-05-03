"use strict";

// ═══════════════════════════════════════════════════════════════════════════
//  CONSTANTS & DATA
// ═══════════════════════════════════════════════════════════════════════════

var MECCA = { lat: 21.4225, lng: 39.8262 };

var CALC_METHODS = [
  { value: "auto", en: "Auto-detect (Recommended)", ar: "تلقائي (موصى به)" },
  {
    value: "1",
    en: "Karachi — Pakistan · India · Bangladesh",
    ar: "كراتشي — باكستان، الهند، بنغلاديش",
  },
  { value: "2", en: "ISNA — North America", ar: "ISNA — أمريكا الشمالية" },
  { value: "3", en: "Muslim World League", ar: "رابطة العالم الإسلامي" },
  {
    value: "4",
    en: "Umm Al-Qura — Saudi Arabia",
    ar: "أم القرى — المملكة العربية السعودية",
  },
  {
    value: "5",
    en: "Egyptian General Authority",
    ar: "الهيئة المصرية العامة للمساحة",
  },
  { value: "8", en: "Gulf Region", ar: "منطقة الخليج" },
  { value: "9", en: "Kuwait", ar: "الكويت" },
  { value: "10", en: "Qatar", ar: "قطر" },
  { value: "12", en: "France — UOIF", ar: "فرنسا — UOIF" },
  { value: "13", en: "Turkey — Diyanet", ar: "تركيا — ديانت" },
  { value: "14", en: "Russia", ar: "روسيا" },
];

var T = {
  en: {
    prayerTimesOf: "Prayer Times Of",
    timeNowIs: "Time now is",
    nextIs: "Next prayer is",
    timeToPrayer: "Time to prayer:",
    fajr: "Fajr",
    churuq: "Churuq",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    miladi: "MILADI",
    hijri: "HIJRI",
    settings: "Settings",
    language: "Language",
    timeFormat: "Time Format",
    calcMethod: "Calculation Method",
    methodWarning:
      "The current method is your country's default. Changing it may result in inaccurate prayer times for your region. Proceed with caution.",
    proceed: "Proceed Anyway",
    keepCurrent: "Keep Current",
    quran: "Quran",
    wakeDhikr: "Wake Dhikr",
    morningDhikr: "Morning Dhikr",
    eveningDhikr: "Evening Dhikr",
    nightDhikr: "Night Dhikr",
    sleepingDhikr: "Sleeping Dhikr",
    qibla: "Qibla",
    tasbih: "Tasbih",
    hijriCal: "Hijri Calendar",
    asmaUlHusna: "Asma' ul Husna",
    duaOfDay: "Dua of the Day",
    sunnahTimes: "Sunnah Times",
    qiyam: "Qiyam al-Layl",
    hadith: "Hadith",
    donation: "Support",
    itsPrayerTime: "The time of",
    hasArrived: "prayer has arrived. Rise and pray.",
    turnOff: "Dismiss",
    hijriMonths: [
      "Muharram",
      "Safar",
      "Rabi' al-Awwal",
      "Rabi' al-Thani",
      "Jumada al-Awwal",
      "Jumada al-Thani",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhul Qa'dah",
      "Dhul Hijjah",
    ],
    weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    placeholderTitle: "Coming Soon",
    placeholderText:
      "This section is being prepared. Content will be added soon, insha'Allah.",
    tasbihReset: "Reset",
    tasbihLimit: "Count Limit",
    tasbihCompleted: "SubhanAllah — Count Complete",
    ishraq: "Ishraq",
    duha: "Duha",
    awwabeen: "Awwabeen",
    tahajjud: "Tahajjud",
    ishraqDesc: "15 min after sunrise · 2 rak'at",
    duhaDesc: "Ishraq to before Dhuhr · 2–8 rak'at",
    awwabeenDesc: "After Maghrib · 6 rak'at",
    tahajjudDesc: "Last third of night · 2–8 rak'at",
    nightDuration: "Night Duration",
    firstThird: "First Third",
    secondThird: "Second Third",
    lastThird: "Last Third — Recommended for Qiyam",
    qiyamNote:
      "The best time for Qiyam al-Layl is the last third of the night, just before Fajr.",
    asmaSearch: "Search names…",
    qiblaBearing: "Your bearing toward the Holy Kaaba",
    qiblaPermission: "Tap to enable compass",
    qiblaUnavailable: "Compass sensor not available on this device.",
    donationTitle: "Support Khalil",
    donationText:
      "This app is completely free and ad-free. If it benefits you, a sincere du'a is the most precious support you can give.",
    donationPlatforms:
      "When ready, support links will appear here. Consider platforms like Ko-fi, Buy Me a Coffee, or PayPal.me.",
    hadithComingSoon:
      "An authentic ahadith collection is being carefully curated. Coming soon, insha'Allah.",
    duaTitle: "Dua of the Day",
    duaSource: "Source:",
  },
  ar: {
    prayerTimesOf: "أوقات الصلاة في",
    timeNowIs: "الوقت الحالي",
    nextIs: "الصلاة القادمة",
    timeToPrayer: "الوقت المتبقي:",
    fajr: "الفجر",
    churuq: "الشروق",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
    miladi: "ميلادي",
    hijri: "هجري",
    settings: "الإعدادات",
    language: "اللغة",
    timeFormat: "صيغة الوقت",
    calcMethod: "طريقة الحساب",
    methodWarning:
      "الطريقة الحالية هي المعتمدة في بلدك. قد يؤدي تغييرها إلى أوقات صلاة غير دقيقة لمنطقتك. تصرّف بحذر.",
    proceed: "المتابعة على أي حال",
    keepCurrent: "الإبقاء على الحالية",
    quran: "القرآن الكريم",
    wakeDhikr: "أذكار الاستيقاظ",
    morningDhikr: "أذكار الصباح",
    eveningDhikr: "أذكار المساء",
    nightDhikr: "أذكار الليل",
    sleepingDhikr: "أذكار النوم",
    qibla: "القبلة",
    tasbih: "المسبحة",
    hijriCal: "التقويم الهجري",
    asmaUlHusna: "أسماء الله الحسنى",
    duaOfDay: "دعاء اليوم",
    sunnahTimes: "أوقات السنة",
    qiyam: "قيام الليل",
    hadith: "الحديث الشريف",
    donation: "الدعم",
    itsPrayerTime: "حان وقت صلاة",
    hasArrived: "قم وصلِّ.",
    turnOff: "إغلاق",
    hijriMonths: [
      "محرّم",
      "صفر",
      "ربيع الأوّل",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الثانية",
      "رجب",
      "شعبان",
      "رمضان",
      "شوّال",
      "ذو القعدة",
      "ذو الحجّة",
    ],
    weekDaysShort: ["أح", "اث", "ثل", "أر", "خم", "جم", "سب"],
    placeholderTitle: "قريبًا",
    placeholderText:
      "هذا القسم قيد الإعداد. سيتم إضافة المحتوى قريبًا، إن شاء الله.",
    tasbihReset: "إعادة ضبط",
    tasbihLimit: "حدّ العدّ",
    tasbihCompleted: "سبحان الله — اكتمل العدّ",
    ishraq: "الإشراق",
    duha: "الضحى",
    awwabeen: "الأوّابين",
    tahajjud: "التهجّد",
    ishraqDesc: "١٥ دقيقة بعد الشروق · ركعتان",
    duhaDesc: "من الإشراق حتى قبيل الظهر · ٢–٨ ركعات",
    awwabeenDesc: "بعد المغرب · ٦ ركعات",
    tahajjudDesc: "الثلث الأخير من الليل · ٢–٨ ركعات",
    nightDuration: "مدة الليل",
    firstThird: "الثلث الأول",
    secondThird: "الثلث الثاني",
    lastThird: "الثلث الأخير — الأفضل لقيام الليل",
    qiyamNote: "أفضل وقت لقيام الليل هو الثلث الأخير من الليل قبيل الفجر.",
    asmaSearch: "ابحث في الأسماء…",
    qiblaBearing: "اتجاهك نحو الكعبة المشرّفة",
    qiblaPermission: "اضغط لتفعيل البوصلة",
    qiblaUnavailable: "البوصلة غير متوفرة في هذا الجهاز.",
    donationTitle: "دعم تطبيق خليل",
    donationText:
      "هذا التطبيق مجاني تمامًا وخالٍ من الإعلانات. إن استفدت منه، فدعوة صادقة بظهر الغيب هي أثمن دعم يمكنك تقديمه.",
    donationPlatforms:
      "عند الاستعداد، ستظهر روابط الدعم هنا. يمكنك الدعم عبر: Ko-fi أو Buy Me a Coffee أو PayPal.me.",
    hadithComingSoon:
      "مجموعة الأحاديث النبوية الشريفة قيد الإعداد. قريبًا إن شاء الله.",
    duaTitle: "دعاء اليوم",
    duaSource: "المصدر:",
  },
};

var ASMA_UL_HUSNA = [
  { n: 1, ar: "الله", tr: "Allah", en: "The One God" },
  { n: 2, ar: "الرَّحْمَن", tr: "Ar-Rahman", en: "The Most Gracious" },
  { n: 3, ar: "الرَّحِيم", tr: "Ar-Rahim", en: "The Most Merciful" },
  { n: 4, ar: "الْمَلِك", tr: "Al-Malik", en: "The King" },
  { n: 5, ar: "الْقُدُّوس", tr: "Al-Quddus", en: "The Most Holy" },
  { n: 6, ar: "السَّلَام", tr: "As-Salam", en: "The Source of Peace" },
  { n: 7, ar: "الْمُؤْمِن", tr: "Al-Mumin", en: "The Granter of Security" },
  { n: 8, ar: "الْمُهَيْمِن", tr: "Al-Muhaymin", en: "The Guardian" },
  { n: 9, ar: "الْعَزِيز", tr: "Al-Aziz", en: "The Almighty" },
  { n: 10, ar: "الْجَبَّار", tr: "Al-Jabbar", en: "The Compeller" },
  { n: 11, ar: "الْمُتَكَبِّر", tr: "Al-Mutakabbir", en: "The Supreme" },
  { n: 12, ar: "الْخَالِق", tr: "Al-Khaliq", en: "The Creator" },
  { n: 13, ar: "الْبَارِئ", tr: "Al-Bari'", en: "The Evolver" },
  { n: 14, ar: "الْمُصَوِّر", tr: "Al-Musawwir", en: "The Fashioner of Forms" },
  { n: 15, ar: "الْغَفَّار", tr: "Al-Ghaffar", en: "The Oft-Forgiving" },
  { n: 16, ar: "الْقَهَّار", tr: "Al-Qahhar", en: "The Subduer" },
  { n: 17, ar: "الْوَهَّاب", tr: "Al-Wahhab", en: "The Bestower" },
  { n: 18, ar: "الرَّزَّاق", tr: "Ar-Razzaq", en: "The Provider" },
  { n: 19, ar: "الْفَتَّاح", tr: "Al-Fattah", en: "The Opener" },
  { n: 20, ar: "الْعَلِيم", tr: "Al-'Alim", en: "The All-Knowing" },
  { n: 21, ar: "الْقَابِض", tr: "Al-Qabid", en: "The Withholder" },
  { n: 22, ar: "الْبَاسِط", tr: "Al-Basit", en: "The Extender" },
  { n: 23, ar: "الْخَافِض", tr: "Al-Khafid", en: "The Reducer" },
  { n: 24, ar: "الرَّافِع", tr: "Ar-Rafi'", en: "The Exalter" },
  { n: 25, ar: "الْمُعِز", tr: "Al-Mu'izz", en: "The Honourer" },
  { n: 26, ar: "الْمُذِل", tr: "Al-Mudhill", en: "The Dishonourer" },
  { n: 27, ar: "السَّمِيع", tr: "As-Sami'", en: "The All-Hearing" },
  { n: 28, ar: "الْبَصِير", tr: "Al-Basir", en: "The All-Seeing" },
  { n: 29, ar: "الْحَكَم", tr: "Al-Hakam", en: "The Judge" },
  { n: 30, ar: "الْعَدْل", tr: "Al-'Adl", en: "The Just" },
  { n: 31, ar: "اللَّطِيف", tr: "Al-Latif", en: "The Subtle One" },
  { n: 32, ar: "الْخَبِير", tr: "Al-Khabir", en: "The All-Aware" },
  { n: 33, ar: "الْحَلِيم", tr: "Al-Halim", en: "The Forbearing" },
  { n: 34, ar: "الْعَظِيم", tr: "Al-'Azim", en: "The Magnificent" },
  { n: 35, ar: "الْغَفُور", tr: "Al-Ghafur", en: "The Forgiving" },
  { n: 36, ar: "الشَّكُور", tr: "Ash-Shakur", en: "The Appreciative" },
  { n: 37, ar: "الْعَلِي", tr: "Al-'Ali", en: "The Most High" },
  { n: 38, ar: "الْكَبِير", tr: "Al-Kabir", en: "The Most Great" },
  { n: 39, ar: "الْحَفِيظ", tr: "Al-Hafiz", en: "The Preserver" },
  { n: 40, ar: "الْمُقِيت", tr: "Al-Muqit", en: "The Nourisher" },
  { n: 41, ar: "الْحَسِيب", tr: "Al-Hasib", en: "The Reckoner" },
  { n: 42, ar: "الْجَلِيل", tr: "Al-Jalil", en: "The Majestic" },
  { n: 43, ar: "الْكَرِيم", tr: "Al-Karim", en: "The Most Generous" },
  { n: 44, ar: "الرَّقِيب", tr: "Ar-Raqib", en: "The Watchful" },
  { n: 45, ar: "الْمُجِيب", tr: "Al-Mujib", en: "The Responsive" },
  { n: 46, ar: "الْوَاسِع", tr: "Al-Wasi'", en: "The All-Encompassing" },
  { n: 47, ar: "الْحَكِيم", tr: "Al-Hakim", en: "The Most Wise" },
  { n: 48, ar: "الْوَدُود", tr: "Al-Wadud", en: "The Loving" },
  { n: 49, ar: "الْمَجِيد", tr: "Al-Majid", en: "The Most Glorious" },
  { n: 50, ar: "الْبَاعِث", tr: "Al-Baith", en: "The Resurrector" },
  { n: 51, ar: "الشَّهِيد", tr: "Ash-Shahid", en: "The Witness" },
  { n: 52, ar: "الْحَق", tr: "Al-Haqq", en: "The Truth" },
  { n: 53, ar: "الْوَكِيل", tr: "Al-Wakil", en: "The Trustee" },
  { n: 54, ar: "الْقَوِي", tr: "Al-Qawiyy", en: "The Most Strong" },
  { n: 55, ar: "الْمَتِين", tr: "Al-Matin", en: "The Firm" },
  { n: 56, ar: "الْوَلِي", tr: "Al-Waliyy", en: "The Protecting Friend" },
  { n: 57, ar: "الْحَمِيد", tr: "Al-Hamid", en: "The Praiseworthy" },
  { n: 58, ar: "الْمُحْصِي", tr: "Al-Muhsi", en: "The Counter" },
  { n: 59, ar: "الْمُبْدِئ", tr: "Al-Mubdi'", en: "The Originator" },
  { n: 60, ar: "الْمُعِيد", tr: "Al-Mu'id", en: "The Restorer" },
  { n: 61, ar: "الْمُحْيِي", tr: "Al-Muhyi", en: "The Giver of Life" },
  { n: 62, ar: "الْمُمِيت", tr: "Al-Mumit", en: "The Taker of Life" },
  { n: 63, ar: "الْحَي", tr: "Al-Hayy", en: "The Ever-Living" },
  { n: 64, ar: "الْقَيُّوم", tr: "Al-Qayyum", en: "The Self-Subsisting" },
  { n: 65, ar: "الْوَاجِد", tr: "Al-Wajid", en: "The Finder" },
  { n: 66, ar: "الْمَاجِد", tr: "Al-Majid", en: "The Noble" },
  { n: 67, ar: "الْوَاحِد", tr: "Al-Wahid", en: "The One" },
  { n: 68, ar: "الْأَحَد", tr: "Al-Ahad", en: "The Unique" },
  { n: 69, ar: "الصَّمَد", tr: "As-Samad", en: "The Eternal" },
  { n: 70, ar: "الْقَادِر", tr: "Al-Qadir", en: "The Omnipotent" },
  { n: 71, ar: "الْمُقْتَدِر", tr: "Al-Muqtadir", en: "The Powerful" },
  { n: 72, ar: "الْمُقَدِّم", tr: "Al-Muqaddim", en: "The Expediter" },
  { n: 73, ar: "الْمُؤَخِّر", tr: "Al-Mu'akhkhir", en: "The Delayer" },
  { n: 74, ar: "الأَوَّل", tr: "Al-Awwal", en: "The First" },
  { n: 75, ar: "الآخِر", tr: "Al-Akhir", en: "The Last" },
  { n: 76, ar: "الظَّاهِر", tr: "Az-Zahir", en: "The Manifest" },
  { n: 77, ar: "الْبَاطِن", tr: "Al-Batin", en: "The Hidden" },
  { n: 78, ar: "الْوَالِي", tr: "Al-Wali", en: "The Governor" },
  { n: 79, ar: "الْمُتَعَالِي", tr: "Al-Muta'ali", en: "The Most Exalted" },
  { n: 80, ar: "الْبَر", tr: "Al-Barr", en: "The Source of All Goodness" },
  {
    n: 81,
    ar: "التَّوَّاب",
    tr: "At-Tawwab",
    en: "The Acceptor of Repentance",
  },
  { n: 82, ar: "الْمُنْتَقِم", tr: "Al-Muntaqim", en: "The Avenger" },
  { n: 83, ar: "الْعَفُو", tr: "Al-'Afuww", en: "The Pardoner" },
  { n: 84, ar: "الرَّؤُوف", tr: "Ar-Ra'uf", en: "The Most Kind" },
  {
    n: 85,
    ar: "مَالِكُ الْمُلْك",
    tr: "Malik-ul-Mulk",
    en: "The Owner of all Sovereignty",
  },
  {
    n: 86,
    ar: "ذُو الْجَلَالِ وَالإِكْرَام",
    tr: "Dhul-Jalali wal-Ikram",
    en: "Lord of Majesty and Generosity",
  },
  { n: 87, ar: "الْمُقْسِط", tr: "Al-Muqsit", en: "The Equitable" },
  { n: 88, ar: "الْجَامِع", tr: "Al-Jami'", en: "The Gatherer" },
  { n: 89, ar: "الْغَنِي", tr: "Al-Ghani", en: "The Self-Sufficient" },
  { n: 90, ar: "الْمُغْنِي", tr: "Al-Mughni", en: "The Enricher" },
  { n: 91, ar: "الْمَانِع", tr: "Al-Mani'", en: "The Preventer of Harm" },
  { n: 92, ar: "الضَّار", tr: "Ad-Darr", en: "The Distresser" },
  { n: 93, ar: "النَّافِع", tr: "An-Nafi'", en: "The Propitious" },
  { n: 94, ar: "النُّور", tr: "An-Nur", en: "The Light" },
  { n: 95, ar: "الْهَادِي", tr: "Al-Hadi", en: "The Guide" },
  { n: 96, ar: "الْبَدِيع", tr: "Al-Badi'", en: "The Incomparable Originator" },
  { n: 97, ar: "الْبَاقِي", tr: "Al-Baqi", en: "The Everlasting" },
  { n: 98, ar: "الْوَارِث", tr: "Al-Warith", en: "The Inheritor" },
  {
    n: 99,
    ar: "الرَّشِيد",
    tr: "Ar-Rashid",
    en: "The Guide to the Right Path",
  },
];

var ISLAMIC_DATES = {
  "1-1": { en: "Islamic New Year", ar: "رأس السنة الهجرية" },
  "10-1": { en: "Day of Ashura", ar: "يوم عاشوراء" },
  "12-3": { en: "Prophet's Birthday (Mawlid)", ar: "المولد النبوي الشريف" },
  "27-7": { en: "Isra' wal Mi'raj", ar: "الإسراء والمعراج" },
  "15-8": { en: "Laylat al-Bara'a", ar: "ليلة البراءة" },
  "1-9": { en: "First of Ramadan", ar: "أول رمضان المبارك" },
  "27-9": { en: "Laylat al-Qadr", ar: "ليلة القدر" },
  "1-10": { en: "Eid al-Fitr", ar: "عيد الفطر المبارك" },
  "9-12": { en: "Day of Arafat", ar: "يوم عرفة" },
  "10-12": { en: "Eid al-Adha", ar: "عيد الأضحى المبارك" },
};

var DAILY_DUAS = [
  {
    arabic:
      "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration:
      "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana abduka, wa ana 'ala ahdika wa wa'dika masta'ta'tu...",
    translation:
      "O Allah, You are my Lord. None has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can...",
    source: "Sahih al-Bukhari 6306",
  },
  {
    arabic:
      "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
    transliteration:
      "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa anta",
    translation:
      "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. None has the right to be worshipped except You.",
    source: "Abu Dawud 5090",
  },
  {
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    transliteration:
      "Allahumma inni as'aluka al-'afwa wal-'afiyata fid-dunya wal-akhira",
    translation:
      "O Allah, I ask You for pardon and well-being in this world and the Hereafter.",
    source: "Ibn Majah 3871",
  },
  {
    arabic:
      "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration:
      "Hasbiyallahu la ilaha illa huwa, 'alayhi tawakkaltu, wa huwa rabbul-'arshil-'azim",
    translation:
      "Allah is sufficient for me. None has the right to be worshipped except Him. Upon Him I rely, and He is the Lord of the Great Throne.",
    source: "Abu Dawud 5081",
  },
  {
    arabic:
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    transliteration:
      "Allahumma inni a'udhu bika minal-hammi wal-hazani, wa a'udhu bika minal-'ajzi wal-kasali...",
    translation:
      "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, and from the burden of debt and the oppression of men.",
    source: "Sahih al-Bukhari 2893",
  },
  {
    arabic:
      "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    transliteration:
      "Allahumma salli wa sallim 'ala nabiyyina Muhammad. Allahumma inni as'aluka al-jannata wa a'udhu bika minan-nar",
    translation:
      "O Allah, send peace and blessings upon our Prophet Muhammad. O Allah, I ask You for Paradise and I seek refuge in You from the Fire.",
    source: "Abu Dawud 792",
  },
  {
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    transliteration: "Subhanallahi wa bihamdihi, subhanallahil-'azim",
    translation:
      "Glory be to Allah and praise Him. Glory be to Allah the Magnificent.",
    source: "Sahih al-Bukhari 6682",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════════════════

var state = {
  lang: localStorage.getItem("adhan_lang") || "en",
  timeFormat: localStorage.getItem("adhan_timeFormat") || "24",
  calcMethod: localStorage.getItem("adhan_calcMethod") || "auto",
  pendingMethod: null,
  prayerTimings: null,
  prayerDate: null,
  geoData: null,
  mainShown: false,
  currentBg: "",
  currentImgBg: "",
  tasbihCount: parseInt(localStorage.getItem("adhan_tasbihCount")) || 0,
  tasbihLimit: parseInt(localStorage.getItem("adhan_tasbihLimit")) || 33,
  hijriCalOffset: 0, // month offset for calendar navigation
  hijriYear: null,
  hijriMonth: null,
  hijriDay: null,
  compassWatch: null,
  qiblaActive: false,
};

function t(key) {
  return (T[state.lang] || T.en)[key] || key;
}

function saveState() {
  localStorage.setItem("adhan_lang", state.lang);
  localStorage.setItem("adhan_timeFormat", state.timeFormat);
  localStorage.setItem("adhan_calcMethod", state.calcMethod);
  localStorage.setItem("adhan_tasbihCount", state.tasbihCount);
  localStorage.setItem("adhan_tasbihLimit", state.tasbihLimit);
}

// ═══════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function timeToMinutes(t) {
  var p = t.split(":");
  return parseInt(p[0]) * 60 + parseInt(p[1]);
}

function minutesToDisplay(minutes) {
  var h = Math.floor(minutes / 60) % 24;
  var m = minutes % 60;
  return padded(h) + ":" + padded(m);
}

function padded(n) {
  return String(n).padStart(2, "0");
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  if (state.timeFormat === "24") return timeStr;
  var p = timeStr.split(":").map(Number);
  var h = p[0],
    m = p[1];
  var ampm =
    h >= 12
      ? state.lang === "ar"
        ? "م"
        : "PM"
      : state.lang === "ar"
        ? "ص"
        : "AM";
  var h12 = h % 12 || 12;
  return padded(h12) + ":" + padded(m) + " " + ampm;
}

function addMinutesToTime(timeStr, mins) {
  var p = timeStr.split(":").map(Number);
  var total = p[0] * 60 + p[1] + mins;
  return minutesToDisplay(total);
}

function minutesBetween(timeA, timeB) {
  var a = timeToMinutes(timeA);
  var b = timeToMinutes(timeB);
  if (b < a) b += 24 * 60; // crosses midnight
  return b - a;
}

function qiblaBearing(lat, lng) {
  var φ1 = (lat * Math.PI) / 180;
  var φ2 = (MECCA.lat * Math.PI) / 180;
  var Δλ = ((MECCA.lng - lng) * Math.PI) / 180;
  var x = Math.sin(Δλ) * Math.cos(φ2);
  var y =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  var bearing = (Math.atan2(x, y) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

function hijriDaysInMonth(month, year) {
  // Tabular calendar: odd months 30 days, even 29, month 12 leap year 30
  if (month % 2 === 1) return 30;
  var leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  if (month === 12 && leapYears.indexOf(year % 30) !== -1) return 30;
  return 29;
}

// ═══════════════════════════════════════════════════════════════════════════
//  APPLY LANGUAGE / TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════

function applyLanguage() {
  var html = document.documentElement;
  html.setAttribute("lang", state.lang);
  html.setAttribute("dir", state.lang === "ar" ? "rtl" : "ltr");

  // Update all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var val = t(key);
    if (val) el.textContent = val;
  });

  // Re-render prayer times with new format/language
  if (state.prayerTimings) {
    renderPrayerTimes();
    renderHijriCalendarWidget();
  }

  // Update settings panel active states
  document
    .getElementById("langEn")
    .classList.toggle("active", state.lang === "en");
  document
    .getElementById("langAr")
    .classList.toggle("active", state.lang === "ar");

  // Settings panel direction mirrors page
  var panel = document.getElementById("settingsPanel");
  if (state.lang === "ar") {
    panel.style.left = "0";
    panel.style.right = "auto";
  } else {
    panel.style.right = "0";
    panel.style.left = "auto";
  }
}

function applyTimeFormat() {
  document
    .getElementById("format24")
    .classList.toggle("active", state.timeFormat === "24");
  document
    .getElementById("format12")
    .classList.toggle("active", state.timeFormat === "12");
  if (state.prayerTimings) renderPrayerTimes();
}

function renderPrayerTimes() {
  var names = ["Fajr", "Churuq", "Dhuhr", "Asr", "Maghrib", "Isha"];
  var keys = ["fajr", "churuq", "dhuhr", "asr", "maghrib", "isha"];
  var apiKeys = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  names.forEach(function (id, i) {
    var el = document.getElementById(id);
    if (el) el.textContent = formatTime(state.prayerTimings[apiKeys[i]]);
    var labelEls = document.querySelectorAll(
      '[data-prayer="' + id.toLowerCase() + '"] .prayer-label',
    );
    labelEls.forEach(function (l) {
      l.textContent = t(keys[i]);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  SETTINGS PANEL
// ═══════════════════════════════════════════════════════════════════════════

function openSettings() {
  document.getElementById("settingsPanel").classList.add("open");
  document.getElementById("settingsOverlay").classList.add("visible");
}

function closeSettings() {
  document.getElementById("settingsPanel").classList.remove("open");
  document.getElementById("settingsOverlay").classList.remove("visible");
}

document.getElementById("settingsBtn").addEventListener("click", openSettings);
document
  .getElementById("closeSettings")
  .addEventListener("click", closeSettings);
document
  .getElementById("settingsOverlay")
  .addEventListener("click", closeSettings);

document.getElementById("langEn").addEventListener("click", function () {
  state.lang = "en";
  saveState();
  applyLanguage();
});
document.getElementById("langAr").addEventListener("click", function () {
  state.lang = "ar";
  saveState();
  applyLanguage();
});

document.getElementById("format24").addEventListener("click", function () {
  state.timeFormat = "24";
  saveState();
  applyTimeFormat();
});
document.getElementById("format12").addEventListener("click", function () {
  state.timeFormat = "12";
  saveState();
  applyTimeFormat();
});

// Populate method select
(function () {
  var sel = document.getElementById("calcMethodSelect");
  CALC_METHODS.forEach(function (m) {
    var opt = document.createElement("option");
    opt.value = m.value;
    opt.textContent = state.lang === "ar" ? m.ar : m.en;
    if (m.value === state.calcMethod) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", function () {
    state.pendingMethod = this.value;
    showMethodWarning();
  });
})();

function showMethodWarning() {
  document.getElementById("methodDialog").classList.add("visible");
}

document.getElementById("methodCancel").addEventListener("click", function () {
  document.getElementById("methodDialog").classList.remove("visible");
  // Reset select back to current
  document.getElementById("calcMethodSelect").value = state.calcMethod;
  state.pendingMethod = null;
});

document.getElementById("methodConfirm").addEventListener("click", function () {
  state.calcMethod = state.pendingMethod;
  saveState();
  state.pendingMethod = null;
  document.getElementById("methodDialog").classList.remove("visible");
  closeSettings();
  // Re-fetch with new method
  if (state.geoData) fetchPrayerTimes(state.geoData);
});

// ESC closes settings or modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    closeSettings();
  }
});

// ═══════════════════════════════════════════════════════════════════════════
//  MODAL SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

function openModal(title, bodyHTML) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = bodyHTML;
  document.getElementById("modalBackdrop").classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("visible");
  document.body.style.overflow = "";
  // Clean up Qibla compass listener if open
  if (state.qiblaActive) {
    if (state.compassWatch)
      window.removeEventListener("deviceorientation", state.compassWatch);
    state.qiblaActive = false;
  }
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document
  .getElementById("modalBackdrop")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

// ═══════════════════════════════════════════════════════════════════════════
//  FEATURE BUTTON DISPATCHER
// ═══════════════════════════════════════════════════════════════════════════

document.querySelectorAll("[data-feature]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var feature = this.getAttribute("data-feature");
    switch (feature) {
      case "quran":
        openPlaceholder(t("quran"));
        break;
      case "wakeDhikr":
        openPlaceholder(t("wakeDhikr"));
        break;
      case "morningDhikr":
        openPlaceholder(t("morningDhikr"));
        break;
      case "eveningDhikr":
        openPlaceholder(t("eveningDhikr"));
        break;
      case "nightDhikr":
        openPlaceholder(t("nightDhikr"));
        break;
      case "sleepingDhikr":
        openPlaceholder(t("sleepingDhikr"));
        break;
      case "tasbih":
        openTasbih();
        break;
      case "hijriCalendar":
        openHijriCalendarModal();
        break;
      case "asmaUlHusna":
        openAsmaUlHusna();
        break;
      case "duaOfDay":
        openDuaOfDay();
        break;
      case "sunnahTimes":
        openSunnahTimes();
        break;
      case "qiyam":
        openQiyam();
        break;
      case "hadith":
        openHadith();
        break;
      case "donation":
        openDonation();
        break;
      case "qibla":
        openQibla();
        break;
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
//  PLACEHOLDER MODAL
// ═══════════════════════════════════════════════════════════════════════════

function openPlaceholder(title) {
  openModal(
    title,
    '<div class="modal-placeholder">' +
      '<div class="placeholder-icon"><i class="fa-solid fa-moon-over-sun"></i></div>' +
      "<h3>" +
      t("placeholderTitle") +
      "</h3>" +
      "<p>" +
      t("placeholderText") +
      "</p>" +
      "</div>",
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TASBIH
// ═══════════════════════════════════════════════════════════════════════════

function openTasbih() {
  openModal(t("tasbih"), buildTasbihHTML());
  bindTasbih();
}

function buildTasbihHTML() {
  var limits = [33, 99, 100, 0];
  var limitBtns = limits
    .map(function (l) {
      var label = l === 0 ? "∞" : l;
      return (
        '<button class="tasbih-limit-btn' +
        (state.tasbihLimit === l ? " active" : "") +
        '" data-limit="' +
        l +
        '">' +
        label +
        "</button>"
      );
    })
    .join("");

  return (
    '<div class="tasbih-wrap">' +
    '<div class="tasbih-counter-ring" id="tasbihRing">' +
    '<button class="tasbih-btn" id="tasbihBtn">' +
    '<span class="tasbih-count" id="tasbihCount">' +
    state.tasbihCount +
    "</span>" +
    "</button>" +
    "</div>" +
    '<div class="tasbih-completed" id="tasbihCompleted" style="display:none">' +
    t("tasbihCompleted") +
    "</div>" +
    '<div class="tasbih-controls">' +
    '<div class="tasbih-limit-group">' +
    '<span class="tasbih-limit-label">' +
    t("tasbihLimit") +
    "</span>" +
    limitBtns +
    "</div>" +
    '<button class="tasbih-reset-btn" id="tasbihReset">' +
    '<i class="fa-solid fa-rotate-left"></i> ' +
    t("tasbihReset") +
    "</button>" +
    "</div>" +
    "</div>"
  );
}

function bindTasbih() {
  var btn = document.getElementById("tasbihBtn");
  var countEl = document.getElementById("tasbihCount");
  var completedEl = document.getElementById("tasbihCompleted");
  var ring = document.getElementById("tasbihRing");

  function updateProgress() {
    if (state.tasbihLimit > 0) {
      var pct = Math.min((state.tasbihCount / state.tasbihLimit) * 100, 100);
      ring.style.setProperty("--progress", pct + "%");
    } else {
      ring.style.setProperty("--progress", "0%");
    }
  }

  updateProgress();

  btn.addEventListener("click", function () {
    if (state.tasbihLimit > 0 && state.tasbihCount >= state.tasbihLimit) return;
    state.tasbihCount++;
    countEl.textContent = state.tasbihCount;
    saveState();
    updateProgress();
    btn.classList.add("pulse");
    setTimeout(function () {
      btn.classList.remove("pulse");
    }, 150);
    if (navigator.vibrate) navigator.vibrate(20);

    if (state.tasbihLimit > 0 && state.tasbihCount >= state.tasbihLimit) {
      completedEl.style.display = "block";
      if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);
    }
  });

  document.getElementById("tasbihReset").addEventListener("click", function () {
    state.tasbihCount = 0;
    countEl.textContent = 0;
    completedEl.style.display = "none";
    saveState();
    updateProgress();
  });

  document.querySelectorAll(".tasbih-limit-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      state.tasbihLimit = parseInt(this.getAttribute("data-limit"));
      state.tasbihCount = 0;
      countEl.textContent = 0;
      completedEl.style.display = "none";
      saveState();
      updateProgress();
      document.querySelectorAll(".tasbih-limit-btn").forEach(function (x) {
        x.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  HIJRI CALENDAR (MODAL + WIDGET)
// ═══════════════════════════════════════════════════════════════════════════

function getHijriFirstDayOfWeek(
  hijriYear,
  hijriMonth,
  hijriDay,
  gregorianDate,
) {
  // Find the Gregorian date of the 1st of this Hijri month
  var firstDay = new Date(gregorianDate);
  firstDay.setDate(firstDay.getDate() - (hijriDay - 1));
  return firstDay.getDay(); // 0=Sun
}

function buildCalendarGrid(
  hijriYear,
  hijriMonth,
  hijriDay,
  firstDayOfWeek,
  todayHijriDay,
  isCurrentMonth,
) {
  var days = hijriDaysInMonth(hijriMonth, hijriYear);
  var months = T[state.lang].hijriMonths;
  var weekDays = T[state.lang].weekDaysShort;

  var html = "";
  // Week day headers
  html += '<div class="hcal-weekdays">';
  weekDays.forEach(function (d, i) {
    html +=
      '<div class="hcal-wd' + (i === 5 ? " friday" : "") + '">' + d + "</div>";
  });
  html += '</div><div class="hcal-grid">';

  // Empty cells before first
  for (var e = 0; e < firstDayOfWeek; e++) {
    html += '<div class="hcal-cell empty"></div>';
  }

  // Day cells
  for (var d = 1; d <= days; d++) {
    var key = d + "-" + hijriMonth;
    var event = ISLAMIC_DATES[key];
    var isToday = isCurrentMonth && d === todayHijriDay;
    var classes =
      "hcal-cell" + (isToday ? " today" : "") + (event ? " event" : "");
    var tooltip = event ? event[state.lang] || event.en : "";
    html +=
      '<div class="' +
      classes +
      '" title="' +
      tooltip +
      '">' +
      '<span class="hcal-day-num">' +
      d +
      "</span>" +
      (event ? '<span class="hcal-dot"></span>' : "") +
      "</div>";
  }
  html += "</div>";
  return html;
}

function openHijriCalendarModal() {
  if (!state.hijriYear) {
    openPlaceholder(t("hijriCal"));
    return;
  }
  state.hijriCalOffset = 0;
  openModal(t("hijriCal"), renderHijriCalModal());
  bindHijriCalModal();
}

function renderHijriCalModal() {
  var month =
    ((((state.hijriMonth - 1 + state.hijriCalOffset) % 12) + 12) % 12) + 1;
  var yearOffset = Math.floor(
    (state.hijriMonth - 1 + state.hijriCalOffset) / 12,
  );
  var year = state.hijriYear + yearOffset;
  var monthName = T[state.lang].hijriMonths[month - 1];
  var isCurrentMonth = state.hijriCalOffset === 0;

  // Compute first day of week for this month
  // We know today is hijriDay of hijriMonth. Offset by hijriCalOffset months
  var today = new Date();
  var firstDay = new Date(today);
  if (isCurrentMonth) {
    firstDay.setDate(firstDay.getDate() - (state.hijriDay - 1));
  } else {
    // Approximate: each Hijri month ~29.5 days
    var daysDiff = 0;
    for (var i = 0; i < Math.abs(state.hijriCalOffset); i++) {
      var m2 =
        state.hijriCalOffset > 0
          ? ((((state.hijriMonth - 1 + i) % 12) + 12) % 12) + 1
          : ((((state.hijriMonth - 1 - i - 1) % 12) + 12) % 12) + 1;
      daysDiff += hijriDaysInMonth(m2, year);
    }
    if (state.hijriCalOffset > 0) {
      firstDay.setDate(today.getDate() - (state.hijriDay - 1) + daysDiff);
    } else {
      firstDay.setDate(today.getDate() - (state.hijriDay - 1) - daysDiff);
    }
  }
  var firstDayOfWeek = firstDay.getDay();

  var html =
    '<div class="hcal-modal">' +
    '<div class="hcal-nav">' +
    '<button class="hcal-nav-btn" id="hcalPrev"><i class="fa-solid fa-chevron-' +
    (state.lang === "ar" ? "right" : "left") +
    '"></i></button>' +
    '<div class="hcal-nav-title">' +
    monthName +
    " " +
    year +
    " AH</div>" +
    '<button class="hcal-nav-btn" id="hcalNext"><i class="fa-solid fa-chevron-' +
    (state.lang === "ar" ? "left" : "right") +
    '"></i></button>' +
    "</div>" +
    buildCalendarGrid(
      year,
      month,
      state.hijriDay,
      firstDayOfWeek,
      state.hijriDay,
      isCurrentMonth,
    ) +
    "</div>";

  // Legend
  html +=
    '<div class="hcal-legend"><span class="hcal-dot"></span> ' +
    (state.lang === "ar" ? "مناسبة إسلامية" : "Islamic occasion") +
    ' &nbsp;&nbsp; <span class="hcal-today-swatch"></span> ' +
    (state.lang === "ar" ? "اليوم" : "Today") +
    "</div>";
  return html;
}

function bindHijriCalModal() {
  document.getElementById("hcalPrev").addEventListener("click", function () {
    state.hijriCalOffset--;
    document.getElementById("modalBody").innerHTML = renderHijriCalModal();
    bindHijriCalModal();
  });
  document.getElementById("hcalNext").addEventListener("click", function () {
    state.hijriCalOffset++;
    document.getElementById("modalBody").innerHTML = renderHijriCalModal();
    bindHijriCalModal();
  });
}

function renderHijriCalendarWidget() {
  if (!state.hijriYear) return;
  var widget = document.getElementById("hijriCalWidget");
  if (!widget) return;

  var monthName = T[state.lang].hijriMonths[state.hijriMonth - 1];
  var weekDays = T[state.lang].weekDaysShort;

  var today = new Date();
  var firstDay = new Date(today);
  firstDay.setDate(firstDay.getDate() - (state.hijriDay - 1));
  var firstDayOfWeek = firstDay.getDay();
  var days = hijriDaysInMonth(state.hijriMonth, state.hijriYear);

  var html =
    '<div class="hcal-widget-header">' +
    '<span class="hcal-widget-title">' +
    monthName +
    " " +
    state.hijriYear +
    " AH</span>" +
    "</div>" +
    '<div class="hcal-weekdays">';
  weekDays.forEach(function (d, i) {
    html +=
      '<div class="hcal-wd' + (i === 5 ? " friday" : "") + '">' + d + "</div>";
  });
  html += '</div><div class="hcal-grid hcal-widget-grid">';
  for (var e = 0; e < firstDayOfWeek; e++) {
    html += '<div class="hcal-cell empty"></div>';
  }
  for (var d = 1; d <= days; d++) {
    var key = d + "-" + state.hijriMonth;
    var event = ISLAMIC_DATES[key];
    var isToday = d === state.hijriDay;
    var cls = "hcal-cell" + (isToday ? " today" : "") + (event ? " event" : "");
    html +=
      '<div class="' +
      cls +
      '" title="' +
      (event ? event[state.lang] || event.en : "") +
      '">' +
      '<span class="hcal-day-num">' +
      d +
      "</span>" +
      (event ? '<span class="hcal-dot"></span>' : "") +
      "</div>";
  }
  html += "</div>";
  widget.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════
//  ASMA UL HUSNA
// ═══════════════════════════════════════════════════════════════════════════

function openAsmaUlHusna() {
  var html =
    '<div class="asma-wrap">' +
    '<input class="asma-search" id="asmaSearch" placeholder="' +
    t("asmaSearch") +
    '" type="text">' +
    '<div class="asma-grid" id="asmaGrid">' +
    buildAsmaCards(ASMA_UL_HUSNA) +
    "</div>" +
    "</div>";
  openModal(t("asmaUlHusna"), html);

  document.getElementById("asmaSearch").addEventListener("input", function () {
    var q = this.value.toLowerCase();
    var filtered = ASMA_UL_HUSNA.filter(function (n) {
      return (
        n.ar.includes(q) ||
        n.tr.toLowerCase().includes(q) ||
        n.en.toLowerCase().includes(q) ||
        String(n.n) === q
      );
    });
    document.getElementById("asmaGrid").innerHTML = buildAsmaCards(filtered);
  });
}

function buildAsmaCards(names) {
  return names
    .map(function (n) {
      return (
        '<div class="asma-card">' +
        '<span class="asma-num">' +
        n.n +
        "</span>" +
        '<span class="asma-arabic">' +
        n.ar +
        "</span>" +
        '<span class="asma-tr">' +
        n.tr +
        "</span>" +
        '<span class="asma-en">' +
        n.en +
        "</span>" +
        "</div>"
      );
    })
    .join("");
}

// ═══════════════════════════════════════════════════════════════════════════
//  DUA OF THE DAY
// ═══════════════════════════════════════════════════════════════════════════

function openDuaOfDay() {
  var idx = new Date().getDay(); // 0 Sun … 6 Sat
  var dua = DAILY_DUAS[idx];
  var html =
    '<div class="dua-wrap">' +
    '<div class="dua-arabic">' +
    dua.arabic +
    "</div>" +
    '<div class="dua-tr">' +
    dua.transliteration +
    "</div>" +
    '<div class="dua-divider"></div>' +
    '<div class="dua-translation">' +
    dua.translation +
    "</div>" +
    '<div class="dua-source"><i class="fa-solid fa-book-open-reader"></i> ' +
    t("duaSource") +
    " " +
    dua.source +
    "</div>" +
    "</div>";
  openModal(t("duaOfDay"), html);
}

// ═══════════════════════════════════════════════════════════════════════════
//  SUNNAH TIMES
// ═══════════════════════════════════════════════════════════════════════════

function openSunnahTimes() {
  if (!state.prayerTimings) {
    openPlaceholder(t("sunnahTimes"));
    return;
  }
  var pt = state.prayerTimings;
  var ishraqTime = addMinutesToTime(pt.Sunrise, 15);
  var duhaEndTime = addMinutesToTime(pt.Dhuhr, -15);
  var awwabeenEnd = addMinutesToTime(pt.Isha, 0);
  var tahajjudStart = addMinutesToTime(
    pt.Isha,
    Math.floor((minutesBetween(pt.Isha, pt.Fajr) * 2) / 3),
  );

  function row(icon, name, desc, time, timeEnd) {
    return (
      '<div class="sunnah-row">' +
      '<div class="sunnah-icon"><i class="fa-solid ' +
      icon +
      '"></i></div>' +
      '<div class="sunnah-info">' +
      '<div class="sunnah-name">' +
      name +
      "</div>" +
      '<div class="sunnah-desc">' +
      desc +
      "</div>" +
      "</div>" +
      '<div class="sunnah-time">' +
      "<span>" +
      formatTime(time) +
      "</span>" +
      (timeEnd
        ? '<span class="sunnah-arrow">→</span><span>' +
          formatTime(timeEnd) +
          "</span>"
        : "") +
      "</div>" +
      "</div>"
    );
  }

  var html =
    '<div class="sunnah-wrap">' +
    row("fa-sunrise", t("ishraq"), t("ishraqDesc"), ishraqTime, "") +
    row("fa-sun", t("duha"), t("duhaDesc"), ishraqTime, duhaEndTime) +
    row(
      "fa-moon",
      t("awwabeen"),
      t("awwabeenDesc"),
      formatTime(pt.Maghrib),
      awwabeenEnd,
    ) +
    row("fa-star", t("tahajjud"), t("tahajjudDesc"), tahajjudStart, pt.Fajr) +
    "</div>";

  openModal(t("sunnahTimes"), html);
}

// ═══════════════════════════════════════════════════════════════════════════
//  QIYAM AL-LAYL
// ═══════════════════════════════════════════════════════════════════════════

function openQiyam() {
  if (!state.prayerTimings) {
    openPlaceholder(t("qiyam"));
    return;
  }
  var pt = state.prayerTimings;
  var nightMins = minutesBetween(pt.Isha, pt.Fajr);
  var third = Math.floor(nightMins / 3);

  var firstStart = pt.Isha;
  var secondStart = addMinutesToTime(pt.Isha, third);
  var thirdStart = addMinutesToTime(pt.Isha, third * 2);
  var fajrTime = pt.Fajr;

  function thirdToDisplay(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h + "h " + padded(m) + "m";
  }

  function nightRow(label, start, end, isLast) {
    return (
      '<div class="qiyam-row' +
      (isLast ? " qiyam-best" : "") +
      '">' +
      '<div class="qiyam-label">' +
      label +
      (isLast ? " ★" : "") +
      "</div>" +
      '<div class="qiyam-times">' +
      "<span>" +
      formatTime(start) +
      "</span>" +
      '<span class="qiyam-dash">—</span>' +
      "<span>" +
      formatTime(end) +
      "</span>" +
      "</div>" +
      '<div class="qiyam-duration">' +
      thirdToDisplay(third) +
      "</div>" +
      "</div>"
    );
  }

  var html =
    '<div class="qiyam-wrap">' +
    '<div class="qiyam-duration-header">' +
    t("nightDuration") +
    ": <strong>" +
    thirdToDisplay(nightMins) +
    "</strong>" +
    "</div>" +
    nightRow(t("firstThird"), firstStart, secondStart, false) +
    nightRow(t("secondThird"), secondStart, thirdStart, false) +
    nightRow(t("lastThird"), thirdStart, fajrTime, true) +
    '<p class="qiyam-note"><i class="fa-solid fa-star"></i> ' +
    t("qiyamNote") +
    "</p>" +
    "</div>";

  openModal(t("qiyam"), html);
}

// ═══════════════════════════════════════════════════════════════════════════
//  HADITH
// ═══════════════════════════════════════════════════════════════════════════

function openHadith() {
  var html =
    '<div class="modal-placeholder">' +
    '<div class="placeholder-icon"><i class="fa-solid fa-scroll"></i></div>' +
    "<h3>" +
    t("placeholderTitle") +
    "</h3>" +
    "<p>" +
    t("hadithComingSoon") +
    "</p>" +
    "</div>";
  openModal(t("hadith"), html);
}

// ═══════════════════════════════════════════════════════════════════════════
//  DONATION
// ═══════════════════════════════════════════════════════════════════════════

function openDonation() {
  var html =
    '<div class="donation-wrap">' +
    '<div class="donation-heart"><i class="fa-solid fa-heart"></i></div>' +
    '<h3 class="donation-title">' +
    t("donationTitle") +
    "</h3>" +
    '<p class="donation-text">' +
    t("donationText") +
    "</p>" +
    '<div class="donation-divider"></div>' +
    '<p class="donation-platforms">' +
    t("donationPlatforms") +
    "</p>" +
    '<div class="donation-links">' +
    "<!-- TODO: Replace # with your actual donation links -->" +
    '<a href="#" class="donation-link" target="_blank"><i class="fa-solid fa-mug-hot"></i> Buy Me a Coffee</a>' +
    '<a href="#" class="donation-link" target="_blank"><i class="fa-solid fa-leaf"></i> Ko-fi</a>' +
    '<a href="#" class="donation-link" target="_blank"><i class="fa-brands fa-paypal"></i> PayPal.me</a>' +
    "</div>" +
    "</div>";
  openModal(t("donation"), html);
}

// ═══════════════════════════════════════════════════════════════════════════
//  QIBLA COMPASS — REWRITTEN & CORRECTED
// ═══════════════════════════════════════════════════════════════════════════

function openQibla() {
  if (!state.geoData) {
    openPlaceholder(t("qibla"));
    return;
  }

  // Calculate the static bearing from user to Mecca
  var bearing = qiblaBearing(
    parseFloat(state.geoData.latitude),
    parseFloat(state.geoData.longitude),
  );
  var bearingFixed = bearing.toFixed(1);

  // Build the HTML for the modal
  var html =
    '<div class="qibla-wrap">' +
    // Display the calculated bearing
    '<div class="qibla-bearing-info">' +
    '<span class="qibla-degrees">' + bearingFixed + '°</span>' +
    '<span class="qibla-bearing-label">' + t("qiblaBearing") + '</span>' +
    '</div>' +

    // The compass container - this stays fixed
    '<div class="qibla-compass-container">' +
    // The rotating compass rose INSIDE the container
    '<div class="qibla-compass-rose" id="compassRose">' +
    // Cardinal directions - painted on the rose, so they rotate with it
    '<div class="compass-cardinal compass-n">N</div>' +
    '<div class="compass-cardinal compass-e">E</div>' +
    '<div class="compass-cardinal compass-s">S</div>' +
    '<div class="compass-cardinal compass-w">W</div>' +
    '</div>' +

    // The needle - FIXED, always points to Mecca. Placed on top.
    '<div class="qibla-needle" id="qiblaNeedle">' +
    '<div class="needle-head"></div>' +
    '<div class="needle-center"></div>' +
    '<div class="needle-tail"></div>' +
    '</div>' +
    '</div>' + // End .qibla-compass-container

    // Guidance text area
    '<div class="qibla-guidance" id="qiblaGuidance">' +
    '<div class="guidance-icon"><i class="fa-solid fa-compass"></i></div>' +
    '<div class="guidance-text" id="guidanceText">' + t("qiblaPermission") + '</div>' +
    '</div>' +

    // Permission button (hidden once active)
    '<div class="qibla-permission-wrap" id="qiblaPermWrap">' +
    '<button class="qibla-perm-btn" id="qiblaPermBtn">' +
    '<i class="fa-solid fa-compass"></i> ' + t("qiblaPermission") +
    '</button>' +
    '</div>' +
    '</div>';

  openModal(t("qibla"), html);
  state.qiblaActive = true;

  // Immediately point the needle correctly (static bearing)
  var needle = document.getElementById('qiblaNeedle');
  if (needle) {
    needle.style.transform = 'rotate(' + bearing + 'deg)';
  }

  // Bind the permission button click event
  document.getElementById('qiblaPermBtn').addEventListener('click', function() {
    startCompass(bearing);
  });

  // Auto-start on Android (no permission needed)
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    startCompass(bearing);
  }
}

function startCompass(qiblaBearingDeg) {
  var rose = document.getElementById('compassRose');
  var guidanceText = document.getElementById('guidanceText');
  var guidanceIcon = document.querySelector('.guidance-icon');
  var permWrap = document.getElementById('qiblaPermWrap');
  var isAligned = false; // Flag for haptic feedback

  // Hide the permission button once activated
  if (permWrap) permWrap.style.display = 'none';

  // Function to calculate guidance message
  function getGuidance(angleDiff) {
    var absDiff = Math.abs(angleDiff);
    var lang = state.lang;

    if (absDiff < 10) {
      return { text: lang === 'ar' ? '✓ اتجاهك صحيح' : '✓ Facing Qibla', level: 'aligned' };
    } else if (absDiff > 170) {
      return { text: lang === 'ar' ? 'اتجاه معاكس - استدر' : 'Opposite direction - turn around', level: 'opposite' };
    }

    var direction = angleDiff > 0 ? (lang === 'ar' ? 'يمينًا' : 'right') : (lang === 'ar' ? 'يسارًا' : 'left');
    var intensity = '';

    if (absDiff > 90) intensity = lang === 'ar' ? 'استدر ' : 'Turn ';
    else if (absDiff > 30) intensity = lang === 'ar' ? 'أدر ' : 'Turn ';
    else intensity = lang === 'ar' ? 'انحرف ' : 'Adjust ';

    return { text: intensity + direction, level: 'adjusting' };
  }

  // The main compass handler
  state.compassWatch = function(event) {
    // Get the device's compass heading
    var heading = null;

    // Check for iOS (webkitCompassHeading) and Android (alpha)
    if (event.webkitCompassHeading !== undefined) {
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Android: alpha is 0-360, but relative to device orientation.
      // We need to convert it to a magnetic heading.
      // This is a simplification and may need calibration on some devices.
      heading = 360 - event.alpha;
    }

    // If we have a valid heading, update the UI
    if (heading !== null) {
      // Rotate the compass rose so that 'N' on the rose aligns with magnetic north
      if (rose) rose.style.transform = 'rotate(' + (-heading) + 'deg)';

      // The needle is already pointed at the static Qibla bearing.
      // Now calculate how far off the user is from that bearing.
      var userToQiblaAngle = qiblaBearingDeg - heading;

      // Normalize the angle to between -180 and 180 for the guidance message
      while (userToQiblaAngle > 180) userToQiblaAngle -= 360;
      while (userToQiblaAngle < -180) userToQiblaAngle += 360;

      // Update guidance text
      var guidance = getGuidance(userToQiblaAngle);
      if (guidanceText) guidanceText.textContent = guidance.text;

      // Update guidance icon color based on alignment
      if (guidanceIcon) {
        guidanceIcon.className = 'guidance-icon guidance-' + guidance.level;
        if (guidance.level === 'aligned') {
          guidanceIcon.innerHTML = '<i class="fa-solid fa-kaaba"></i>';
          // Haptic feedback when first aligned
          if (!isAligned && navigator.vibrate) {
            navigator.vibrate(50);
            isAligned = true;
          }
        } else {
          guidanceIcon.innerHTML = '<i class="fa-solid fa-compass"></i>';
          isAligned = false;
        }
      }
    }
  };

  // Request permission and start listening
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS
    DeviceOrientationEvent.requestPermission()
      .then(function(permissionState) {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', state.compassWatch, false);
          if (guidanceText) guidanceText.textContent = state.lang === 'ar' ? 'جاري البحث...' : 'Searching...';
        } else {
          if (guidanceText) guidanceText.textContent = t("qiblaUnavailable");
        }
      })
      .catch(function(error) {
        console.error("Compass permission error:", error);
        if (guidanceText) guidanceText.textContent = t("qiblaUnavailable");
      });
  } else if (typeof DeviceOrientationEvent !== 'undefined') {
    // Android and other supported browsers
    window.addEventListener('deviceorientation', state.compassWatch, false);
    if (guidanceText) guidanceText.textContent = state.lang === 'ar' ? 'جاري البحث...' : 'Searching...';
  } else {
    // Browser doesn't support the API
    if (guidanceText) guidanceText.textContent = t("qiblaUnavailable");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  BACKGROUND TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════

var wrapperBackground = document.getElementById("wrapperBackground");
var imgEl = document.getElementById("img");

function changeBg(el, stateKey, newUrl) {
  if (newUrl === state[stateKey]) return;
  state[stateKey] = newUrl;
  el.style.opacity = "0";
  setTimeout(function () {
    el.style.backgroundImage = "url('" + newUrl + "')";
    el.style.opacity = "1";
  }, 500);
}

function chooseBgImage(
  currentMinutes,
  fajrM,
  sunriseM,
  dhuhrM,
  asrM,
  maghribM,
  ishaM,
) {
  if (currentMinutes <= fajrM + 30) return "assets/IMG/TIMES/fajrTime.avif";
  if (currentMinutes <= sunriseM + 30) return "assets/IMG/TIMES/sunriseTime.avif";
  if (currentMinutes < dhuhrM + 75) return "assets/IMG/TIMES/dhuhrTime.avif";
  if (currentMinutes < asrM + 100) return "assets/IMG/TIMES/asrTime.avif";
  if (currentMinutes < maghribM - 10) return "assets/IMG/TIMES/sunsetTime.avif";
  if (currentMinutes < ishaM - 40) return "assets/IMG/TIMES/maghribTime.avif";
  return "assets/IMG/TIMES/ishaTime.avif";
}

// ═══════════════════════════════════════════════════════════════════════════
//  PRAYER POPUP
// ═══════════════════════════════════════════════════════════════════════════

function removeFunc() {
  document.getElementById("itsPrayerTimePopUp").style.display = "none";
}

// ═══════════════════════════════════════════════════════════════════════════
//  SHOW MAIN BODY (once)
// ═══════════════════════════════════════════════════════════════════════════

function showMainBody() {
  if (state.mainShown) return;
  state.mainShown = true;
  var mainBody = document.getElementById("mainBody");
  var loader = document.getElementById("loader");
  setTimeout(function () {
    mainBody.style.display = "block";
    mainBody.style.visibility = "visible";
    mainBody.style.opacity = "1";
    mainBody.style.transition = "opacity 0.5s ease-in-out";
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.transition = "opacity 0.5s ease-in-out";
  }, 2000);
}

// ═══════════════════════════════════════════════════════════════════════════
//  TICK — runs every second, zero network calls
// ═══════════════════════════════════════════════════════════════════════════

function tick() {
  if (!state.prayerTimings) return;
  var pt = state.prayerTimings;

  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var year = now.getFullYear();

  document.getElementById("currentTime").textContent =
    padded(hours) + ":" + padded(minutes) + ":" + padded(seconds);

  var currentMinutes = hours * 60 + minutes;
  var fajrM = timeToMinutes(pt.Fajr);
  var sunriseM = timeToMinutes(pt.Sunrise);
  var dhuhrM = timeToMinutes(pt.Dhuhr);
  var asrM = timeToMinutes(pt.Asr);
  var maghribM = timeToMinutes(pt.Maghrib);
  var ishaM = timeToMinutes(pt.Isha);

  // Next prayer
  var nextName, nextTime;
  if (currentMinutes < fajrM) {
    nextName = "fajr";
    nextTime = pt.Fajr;
  } else if (currentMinutes < dhuhrM) {
    nextName = "dhuhr";
    nextTime = pt.Dhuhr;
  } else if (currentMinutes < asrM) {
    nextName = "asr";
    nextTime = pt.Asr;
  } else if (currentMinutes < maghribM) {
    nextName = "maghrib";
    nextTime = pt.Maghrib;
  } else if (currentMinutes < ishaM) {
    nextName = "isha";
    nextTime = pt.Isha;
  } else {
    nextName = "fajr";
    nextTime = pt.Fajr;
  } // tomorrow

  document.getElementById("nextPrayer").textContent = t(nextName);
  document.getElementById("nextPrayerTime").textContent = formatTime(nextTime);

  // Countdown
  var tomorrow = nextName === "fajr" && currentMinutes >= ishaM;
  var targetDate = new Date(
    year,
    month - 1,
    tomorrow ? day + 1 : day,
    parseInt(nextTime.split(":")[0]),
    parseInt(nextTime.split(":")[1]),
    0,
  );
  var dist = targetDate.getTime() - now.getTime();
  var ph = padded(Math.floor((dist % 86400000) / 3600000));
  var pm = padded(Math.floor((dist % 3600000) / 60000));
  var ps = padded(Math.floor((dist % 60000) / 1000));
  document.getElementById("remainingPrayerTime").textContent =
    ph + ":" + pm + ":" + ps;

  // Prayer time popup
  if (dist <= 1000 && dist > -1000) {
    document.getElementById("itsPrayerTimePopUp").style.display = "flex";
    document.getElementById("popUpPrayer").textContent = t(nextName);
  }

  // Background
  var bg = chooseBgImage(
    currentMinutes,
    fajrM,
    sunriseM,
    dhuhrM,
    asrM,
    maghribM,
    ishaM,
  );
  changeBg(wrapperBackground, "currentBg", bg);
  changeBg(imgEl, "currentImgBg", bg);

  // Highlight the NEXT prayer row (the one coming up)
  document.querySelectorAll(".prayer").forEach(function (li) {
    li.classList.toggle(
      "active-prayer",
      li.getAttribute("data-prayer") === nextName,
    );
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  FETCH PRAYER TIMES — once per load (or on method change)
// ═══════════════════════════════════════════════════════════════════════════

function fetchPrayerTimes(geo) {
  var now = new Date();
  var month = padded(now.getMonth() + 1);
  var day = padded(now.getDate());
  var year = String(now.getFullYear());

  var url =
    "https://api.aladhan.com/v1/timingsByAddress/" +
    day +
    "-" +
    month +
    "-" +
    year +
    "?address=" +
    encodeURIComponent(geo.city || geo.locality) +
    "," +
    encodeURIComponent(geo.countryCode);

  if (state.calcMethod !== "auto") url += "&method=" + state.calcMethod;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.error("Prayer API error", xhr.status);
      return;
    }
    var api = JSON.parse(xhr.responseText);
    state.prayerTimings = api.data.timings;
    state.prayerDate = api.data.date;

    // Parse Hijri date for calendar
    state.hijriYear = parseInt(api.data.date.hijri.year);
    state.hijriMonth = parseInt(api.data.date.hijri.month.number);
    state.hijriDay = parseInt(api.data.date.hijri.day);

    // Static UI — set once
    document.getElementById("geoInfos").textContent =
      (geo.city || geo.locality) + ", " + geo.countryName;

    var flag = document.getElementById("countryIcon");
    flag.className = "";
    flag.classList.add("fi", "fi-" + geo.countryCode.toLowerCase(), "fis");

    document.getElementById("miladiCal").textContent =
      api.data.date.gregorian.date;
    document.getElementById("hijriCal").textContent =
      api.data.date.hijri.day +
      " " +
      T[state.lang].hijriMonths[state.hijriMonth - 1] +
      " " +
      api.data.date.hijri.year;

    renderPrayerTimes();
    renderHijriCalendarWidget();
    applyLanguage();

    showMainBody();
    tick();
    setInterval(tick, 1000);
  };

  xhr.onerror = function () {
    console.error("Prayer times network request failed");
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  REVERSE GEOCODING
// ═══════════════════════════════════════════════════════════════════════════

function reverseGeocode(lat, lng) {
  var url =
    "https://api.bigdatacloud.net/data/reverse-geocode-client" +
    "?latitude=" +
    lat +
    "&longitude=" +
    lng +
    "&localityLanguage=en";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      state.geoData = JSON.parse(xhr.responseText);
      fetchPrayerTimes(state.geoData);
    }
  };
  xhr.onerror = function () {
    console.error("Geocoding failed");
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  GEOLOCATION ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════

function successCallback(pos) {
  reverseGeocode(
    parseFloat(pos.coords.latitude).toFixed(3),
    parseFloat(pos.coords.longitude).toFixed(3),
  );
}

function errorCallback(err) {
  console.error(
    "Geolocation error:",
    { 1: "Permission denied", 2: "Position unavailable", 3: "Timeout" }[
      err.code
    ] || "Unknown",
  );
}

// Apply saved language immediately on load (before data arrives)
applyLanguage();

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
