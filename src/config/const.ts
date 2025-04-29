export const DEFAULT_DATA_PER_PAGE = 10

export const PILIHAN_JAWABAN = ['A', 'B', 'C', 'D', 'E'] as const

export const NAMA_BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
] as const

export const NAMA_HARI = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
] as const

export const ZONA_WAKTU = ['WIB', 'WITA', 'WIT'] as const

export const GOOGLE_DRIVE_SCOPES =
  process.env.NEXT_PUBLIC_GOOGLE_DRIVE_PICKER === 'true'
    ? [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive.file',
      ]
    : [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.scripts',
      ]
