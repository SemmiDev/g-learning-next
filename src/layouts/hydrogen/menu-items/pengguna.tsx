import { routes } from '@/config/routes'
import {
  LuBook,
  LuBox,
  LuFileText,
  LuHome,
  LuPackage,
  LuSave,
} from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsPengguna: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHome />,
  },
  {
    name: 'Akademik',
  },
  {
    name: 'Ruang Kelas',
    href: routes.pengguna.ruangKelas,
    icon: <LuBox />,
  },
  {
    name: 'Bank Materi',
    href: routes.pengguna.bankMateri,
    icon: <LuBook />,
  },
  {
    name: 'Bank Soal',
    href: routes.pengguna.bankSoal,
    icon: <LuFileText />,
  },
  {
    name: 'Umum',
  },
  {
    name: 'Ruang Kursus',
    href: routes.pengguna.bankSoal,
    icon: <LuPackage />,
    dropdownItems: [
      {
        name: 'Instruktur',
        href: routes.pengguna.ruangKursus.instruktur,
      },
      {
        name: 'Peserta',
        href: routes.pengguna.ruangKursus.peserta,
      },
    ],
  },
  {
    name: 'Pustaka Media',
    href: routes.pengguna.pustakaMedia,
    icon: <LuSave />,
  },
]
