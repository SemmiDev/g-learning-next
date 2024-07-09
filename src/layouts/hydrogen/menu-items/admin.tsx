import { routes } from '@/config/routes'
import { LuBook, LuBox, LuFileText, LuHome, LuUser } from 'react-icons/lu'
import { MenuItemType } from '../sidebar-menu'

// Note: do not add href in the label object, it is rendering as label
export const menuItemsAdmin: MenuItemType[] = [
  {
    name: 'Dasbor',
    href: routes.dashboard,
    icon: <LuHome />,
  },
  {
    name: 'Daftar Instansi',
    href: routes.admin.daftarInstansi,
    icon: <LuBox />,
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
    name: 'Manajemen Admin',
    href: routes.admin.manajemenAdmin,
    icon: <LuUser />,
  },
]
