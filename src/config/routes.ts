export const authRoutes = {
  login: '/login',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
}

export const publicRoutes = {
  ...authRoutes,
  help: '/bantuan',
  term: '/ketentuan-layanan',
  privacyPolicy: '/kebijakan-privasi',
}

export const pengajarRoutes = {
  ruangKelas: '/pengajar/ruang-kelas',
  kelas: '/pengajar/ruang-kelas/kelas',
  bankMateri: '/pengajar/bank-materi',
  bankSoal: '/pengajar/bank-soal',
  ruangKursus: {
    instruktur: '/pengajar/ruang-kursus/instruktur',
    peserta: '/pengajar/ruang-kursus/peserta',
  },
}

export const routes = {
  dashboard: '/',
  blank: '/blank',
  profile: '/profile',
  ...pengajarRoutes,
}
