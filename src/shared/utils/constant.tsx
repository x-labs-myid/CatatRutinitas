import { Dimensions } from "react-native"

// Dimension
export const dimensionWidth = Dimensions.get('window').width
export const dimensionHeight = Dimensions.get('window').height

// Color
export const primary = `#1DA1F2`
export const red = `#FF5C8D`
export const green = `#00D26B`
export const yellow = `#F9E56C`
export const white = `#FFFFFF`
export const light_gray = `#E1E8ED`
export const dark_gray = `#66757F`
export const dark = `#15202B`

// Font
export const fontStandard = 12 * (dimensionWidth / 375)
export const fontTitle = 15 * (dimensionWidth / 375)
export const fontExtra = 18 * (dimensionWidth / 375)
export const font = {
    BrandonRegular: 'HvDTrial Brandon Grotesque Regular',
    BrandonBold: 'HvDTrial Brandon Grotesque Bold',
    BrandonItalic: 'HvDTrial Brandon Grotesque Italic',
    BrandonLight: 'HvDTrial Brandon Grotesque Light',
}

// Icon
export const sizeIconRegular = 24
export const sizeIconExtra = 100
export const border_radius_button = 7.5

// Notification
export const notificationChannelId = `Routine`
export const notificationName = `Routine Notification Channel`

// Async Storage
export const ASlanguage = `language`

// table watermelonDB
export const tableRoutine = `routines`
export const tableCompleteRoutine = `complete_routine`

// Language
export const Indonesia = `ID`
export const English = `EN`
export const Melayu = `MY`
export const regular = `biasa`
export const sunda = `sunda`
export const jawa = `jawa`
export const minang = `minang`
export const betawi = `betawi`
export const listFeel = [
    {
        id: regular,
        title: 'Biasa'
    },
    {
        id: sunda,
        title: 'Campur Sunda'
    },
    {
        id: jawa,
        title: 'Campur Jawa'
    },
    {
        id: minang,
        title: 'Campur Minang'
    },
    {
        id: betawi,
        title: 'Campur Betawi'
    },
]
export const traslateIndonesia: { [key: string]: { [key: string]: string } } = {
    'biasa': {
        'aku': 'aku',
        'kamu': 'kamu'
    },
    'sunda': {
        'aku': 'aing',
        'kamu': 'maneh'
    },
    'jawa': {
        'aku': 'kula',
        'kamu': 'kowe'
    },
    'minang': {
        'aku': 'denai',
        'kamu': 'ang'
    },
    'betawi': {
        'aku': 'gue',
        'kamu': 'lu'
    }
}

// extras
export const durationSnackBar = 1500

export const listWordNotification: string[] = [
    "Selamat pagi 🌞! Yuk mulai hari dengan rutinitas positif kamu.",
    "Gaspol lagi hari ini 🚀, jangan skip biar habit makin nempel!",
    "Konsisten bikin kamu makin keren tiap harinya ✨",
    "Semangat terus jangan kendor!",
    "Yuk isi hari kamu dengan rutinitas positif 🌱",
    "Step kecil tiap hari = hasil gede nanti 💯",
    "Jangan kasih ruang buat males, ayo gerak dikit 💪",
    "Positive vibes only ✌️, waktunya rutinitas kamu hari ini!",
    "Kamu udah hebat banget bisa konsisten sejauh ini 🔥",
    "Tambahin energi positif buat diri kamu sendiri hari ini ⚡",
    "Cuma butuh beberapa menit, efeknya bisa seharian 😎",
    "Yuk upgrade diri kamu, satu langkah kecil tiap hari 🎯",
    "Jangan lupa self-care, rutinitas kamu penting buat kesehatan 💚",
    "Konsistensi = power. kamu pasti bisa bro/sis! 💥",
    "Waktunya jadi versi terbaik dari diri kamu sendiri ✨",
    "Jangan tunggu mood, bikin mood kamu naik dengan rutinitas 😁",
    "Hari ini ayo lakuin rutinitas positif kamu 🌟",
    "Udah sejauh ini, jangan berhenti ya! Keep going 🙌",
    "Fokus ke progress, nikmati prosesnya 🚶",
    "Ayo buktiin kalo kamu bisa disiplin + konsisten 🔑",
];

export const listWordNotificationEN: string[] = [
    "Good morning 🌞! Let’s start the day with your positive routine.",
    "Full throttle today 🚀, don’t skip so your habit sticks!",
    "Consistency makes you cooler every day ✨",
    "Keep the spirit up, don’t slack off!",
    "Let’s fill your day with positive routines 🌱",
    "Small steps every day = big results later 💯",
    "No room for laziness, let’s move a bit 💪",
    "Positive vibes only ✌️, it’s time for your routine today!",
    "You’ve done great being consistent so far 🔥",
    "Add some positive energy to yourself today ⚡",
    "Just a few minutes can have an all-day effect 😎",
    "Let’s upgrade yourself, one small step at a time 🎯",
    "Don’t forget self-care, your routine matters for your health 💚",
    "Consistency = power. You got this bro/sis! 💥",
    "Time to be the best version of yourself ✨",
    "Don’t wait for the mood, boost it with your routine 😁",
    "Let’s do your positive routine today 🌟",
    "You’ve come this far, don’t stop now! Keep going 🙌",
    "Focus on progress, enjoy the process 🚶",
    "Prove that you can be disciplined + consistent 🔑",
];

export const listWordNotificationMY: string[] = [
    "Selamat pagi 🌞! Jom mulakan hari dengan rutin positif anda.",
    "Teruskan semangat hari ini 🚀, jangan tinggal supaya tabiat makin mantap!",
    "Konsisten buat anda makin hebat setiap hari ✨",
    "Teruskan semangat, jangan mengalah!",
    "Jom isi hari anda dengan rutin yang positif 🌱",
    "Langkah kecil setiap hari = hasil besar nanti 💯",
    "Jangan beri ruang untuk malas, gerak sikit pun dah cukup 💪",
    "Hanya aura positif ✌️, masa untuk rutin anda hari ini!",
    "Anda dah sangat hebat sebab konsisten sampai sekarang 🔥",
    "Tambah tenaga positif untuk diri anda hari ini ⚡",
    "Beberapa minit saja cukup untuk beri kesan sepanjang hari 😎",
    "Jom tingkatkan diri anda, satu langkah kecil setiap hari 🎯",
    "Jangan lupa jaga diri, rutin anda penting untuk kesihatan 💚",
    "Konsistensi = kuasa. Anda pasti boleh bro/sis! 💥",
    "Masa untuk jadi versi terbaik diri anda ✨",
    "Jangan tunggu mood, naikkan mood dengan rutin 😁",
    "Hari ini, jom lakukan rutin positif anda 🌟",
    "Dah sampai sejauh ini, jangan berhenti! Teruskan 🙌",
    "Fokus pada kemajuan, nikmati prosesnya 🚶",
    "Buktikan anda boleh berdisiplin + konsisten 🔑",
];

export const listWordSleepNotification: string[] = [
    "Udah malem nih, waktunya tidur biar besok fresh ✨",
    "Gas tidur dulu yuk, jangan kebanyakan scroll HP 📱😆",
    "Besok kamu mau produktif kan? Tidur sekarang biar fit 💪",
    "Ingat, tidur cukup = energi full buat rutinitas besok ⚡",
    "Matikan layar, tarik selimut, saatnya bobok 🛌",
    "Begadang itu musuh produktifitas, yuk tidur cepet 😴",
    "Tubuh kamu butuh istirahat, jangan dipaksa terus ya 🙌",
    "Tidur yang cukup bikin mood besok lebih oke 🎶",
    "Jangan kalah sama FOMO, tidur dulu biar sehat 🌙",
    "Kamu udah keren hari ini, reward buat diri = tidur nyenyak 💤",
    "Stop kerja / main sekarang, recharge energi lewat tidur 🔋",
    "Tidur awal bikin bangun pagi lebih gampang ⏰",
    "Besok banyak hal seru nunggu, yuk bobok dulu ✨",
    "Layar HP bisa nunggu, tapi badan kamu butuh tidur sekarang 🛑",
    "Selamat malam, semoga mimpi indah ya 🌌",
    "Yuk rehat, tidur cukup biar otak makin encer besok 🧠",
    "Tidur itu bagian dari self-care, jangan di-skip 💕",
    "Waktu tidur udah manggil, jangan cuekin ya 😆",
    "Besok mau ngelakuin rutinitas positif? Tidur dulu dong 🌟",
    "Good night, energi besok dimulai dari tidur malam ini 🌜",
];

export const listWordSleepNotificationEN: string[] = [
    "It’s already late, time to sleep so you’re fresh tomorrow ✨",
    "Let’s hit the bed, stop scrolling your phone too much 📱😆",
    "Want to be productive tomorrow? Sleep now to stay fit 💪",
    "Remember, enough sleep = full energy for tomorrow’s routine ⚡",
    "Turn off the screen, grab your blanket, it’s bedtime 🛌",
    "Staying up late kills productivity, go to bed early 😴",
    "Your body needs rest, don’t push it too hard 🙌",
    "Good sleep means better mood tomorrow 🎶",
    "Don’t lose to FOMO, sleep first for your health 🌙",
    "You did great today, reward yourself with quality sleep 💤",
    "Stop working/playing now, recharge through sleep 🔋",
    "Sleeping early makes waking up easier ⏰",
    "Lots of exciting things await tomorrow, get some sleep ✨",
    "The phone can wait, but your body needs rest now 🛑",
    "Good night, hope you have sweet dreams 🌌",
    "Time to rest, enough sleep makes your brain sharper 🧠",
    "Sleep is part of self-care, don’t skip it 💕",
    "Sleep is calling, don’t ignore it 😆",
    "Planning to follow your routine tomorrow? Start with sleep 🌟",
    "Good night, tomorrow’s energy starts with tonight’s sleep 🌜",
];

export const listWordSleepNotificationMY: string[] = [
    "Dah malam ni, masa untuk tidur supaya esok segar ✨",
    "Jom tidur dulu, jangan asyik scroll HP 📱😆",
    "Esok nak jadi produktif kan? Tidur sekarang supaya cergas 💪",
    "Ingat, tidur cukup = tenaga penuh untuk rutin esok ⚡",
    "Tutup skrin, tarik selimut, masa untuk tidur 🛌",
    "Tidur lewat musuh produktiviti, jom tidur awal 😴",
    "Badan anda perlukan rehat, jangan paksa sangat 🙌",
    "Tidur yang cukup buat mood esok lebih baik 🎶",
    "Jangan kalah dengan FOMO, tidur dulu untuk kesihatan 🌙",
    "Anda dah hebat hari ini, ganjaran untuk diri = tidur lena 💤",
    "Berhenti kerja / main sekarang, cas semula tenaga dengan tidur 🔋",
    "Tidur awal mudahkan bangun pagi ⏰",
    "Banyak perkara menarik menanti esok, jom tidur dulu ✨",
    "Telefon boleh tunggu, tapi badan perlukan rehat sekarang 🛑",
    "Selamat malam, semoga mimpi indah 🌌",
    "Jom rehat, tidur cukup buat otak lebih tajam esok 🧠",
    "Tidur adalah sebahagian daripada self-care, jangan skip 💕",
    "Waktu tidur dah tiba, jangan abaikan 😆",
    "Esok nak buat rutin positif? Tidur dulu lah 🌟",
    "Selamat malam, tenaga esok bermula dari tidur malam ni 🌜",
];