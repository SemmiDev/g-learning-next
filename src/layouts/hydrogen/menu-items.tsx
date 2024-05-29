import { routes } from '@/config/routes'
import { ReactNode } from 'react'
import { BiHome, BiSolidBookBookmark } from 'react-icons/bi'
import { BsBox } from 'react-icons/bs'
import { LuFileText, LuPackage } from 'react-icons/lu'

type MenuItemType = {
  name: string
  href?: string
  icon?: ReactNode
  badge?: string
  dropdownItems?: {
    name: string
    href: string
    icon?: ReactNode
    badge?: string
  }[]
}

// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItemType[] = [
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
    href: routes.ruangKelas,
    icon: <BsBox />,
  },
  {
    name: 'Bank Materi',
    href: routes.bankMateri,
    icon: <BiSolidBookBookmark />,
  },
  {
    name: 'Bank Soal',
    href: routes.bankSoal,
    icon: <LuFileText />,
  },
  {
    name: 'Umum',
  },
  {
    name: 'Ruang Kursus',
    href: routes.bankSoal,
    icon: <LuPackage />,
    dropdownItems: [
      {
        name: 'Instruktur',
        href: routes.ruangKursus.instruktur,
      },
      {
        name: 'Peserta',
        href: routes.ruangKursus.peserta,
      },
    ],
  },
]
