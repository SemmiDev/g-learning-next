import { routes } from '@/config/routes'
import { LuBox, LuHouse } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsPenggunaAkademik: MenuItemType[] = [
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
        href: routes.penggunaAkademik.ruangKelasDikelola,
      },
      {
        name: 'Kelas yang Diikuti',
        href: routes.penggunaAkademik.ruangKelasDiikuti,
      },
    ],
  },
]
