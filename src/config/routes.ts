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
  profile: '/pengajar/profil',
  ruangKelas: '/pengajar/ruang-kelas',
  kelas: '/pengajar/ruang-kelas/kelas',
  bankMateri: '/pengajar/bank-materi',
  bankSoal: '/pengajar/bank-soal',
  ruangKursus: {
    instruktur: '/pengajar/ruang-kursus/instruktur',
    peserta: '/pengajar/ruang-kursus/peserta',
  },
  transaksi: '/pengajar/transaksi',
  pustakaMedia: '/pengajar/pustaka-media',
}

export const pesertaRoutes = {
  profile: '/peserta/profil',
  ruangKelas: '/peserta/ruang-kelas',
  kelas: '/peserta/ruang-kelas/kelas',
}

export const adminRoutes = {
  profile: '/admin/profil',
  listInstansi: '/admin/instansi',
  paketInstansi: '/admin/paket-instansi',
  paketPengguna: '/admin/paket-pengguna',
  manajemenAdmin: '/admin/manajemen-admin',
}

export const routes = {
  dashboard: '/',
  blank: '/blank',
  pengajar: pengajarRoutes,
  peserta: pesertaRoutes,
  admin: adminRoutes,
}
