'use client'

import { Button, CardSeparator, Input, Modal, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { FieldError } from 'rizzui'
import KelasButton, { KelasItemType } from './kelas-button'
import SelectedKelas from './selected-kelas'

export type KelasProps = {
  label?: string
  placeholder?: string
  value?: KelasItemType
  onChange?(val: KelasItemType | null): void
  multiple?: boolean
  error?: string
  errorClassName?: string
}

export default function Kelas({
  label,
  placeholder = 'Klik di sini untuk memilih kelas',
  value,
  onChange,
  error,
  errorClassName,
}: KelasProps) {
  const [show, setShow] = useState(false)
  const [size, setSize] = useState<'lg' | 'xl' | 'full'>('lg')
  const [checkedKelasId, setCheckedKelasId] = useState<string | null>(null)
  const [selectedKelas, setSelectedKelas] = useState<KelasItemType | null>(
    value ?? null
  )

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSize('full')
    } else if (window.innerWidth < 1280) {
      setSize('xl')
    } else {
      setSize('lg')
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  const doShow = () => {
    setShow(true)
  }

  const doHide = () => {
    setShow(false)
  }

  const doChange = (selected: KelasItemType | null) => {
    setSelectedKelas(selected)

    onChange && onChange(selected)
  }

  const dataKelas: KelasItemType[] = [
    {
      id: 'k1',
      program: 'Sistem Informasi',
      kelas: 'Kelas TI A',
      instansi: 'Nama Instansi',
    },
    {
      id: 'k2',
      program: 'Sistem Informasi',
      kelas: 'Kelas TI B',
      instansi: 'Nama Instansi',
    },
    {
      id: 'k3',
      program: 'Kalkulus',
      kelas: 'Kelas TI A',
      instansi: 'Nama Instansi',
    },
    {
      id: 'k4',
      program: 'Kalkulus',
      kelas: 'Kelas TI B',
      instansi: 'Nama Instansi',
    },
    {
      id: 'k5',
      program: 'Bahasa Pemrograman',
      kelas: 'Kelas TI A',
      instansi: 'Umum',
    },
  ]

  return (
    <>
      <div>
        {label && (
          <label className="text-gray-dark font-semibold mb-1.5 block">
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex flex-wrap items-center gap-2 text-gray text-sm border border-muted cursor-pointer rounded-md transition duration-200 ring-[0.6px] ring-muted min-h-10 py-2 px-3 hover:border-primary [&_.kelas-label]:hover:text-primary',
            {
              '!border-red [&.is-hover]:!border-red [&.is-focus]:!border-red !ring-red !bg-transparent':
                error,
            }
          )}
          onClick={() => {
            setCheckedKelasId(selectedKelas?.id ?? null)
            doShow()
          }}
        >
          {selectedKelas ? (
            <SelectedKelas
              kelas={selectedKelas}
              onOpenList={() => {
                doShow()
              }}
            />
          ) : (
            <Text size="sm" className="kelas text-gray-lighter">
              {placeholder}
            </Text>
          )}
        </div>

        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>

      <Modal
        title="Cari dan Pilih Kelas"
        size={size}
        isOpen={show}
        onClose={doHide}
      >
        <div className="flex flex-col justify-between min-h-[calc(100vh-57px)] lg:min-h-full">
          <div className="flex flex-col min-h-[400px]">
            <div className="flex justify-between space-x-2 border-b border-muted p-3">
              <Input
                size="sm"
                type="search"
                placeholder="Cari Kelas"
                clearable={true}
                className="flex-1"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
              />
            </div>
            <div className="flex flex-col">
              {dataKelas.map((kelas, idx) => (
                <KelasButton
                  kelas={kelas}
                  checked={checkedKelasId === kelas.id}
                  onChange={() => {
                    setCheckedKelasId(kelas.id)
                  }}
                  key={idx}
                />
              ))}
            </div>
          </div>
          <div>
            <CardSeparator />
            <div className="flex justify-end space-x-2 p-3">
              <Button
                size="sm"
                className="w-36"
                onClick={() => {
                  const selected = dataKelas.find(
                    (val) => val.id === checkedKelasId
                  )
                  doChange(selected ?? null)
                  doHide()
                }}
              >
                Pilih Kelas
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-36"
                onClick={doHide}
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
