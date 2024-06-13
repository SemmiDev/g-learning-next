import { routes } from '@/config/routes'
import { BiHome } from 'react-icons/bi'
import { BsBox } from 'react-icons/bs'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsPeserta: MenuItemType[] = [
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
    href: routes.peserta.ruangKelas,
    icon: <BsBox />,
  },
]
