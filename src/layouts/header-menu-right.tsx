import cn from '@/utils/class-names'
import ObrolanAiMenu from './header-menu-right-items/obrolan-ai-menu'
import ProfileMenu from './header-menu-right-items/profile-menu'

export default function HeaderMenuRight() {
  return (
    <div
      className={cn(
        'flex items-center text-gray-dark shrink-0 gap-2 ms-auto xs:gap-3 xl:gap-4'
      )}
    >
      <ObrolanAiMenu />

      {/* <NotifikasiMenu /> */}

      <ProfileMenu
        devMode={
          process.env.NODE_ENV === 'development' ||
          process.env.DEV_MODE === 'true'
        }
      />
    </div>
  )
}
