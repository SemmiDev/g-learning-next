import { ActionIcon, Badge } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import Link from 'next/link'
import { BiSolidBellRing } from 'react-icons/bi'

const links = {
  Admin: routes.admin.pemberitahuan,
  Instansi: routes.instansi.pemberitahuan,
  Pengguna: routes.pengguna.pemberitahuan,
}

export default function NotifikasiMenu() {
  const { level } = useSessionPengguna()

  const hasNotif = true

  const link =
    level && level in links ? links[level as keyof typeof links] : null

  if (!link) return null

  return (
    <Link href={link}>
      <ActionIcon
        aria-label="Notification"
        variant="text"
        className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
      >
        <BiSolidBellRing size={18} />
        {hasNotif && (
          <Badge
            renderAsDot
            color="danger"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        )}
      </ActionIcon>
    </Link>
  )
}
