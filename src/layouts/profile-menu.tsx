'use client'

import { Button, Text, Thumbnail, Title } from '@/components/ui'
import { publicRoutes, routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import cn from '@/utils/class-names'
import { useQueryClient } from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Popover } from 'rizzui'

export default function ProfileMenu({
  buttonClassName,
}: {
  buttonClassName?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { name, image } = useSessionPengguna()
  // const { data: session } = useSession()
  // const user = session?.user

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Thumbnail
            src={image}
            alt="foto profil"
            size={40}
            avatar={name ?? ''}
            rounded="full"
          />
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </Popover>
  )
}

const linkProfiles = {
  Admin: routes.admin.profile,
  Pengguna: routes.pengguna.profile,
  Pengajar: routes.pengajar.profile,
  Peserta: routes.peserta.profile,
}

function DropdownMenu() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const level = user?.level

  const logout = async () => {
    await signOut({ redirect: false })
    queryClient.invalidateQueries()
    router.replace(publicRoutes.login)
  }

  const menuItems = []

  const linkProfile =
    level && level in linkProfiles
      ? linkProfiles[level as keyof typeof linkProfiles]
      : null

  if (linkProfile) {
    menuItems.push({
      name: 'Profil Saya',
      href: linkProfile,
    })
  }

  return (
    <div className="min-w-64 text-left rtl:text-right">
      <div className="flex items-center px-6 pb-5 pt-6">
        <div
          className="cursor-pointer"
          onClick={async () => {
            await navigator.clipboard.writeText(session?.jwt ?? '')
            toast.success('Token disalin ke clipboard')
          }}
        >
          <Thumbnail
            src={user?.image || undefined}
            alt="foto profil"
            size={40}
            avatar={user?.name ?? ''}
            rounded="full"
          />
        </div>
        <div className="ms-3">
          <Title as="h6" weight="semibold">
            {user?.name}
          </Title>
          <Text>{user?.username}</Text>
        </div>
      </div>
      {menuItems.length > 0 && (
        <div className="grid font-medium text-gray border-t border-gray-300 p-3.5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center rounded-md px-2.5 py-2 my-0.5 hover:bg-gray-50 focus:outline-none hover:dark:bg-gray-50/50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
      <div className="border-t border-gray-300 p-3.5">
        <Button
          variant="text"
          color="danger"
          className="h-auto w-full justify-start font-medium outline-none px-2.5 py-2 hover:bg-gray-50 focus-within:text-gray focus-visible:ring-0"
          onClick={() => logout()}
        >
          Keluar
        </Button>
      </div>
    </div>
  )
}
