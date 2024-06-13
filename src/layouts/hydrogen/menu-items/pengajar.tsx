import { routes } from '@/config/routes'
import { BiHome, BiSolidBookBookmark } from 'react-icons/bi'
import { BsBox } from 'react-icons/bs'
import { LuFileText, LuPackage, LuSave } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsPengajar: MenuItemType[] = [
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <BiHome />,
  },
  {
    name: 'Akademik',
  },
  {
    name: 'Ruang Kelas',
    href: routes.pengajar.ruangKelas,
    icon: <BsBox />,
  },
  {
    name: 'Bank Materi',
    href: routes.pengajar.bankMateri,
    icon: <BiSolidBookBookmark />,
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
    href: routes.pengajar.bankSoal,
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
