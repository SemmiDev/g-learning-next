import { routes } from '@/config/routes'
import { LuBook, LuBox, LuHouse } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsInstansi: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHouse />,
  },
  {
    name: 'Profil Instansi',
    href: routes.instansi.profile,
    icon: <LuBox />,
  },
  {
    name: 'Akademik',
    href: routes.instansi.akademik,
    icon: <LuBook />,
  },
]
