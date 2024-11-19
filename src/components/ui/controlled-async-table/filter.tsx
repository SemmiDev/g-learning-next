'use client'

import { useMedia } from '@/hooks/use-media'
import cn from '@/utils/class-names'
import React, { useState } from 'react'
import {
  PiFunnel,
  PiFunnelX,
  PiMagnifyingGlassBold,
  PiXBold,
} from 'react-icons/pi'
import ActionIcon from '../button/action-icon'
import Button from '../button/button'
import Drawer from '../drawer'
import Input from '../input/input'
import Title from '../text/title'

function FilterDrawerView({
  isOpen,
  drawerTitle,
  setOpenDrawer,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string
  hasSearched?: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  isOpen?: boolean
}>) {
  return (
    <Drawer
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
    >
      <div className="flex h-full flex-col p-5">
        <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-5 pb-4">
          <Title as="h5">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={'Tutup Filter'}
            onClick={() => setOpenDrawer(false)}
          >
            <PiXBold className="size-4" />
          </ActionIcon>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          className="mt-5 w-full text-sm"
          variant="outline-colorful"
          onClick={() => setOpenDrawer(false)}
        >
          Tutup
        </Button>
      </div>
    </Drawer>
  )
}

export type TableFilterProps = {
  searchTerm: string
  searchSize?: 'sm' | 'md' | 'lg' | 'xl'
  searchPlaceholder?: string
  searchClassName?: string
  onSearchClear: () => void
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  drawerTitle?: string
  hasSearched?: boolean
  showSearchOnTheRight?: boolean
  enableDrawerFilter?: boolean
  menu?: React.ReactNode
  className?: string
}

export default function TableFilter({
  searchTerm,
  searchSize,
  searchPlaceholder = 'Ketik pencarian di sini...',
  searchClassName,
  onSearchClear,
  onSearchChange,
  drawerTitle = 'Filter Data',
  hasSearched,
  enableDrawerFilter = true,
  showSearchOnTheRight = false,
  menu,
  children,
  className,
}: TableFilterProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false)

  const [showFilters, setShowFilters] = useState(true)
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div
      className={cn(
        'table-filter flex items-center justify-between px-2.5 py-3',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-4">
        {!showSearchOnTheRight ? (
          <Input
            type="search"
            size={searchSize}
            placeholder={searchPlaceholder}
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            clearable
            prefix={
              <PiMagnifyingGlassBold size={20} className="text-gray-lighter" />
            }
            className={cn('w-72 sm:w-96', searchClassName)}
          />
        ) : null}

        {showSearchOnTheRight && enableDrawerFilter ? (
          <>{menu ? menu : null}</>
        ) : null}

        {children && (
          <>
            {isMediumScreen || enableDrawerFilter ? (
              <FilterDrawerView
                isOpen={openDrawer}
                setOpenDrawer={setOpenDrawer}
                drawerTitle={drawerTitle}
                hasSearched={hasSearched}
              >
                {children}
              </FilterDrawerView>
            ) : (
              <>{showFilters ? children : null}</>
            )}
          </>
        )}
      </div>

      <div className="ms-4 flex flex-shrink-0 items-center">
        {showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            className="me-2.5"
          />
        ) : null}

        {children ? (
          <Button
            {...(isMediumScreen || enableDrawerFilter
              ? {
                  onClick: () => {
                    setOpenDrawer(() => !openDrawer)
                  },
                }
              : { onClick: () => setShowFilters(() => !showFilters) })}
            variant={'outline'}
            className={cn(
              'me-2.5 h-9 px-2.5',
              !(isMediumScreen || enableDrawerFilter) &&
                showFilters &&
                'border-dashed border-gray-700'
            )}
          >
            {!(isMediumScreen || enableDrawerFilter) && showFilters ? (
              <PiFunnelX size={18} strokeWidth={1.7} />
            ) : (
              <PiFunnel size={18} strokeWidth={1.7} />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
