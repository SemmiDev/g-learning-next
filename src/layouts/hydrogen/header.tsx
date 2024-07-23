'use client'

import { routes } from '@/config/routes'
import HamburgerButton from '@/layouts/hamburger-button'
import HeaderMenuRight from '@/layouts/header-menu-right'
import Sidebar from '@/layouts/hydrogen/sidebar'
import StickyHeader from '@/layouts/sticky-header'
import logo from '@public/logo-short.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Drawer } from 'rizzui'

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8  4xl:px-10">
        <div className="flex w-full max-w-2xl items-center">
          <HamburgerButton onClick={() => setSidebarOpen(true)} />
          <Link
            href={routes.dashboard}
            aria-label="Site Logo"
            className="me-4 shrink-0 text-gray hover:text-gray-dark lg:me-5 xl:hidden"
          >
            <Image src={logo} alt="logo" height={20} />
          </Link>
        </div>

        <HeaderMenuRight />
      </StickyHeader>

      <Drawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        placement="left"
        customSize="320px"
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100"
        className="z-[9999]"
      >
        <Sidebar className="static w-full 2xl:w-full" />
      </Drawer>
    </>
  )
}
