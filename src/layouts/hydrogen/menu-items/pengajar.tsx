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
export const menuItemsPengajar: MenuItemType[] = [
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
    href: routes.pengajar.ruangKelas,
    icon: <LuBox />,
  },
  {
    name: 'Bank Materi',
    href: routes.pengajar.bankMateri,
    icon: <LuBook />,
  },
  {
    name: 'Bank Soal',
    href: routes.pengajar.bankSoal,
    icon: <LuFileText />,
  },
  {
    name: 'Umum',
  },
  {
    name: 'Ruang Kursus',
    href: '#',
    icon: <LuPackage />,
    dropdownItems: [
      {
        name: 'Instruktur',
        href: routes.pengajar.ruangKursus.instruktur,
      },
      {
        name: 'Peserta',
        href: routes.pengajar.ruangKursus.peserta,
      },
    ],
  },
  {
    name: 'Pustaka Media',
    href: routes.pengajar.pustakaMedia,
    icon: <LuSave />,
  },
]
