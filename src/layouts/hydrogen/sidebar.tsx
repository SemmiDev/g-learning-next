'use client'

import SimpleBar from '@/components/ui/simplebar'
import { routes } from '@/config/routes'
import { SidebarMenu } from '@/layouts/hydrogen/sidebar-menu'
import { cn } from '@/utils/class-names'
import logo from '@public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white 2xl:w-72 dark:bg-gray-100/50',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6 dark:bg-gray-100/5">
        <Link
          href={routes.dashboard}
          aria-label="Site Logo"
          className="text-gray hover:text-gray-dark"
        >
          <Image src={logo} alt="logo" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu />
      </SimpleBar>
    </aside>
  )
}
