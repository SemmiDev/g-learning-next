import { routes } from '@/config/routes'
import {
  LuBook,
  LuBox,
  LuCreditCard,
  LuFileText,
  LuHome,
  LuUser,
  LuUsers,
} from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsAdmin: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHome />,
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
    name: 'Pembayaran Instansi',
    href: routes.admin.pembayaranInstansi,
    icon: <LuCreditCard />,
  },
  {
    name: 'Manajemen Admin',
    href: routes.admin.manajemenAdmin,
    icon: <LuUser />,
  },
]
