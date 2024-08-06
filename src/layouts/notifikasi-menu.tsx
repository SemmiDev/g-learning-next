import { ActionIcon, Badge } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { BiSolidBellRing } from 'react-icons/bi'

export default function NotifikasiMenu() {
  const { data: session } = useSession()

  const hasNotif = true

  const link =
    session?.level === 'Admin'
      ? routes.admin.pemberitahuan
      : session?.level === 'Instansi'
      ? routes.instansi.pemberitahuan
      : session?.level === 'Pengajar'
      ? routes.pengajar.pemberitahuan
      : session?.level === 'Peserta'
      ? routes.peserta.pemberitahuan
      : ''

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
