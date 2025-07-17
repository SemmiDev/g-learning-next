import { routes } from '@/config/routes'
import {
  LuBook,
  LuBookText,
  LuBox,
  LuCreditCard,
  LuFileText,
  LuHouse,
  LuUser,
  LuUsers,
} from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsAdmin: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHouse />,
  },
  {
    name: 'List Instansi',
    href: routes.admin.listInstansi,
    icon: <LuBox />,
  },
  {
    name: 'List Pengguna',
    href: routes.admin.listPengguna,
    icon: <LuUsers />,
  },
  {
    name: 'Paket Instansi',
    href: routes.admin.paketInstansi,
    icon: <LuBook />,
  },
  {
    name: 'Paket Pengguna',
    href: routes.admin.paketPengguna,
    icon: <LuFileText />,
  },
  {
    name: 'Tagihan',
    href: '#',
    icon: <LuCreditCard />,
    dropdownItems: [
      {
        name: 'Instansi',
        href: routes.admin.tagihanInstansi,
      },
      {
        name: 'Pengguna',
        href: routes.admin.tagihanPengguna,
      },
    ],
  },
  {
    name: 'Manajemen Admin',
    href: routes.admin.manajemenAdmin,
    icon: <LuUser />,
  },
  {
    name: 'Manajemen Knowledge',
    href: routes.admin.manajemenKnowledge,
    icon: <LuBookText />,
  },
]
