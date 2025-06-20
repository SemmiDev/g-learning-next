import { routes } from '@/config/routes'
import {
  LuBook,
  LuBox,
  LuCpu,
  LuFileText,
  LuHouse,
  LuSave,
} from 'react-icons/lu'
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
    href: '#',
    icon: <LuBox />,
    dropdownItems: [
      {
        name: 'Kelas yang Dikelola',
        href: routes.pengguna.ruangKelas.dikelola.default,
      },
      {
        name: 'Kelas yang Diikuti',
        href: routes.pengguna.ruangKelas.diikuti.default,
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
  {
    name: 'SmartCampus AI',
    href: routes.pengguna.obrolanAI,
    icon: <LuCpu />,
  },
  {
    name: 'Pustaka Media',
    href: routes.pengguna.pustakaMedia,
    icon: <LuSave />,
  },
]
