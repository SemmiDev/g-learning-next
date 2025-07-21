export const authRoutes = {
  login: '/login',
  daftar: '/daftar',
  lupaPassword: '/lupa-password',
  verifikasiEmail: '/verifikasi-email',
  resetPassword: '/reset-password',
}

export const publicRoutes = {
  ...authRoutes,
  help: '/bantuan',
  term: '/ketentuan-layanan',
  privacyPolicy: '/kebijakan-privasi',
  logout: '/logout',
  autoLogin: '/auto-login',
}

export const penggunaRoutes = {
  profile: '/pengguna/profil',
  lengkapiProfil: '/pengguna/lengkapi-profil',
  pemberitahuan: '/pengguna/pemberitahuan',
  temukanKelas: '/pengguna/temukan-kelas',
  ruangKelas: {
    default: '/pengguna/ruang-kelas',
    dikelola: {
      default: '/pengguna/ruang-kelas/dikelola',
      akademik: '/pengguna/ruang-kelas/dikelola/akademik',
      umum: '/pengguna/ruang-kelas/dikelola/umum',
    },
    diikuti: {
      default: '/pengguna/ruang-kelas/diikuti',
      akademik: '/pengguna/ruang-kelas/diikuti/akademik',
      umum: '/pengguna/ruang-kelas/diikuti/umum',
    },
  },
  bankMateri: '/pengguna/bank-materi',
  bankSoal: '/pengguna/bank-soal',
  ruangKursus: {
    instruktur: '/pengguna/ruang-kursus/instruktur',
    peserta: '/pengguna/ruang-kursus/peserta',
  },
  transaksi: '/pengguna/transaksi',
  pustakaMedia: '/pengguna/pustaka-media',
  obrolanAI: '/pengguna/obrolan-ai',
  googleDrive: '/pengguna/google-drive',
}

export const adminRoutes = {
  profile: '/admin/profil',
  pemberitahuan: '/admin/pemberitahuan',
  listInstansi: '/admin/instansi',
  listPengguna: '/admin/pengguna',
  paketInstansi: '/admin/paket-instansi',
  paketPengguna: '/admin/paket-pengguna',
  tagihanInstansi: '/admin/tagihan/instansi',
  tagihanPengguna: '/admin/tagihan/pengguna',
  manajemenAdmin: '/admin/manajemen-admin',
  manajemenKnowledge: '/admin/manajemen-knowledge',
}

export const instansiRoutes = {
  pemberitahuan: '/instansi/pemberitahuan',
  profile: '/instansi/profil',
  profilePengguna: '/instansi/profil/pengguna',
  profileRiwayatPembayaran: '/instansi/profil/riwayat-pembayaran',
  profileSinkron: '/instansi/profil/sinkron',
  akademik: '/instansi/akademik',
  kelasAkademik: '/instansi/akademik/kelas',
}

export const prodiInstansiRoutes = {
  pemberitahuan: '/prodi-instansi/pemberitahuan',
  profile: '/prodi-instansi/profil',
  profileInstansi: '/prodi-instansi/profil-instansi',
  profileInstansiPengguna: '/prodi-instansi/profil-instansi/pengguna',
  akademik: '/prodi-instansi/akademik',
  kelasAkademik: '/prodi-instansi/akademik/kelas',
}

export const routes = {
  dashboard: '/',
  blank: '/blank',
  pengguna: penggunaRoutes,
  admin: adminRoutes,
  instansi: instansiRoutes,
  prodiInstansi: prodiInstansiRoutes,
}
