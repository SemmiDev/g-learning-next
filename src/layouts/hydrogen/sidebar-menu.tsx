import { Title } from '@/components/ui'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'
import { switchCaseObject } from '@/utils/switch-case'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
import { PiCaretDownBold } from 'react-icons/pi'
import { Collapse } from 'rizzui'
import { menuItemsAdmin } from './menu-items/admin'
import { menuItemsInstansi } from './menu-items/instansi'
import { menuItemsPengajar } from './menu-items/pengajar'
import { menuItemsPengguna } from './menu-items/pengguna'
import { menuItemsPeserta } from './menu-items/peserta'
import StatusBadge from './status-badge'
import { menuItemsPenggunaAkademik } from './menu-items/pengguna-akademik'

export type MenuDropdownItemType = {
  name: string
  href: string
  icon?: ReactNode
  badge?: string
}

export type MenuItemType = {
  name: string
  href?: string
  icon?: ReactNode
  badge?: string
  dropdownItems?: MenuDropdownItemType[]
}

export function SidebarMenu() {
  const { setOpenSidebarMenu } = useGlobalStore()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { level } = useSessionPengguna()

  const menuItems: MenuItemType[] = switchCaseObject(
    level,
    {
      Admin: menuItemsAdmin,
      Instansi: menuItemsInstansi,
      Pengguna: menuItemsPengguna,
      Pengajar: menuItemsPengajar,
      Peserta: menuItemsPeserta,
      PenggunaAkademik: menuItemsPenggunaAkademik,
    },
    []
  )

  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems.map((item, index) => {
        const link = item?.href
        const isActive =
          !!link &&
          ((link === '/' && pathname === link) ||
            (link !== '/' && pathname.startsWith(link)))
        const pathnameExistInDropdowns = (item?.dropdownItems ?? []).filter(
          (dropdownItem) => {
            const childLink = dropdownItem.href

            return (
              !!childLink &&
              (pathname === childLink || pathname.startsWith(childLink))
            )
          }
        )

        const isDropdownOpen =
          Boolean(pathnameExistInDropdowns?.length) ||
          pathname === link ||
          pathname.startsWith(link || '#')

        return (
          <Fragment key={`${item.name}-${index}`}>
            {item?.href ? (
              <>
                {item?.dropdownItems ? (
                  <Collapse
                    defaultOpen={isDropdownOpen}
                    header={({ open, toggle }) => (
                      <div
                        onClick={toggle}
                        className={cn(
                          'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                          isDropdownOpen
                            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-muted/40 dark:text-gray-700/90 dark:hover:text-gray-700'
                        )}
                      >
                        <span className="flex items-center">
                          {item?.icon && (
                            <span
                              className={cn(
                                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                isDropdownOpen
                                  ? 'text-primary'
                                  : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                              )}
                            >
                              {item?.icon}
                            </span>
                          )}
                          {item.name}
                        </span>

                        <PiCaretDownBold
                          strokeWidth={3}
                          className={cn(
                            'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                            open && 'rotate-0 rtl:rotate-0'
                          )}
                        />
                      </div>
                    )}
                  >
                    {item?.dropdownItems?.map((dropdownItem, index) => {
                      const childLink = dropdownItem?.href
                      const isChildActive =
                        pathname === childLink ||
                        pathname.startsWith(childLink) ||
                        childLink === `${pathname}?${searchParams.toString()}`

                      return (
                        <Link
                          key={dropdownItem?.name + index}
                          href={dropdownItem?.href}
                          className={cn(
                            'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                            isChildActive
                              ? 'text-primary'
                              : 'text-gray-500 transition-colors duration-200 hover:bg-muted/40 hover:text-gray-dark'
                          )}
                          onClick={() => setOpenSidebarMenu(false)}
                        >
                          <div className="flex items-center truncate">
                            <span
                              className={cn(
                                'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                isChildActive
                                  ? 'bg-primary ring-[1px] ring-primary'
                                  : 'opacity-40'
                              )}
                            />{' '}
                            <span className="truncate">
                              {dropdownItem?.name}
                            </span>
                          </div>
                          {dropdownItem?.badge?.length ? (
                            <StatusBadge status={dropdownItem?.badge} />
                          ) : null}
                        </Link>
                      )
                    })}
                  </Collapse>
                ) : (
                  <Link
                    href={item?.href}
                    className={cn(
                      'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                      isActive
                        ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                        : 'text-gray-700 transition-colors duration-200 hover:bg-muted/40 hover:text-gray-dark dark:text-gray-700/90'
                    )}
                    onClick={() => setOpenSidebarMenu(false)}
                  >
                    <div className="flex items-center truncate">
                      {item?.icon && (
                        <span
                          className={cn(
                            'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                            isActive
                              ? 'text-primary'
                              : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                          )}
                        >
                          {item?.icon}
                        </span>
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item?.badge?.length ? (
                      <StatusBadge status={item?.badge} />
                    ) : null}
                  </Link>
                )}
              </>
            ) : (
              <Title
                as="h6"
                className={cn(
                  'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest 2xl:px-8',
                  index !== 0 && 'mt-6 3xl:mt-7'
                )}
              >
                {item.name}
              </Title>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
