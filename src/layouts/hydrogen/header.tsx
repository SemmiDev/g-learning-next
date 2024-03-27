'use client'

import Link from 'next/link'
import HamburgerButton from '@/layouts/hamburger-button'
import Sidebar from '@/layouts/hydrogen/sidebar'
import HeaderMenuRight from '@/layouts/header-menu-right'
import StickyHeader from '@/layouts/sticky-header'
import Image from 'next/image'
import logo from '@public/logo-short.svg'
import { routes } from '@/config/routes'

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8  4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
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
  )
}
