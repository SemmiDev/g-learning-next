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
}

export const pengajarRoutes = {
  profile: '/pengajar/profil',
  pemberitahuan: '/pengajar/pemberitahuan',
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
  pemberitahuan: '/peserta/pemberitahuan',
  ruangKelas: '/peserta/ruang-kelas',
  kelas: '/peserta/ruang-kelas/kelas',
}

export const penggunaRoutes = {
  profile: '/pengguna/profil',
  lengkapiProfil: '/pengguna/lengkapi-profil',
  pemberitahuan: '/pengguna/pemberitahuan',
  ruangKelas: '/pengguna/ruang-kelas',
  ruangKelasDikelola: '/pengguna/ruang-kelas?kategori=dikelola',
  ruangKelasDiikuti: '/pengguna/ruang-kelas?kategori=diikuti',
  bankMateri: '/pengguna/bank-materi',
  bankSoal: '/pengguna/bank-soal',
  ruangKursus: {
    instruktur: '/pengguna/ruang-kursus/instruktur',
    peserta: '/pengguna/ruang-kursus/peserta',
  },
  transaksi: '/pengguna/transaksi',
  pustakaMedia: '/pengguna/pustaka-media',
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
}

export const instansiRoutes = {
  pemberitahuan: '/instansi/pemberitahuan',
  profile: '/instansi/profil',
  profilePengguna: '/instansi/profil/pengguna',
  profileRiwayatPembayaran: '/instansi/profil/riwayat-pembayaran',
  profileSinkron: '/instansi/profil/sinkron',
}

export const routes = {
  dashboard: '/',
  blank: '/blank',
  pengajar: pengajarRoutes,
  peserta: pesertaRoutes,
  pengguna: penggunaRoutes,
  admin: adminRoutes,
  instansi: instansiRoutes,
}
