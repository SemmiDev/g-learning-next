import { routes } from '@/config/routes'
import { LuBook, LuBox, LuFileText, LuHouse, LuSave } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsPengguna: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHouse />,
  },
  {
    name: 'Pembelajaran',
  },
  {
    name: 'Ruang Kelas',
    href: routes.pengguna.ruangKelas,
    icon: <LuBox />,
    dropdownItems: [
      {
        name: 'Kelas yang Dikelola',
        href: routes.pengguna.ruangKelasDikelola,
      },
      {
        name: 'Kelas yang Diikuti',
        href: routes.pengguna.ruangKelasDiikuti,
      },
    ],
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
    name: 'Lainnya',
  },
  // {
  //   name: 'Ruang Kursus',
  //   href: '#',
  //   icon: <LuPackage />,
  //   dropdownItems: [
  //     {
  //       name: 'Instruktur',
  //       href: routes.pengguna.ruangKursus.instruktur,
  //     },
  //     {
  //       name: 'Peserta',
  //       href: routes.pengguna.ruangKursus.peserta,
  //     },
  //   ],
  // },
  {
    name: 'Pustaka Media',
    href: routes.pengguna.pustakaMedia,
    icon: <LuSave />,
  },
]
