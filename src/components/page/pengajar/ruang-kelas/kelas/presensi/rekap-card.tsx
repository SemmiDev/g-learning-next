import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  Pagination,
  Text,
  Title,
} from '@/components/ui'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { Fragment } from 'react'
import {
  BsCheck,
  BsChevronDown,
  BsFileEarmark,
  BsPencil,
  BsTrash,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import RekapPresensiItem from './rekap-item'

export default function RekapPresensiCard() {
  return (
    <Card className="col-span-3">
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              placeholder="Cari sesi belajar"
              clearable={true}
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
            />
            <Dropdown>
              <Dropdown.Trigger>
                <Button as="span" size="sm" variant="outline">
                  Terbaru <BsChevronDown className="ml-2 w-5" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item className="justify-between">
                  <Text size="sm">Terbaru</Text> <BsCheck size={18} />
                </Dropdown.Item>
                <Dropdown.Item className="justify-between">
                  <Text size="sm">Terlawas</Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card className="p-0 mt-2">
            {[...Array(10)].map((val, idx) => {
              return <RekapPresensiItem key={idx} active={idx === 0} />
            })}
          </Card>
          <div className="flex justify-between items-center p-2">
            <Text size="2xs" variant="lighter">
              Menampilkan 10 dari 30 data
            </Text>
            <Pagination total={30} />
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <Card className="flex justify-between">
            <div>
              <Text weight="semibold" variant="dark">
                Judul sesi absensi
              </Text>
              <Text size="sm" weight="medium" variant="lighter">
                Keterangan singkat terkait sesi kelas
              </Text>
              <Text size="sm" weight="medium" variant="dark" className="mt-2">
                Kamis, 29 februari 2024, 23:59 WIB
              </Text>
            </div>
            <div className="flex">
              <Button size="sm" color="success" variant="text">
                <BsFileEarmark className="mr-2" /> Export
              </Button>
              <Button size="sm" color="warning" variant="text">
                <BsPencil className="mr-2" /> Ubah
              </Button>
              <Button size="sm" color="danger" variant="text">
                <BsTrash className="mr-2" /> Hapus
              </Button>
            </div>
          </Card>
          <Card className="p-0 mt-4">
            <Text weight="semibold" variant="dark" className="p-2">
              Daftar Hadir Peserta Kelas
            </Text>
            <CardSeparator />
            <div className="flex p-2">
              <Input
                size="sm"
                type="search"
                placeholder="Cari Nama"
                clearable={true}
                className="w-80"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
              />
            </div>
            <div>
              {[...Array(10)].map((val, idx) => {
                return (
                  <Fragment key={idx}>
                    <CardSeparator />
                    <div className="flex justify-between items-center px-3 py-2">
                      <div className="flex space-x-3">
                        <Image
                          src={imagePhoto}
                          alt="profil"
                          className="w-10 h-10 rounded-md"
                        />
                        <div className="flex flex-col">
                          <Text size="sm" weight="semibold" variant="dark">
                            Annitsa Bestweden
                          </Text>
                          <Text size="2xs" weight="medium" variant="lighter">
                            email@namaweb.com
                          </Text>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <ActionIcon size="sm" rounded="lg">
                          <Text size="xs" weight="semibold">
                            H
                          </Text>
                        </ActionIcon>
                        <ActionIcon size="sm" rounded="lg" variant="outline">
                          <Text size="xs" weight="semibold">
                            I
                          </Text>
                        </ActionIcon>
                        <ActionIcon size="sm" rounded="lg" variant="outline">
                          <Text size="xs" weight="semibold">
                            S
                          </Text>
                        </ActionIcon>
                        <ActionIcon size="sm" rounded="lg" variant="outline">
                          <Text size="xs" weight="semibold">
                            A
                          </Text>
                        </ActionIcon>
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            </div>
            <CardSeparator />
            <div className="flex justify-between items-center p-2">
              <Text size="2xs" variant="lighter">
                Menampilkan 10 dari 30 data
              </Text>
              <Pagination total={20} />
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}
