import ProfileMenu from '@/layouts/profile-menu'
import NotifikasiMenu from './notifikasi-menu'

export default function HeaderMenuRight() {
  return (
    <div className="grid grid-cols-1 items-center text-gray-dark shrink-0 gap-2 ms-auto xs:gap-3 xl:gap-4">
      {/* <NotifikasiMenu /> */}
      <ProfileMenu />
    </div>
  )
}
