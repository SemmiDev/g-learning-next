import { routes } from '@/config/routes'
import { ReactNode } from 'react'
import { BiHome } from 'react-icons/bi'
import { BsBox } from 'react-icons/bs'
import { MdOutlineInsertPageBreak } from 'react-icons/md'

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
    name: 'Overview',
  },
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <BiHome />,
  },
  {
    name: 'Blank Page',
    href: routes.blank,
    icon: <MdOutlineInsertPageBreak />,
  },
  {
    name: 'Ruang Kelas',
    href: routes.ruangKelas,
    icon: <BsBox />,
  },
]
