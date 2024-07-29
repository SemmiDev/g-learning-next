import { routes } from '@/config/routes'
import { LuHome } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsInstansi: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHome />,
  },
]
