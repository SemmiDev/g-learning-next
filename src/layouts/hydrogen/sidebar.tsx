'use client'

import { ActionIcon } from '@/components/ui'
import { SidebarMenu } from '@/layouts/hydrogen/sidebar-menu'
import { useGlobalStore } from '@/stores/global'
import { cn } from '@/utils/class-names'
import logo from '@public/logo.svg'
import Image from 'next/image'
import { MdOutlineClose } from 'react-icons/md'
import SimpleBar from 'simplebar-react'

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const { setOpenSidebarMenu } = useGlobalStore()

  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white 2xl:w-72 dark:bg-gray-100/50',
        className
      )}
    >
      <div className="flex justify-between gap-x-2 sticky top-0 z-40 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
        <div aria-label="Site Logo" className="text-gray hover:text-gray-dark">
          <Image src={logo} alt="logo" priority />
        </div>
        <ActionIcon
          size="sm"
          variant="text"
          color="gray"
          className="xs:hidden"
          onClick={() => setOpenSidebarMenu(false)}
        >
          <MdOutlineClose className="size-[1.125rem]" />
        </ActionIcon>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu />
      </SimpleBar>
    </aside>
  )
}
