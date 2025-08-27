import { routes } from '@/config/routes'
import { LuBook, LuBox, LuHouse } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsFakultasInstansi: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHouse />,
  },
  {
    name: 'Profil Instansi',
    href: routes.fakultasInstansi.profileInstansi,
    icon: <LuBox />,
  },
  {
    name: 'Akademik',
    href: routes.fakultasInstansi.akademik,
    icon: <LuBook />,
  },
]
