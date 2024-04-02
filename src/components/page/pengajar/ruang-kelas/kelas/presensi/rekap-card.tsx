import Card from '@/components/ui/card'
import {
  BsCheck,
  BsChevronDown,
  BsFileEarmark,
  BsPencil,
  BsTrash,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import {
  Button as RizButton,
  Dropdown,
  Input,
  Text,
  Title,
  ActionIcon,
} from 'rizzui'
import RekapPresensiItem from './rekap-item'
import Pagination from '@/components/ui/pagination'
import Button from '@/components/ui/button'
import CardSeparator from '@/components/ui/card-separator'
import Image from 'next/image'
import imagePhoto from '@public/images/photo.png'

export default function RekapPresensiCard() {
  return (
    <Card className="col-span-3">
      <Title as="h4" className="text-[1.375rem] font-semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
              placeholder="Cari sesi belajar"
            />
            <Dropdown>
              <Dropdown.Trigger>
                <RizButton size="sm" variant="outline">
                  Terbaru <BsChevronDown className="ml-2 w-5" />
                </RizButton>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item className="justify-between">
                  <Text>Terbaru</Text> <BsCheck size={18} />
                </Dropdown.Item>
                <Dropdown.Item className="justify-between">
                  <Text>Terlawas</Text>
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
            <Text className="text-2xs text-gray-lighter">
              Menampilkan 10 dari 30 data
            </Text>
            <Pagination total={30} />
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <Card className="flex justify-between">
            <div>
              <Text className="text-base text-gray-dark font-semibold">
                Judul sesi absensi
              </Text>
              <Text className="text-sm text-gray-lighter font-medium">
                Keterangan singkat terkait sesi kelas
              </Text>
              <Text className="text-sm text-gray-dark font-medium mt-2">
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
            <Text className="text-base text-gray-dark font-semibold m-2">
              Daftar Hadir Peserta Kelas
            </Text>
            <CardSeparator />
            <div className="flex m-2">
              <Input
                size="sm"
                type="search"
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
                placeholder="Cari Nama"
                className="w-80"
              />
            </div>
            <div>
              {[...Array(10)].map((val, idx) => {
                return (
                  <>
                    <CardSeparator />
                    <div className="flex justify-between items-center px-3 py-2">
                      <div className="flex space-x-3">
                        <Image
                          src={imagePhoto}
                          alt="profile"
                          className="w-10 h-10 rounded-md"
                        />
                        <div className="flex flex-col">
                          <Text className="text-sm text-gray-dark font-semibold">
                            Annitsa Bestweden
                          </Text>
                          <Text className="text-2xs text-gray-lighter font-medium">
                            email@namaweb.com
                          </Text>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <ActionIcon size="sm" rounded="lg">
                          H
                        </ActionIcon>
                        <ActionIcon size="sm" rounded="lg" variant="outline">
                          I
                        </ActionIcon>
                        <ActionIcon size="sm" rounded="lg" variant="outline">
                          A
                        </ActionIcon>
                        <ActionIcon size="sm" rounded="lg" variant="outline">
                          S
                        </ActionIcon>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            <CardSeparator />
            <div className="flex justify-between items-center p-2">
              <Text className="text-2xs text-gray-lighter">
                Menampilkan 10 dari 20 data
              </Text>
              <Pagination total={20} />
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}
