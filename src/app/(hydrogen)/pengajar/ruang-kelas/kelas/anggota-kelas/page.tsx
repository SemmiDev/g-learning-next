import Card from '@/components/ui/card'
import CardSeparator from '@/components/ui/card-separator'
import Image from 'next/image'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Button, Checkbox, Input, Text, Title } from 'rizzui'
import imagePhoto from '@public/images/photo.png'
import Pagination from '@/components/ui/pagination'

export default function AnggotaKelasPage() {
  return (
    <div className="flex flex-wrap items-start space-y-8 mt-8 lg:space-x-6 lg:space-y-0">
      <Card className="w-full lg:w-7/12 p-0">
        <div className="p-2">
          <Title as="h6" className="font-semibold leading-4 ">
            Anggota Kelas
          </Title>
          <Text className="text-xs mt-1">
            List mahasiswa yang bergabung di dalam kelas
          </Text>
        </div>
        <CardSeparator />
        <div className="flex justify-between p-2">
          <Input
            size="sm"
            type="search"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            placeholder="Cari Anggota Kelas"
            className="w-72 sm:w-96"
          />
          <Button size="sm">Undang Anggota</Button>
        </div>
        <CardSeparator />
        <div className="flex flex-col">
          {[...Array(10)].map((val, idx) => {
            return (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3 p-2">
                    <Image
                      src={imagePhoto}
                      alt="profile"
                      className="w-10 h-10 rounded-md"
                    />
                    <div className="flex flex-col justify-center">
                      <Text className="text-sm text-gray-dark font-semibold">
                        Annitsa Bestweden
                      </Text>
                      <Text className="text-2xs text-gray-lighter font-medium mt-0.5">
                        email@namaweb.com
                      </Text>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="m-2 hover:text-red-500 hover:border-red-500"
                  >
                    Keluarkan
                  </Button>
                </div>
                <CardSeparator />
              </>
            )
          })}
        </div>
        <div className="flex justify-between items-center p-2">
          <Text className="text-2xs text-gray-lighter">
            Menampilkan 10 dari 30 data
          </Text>
          <Pagination total={30} />
        </div>
      </Card>
      <Card className="w-full lg:w-4/12 p-0">
        <div className="flex flex-col p-2">
          <Title as="h6" className="font-semibold leading-4 ">
            Permintaan Bergabung
          </Title>
          <Checkbox
            size="sm"
            label="Terima semua permintaan"
            className="text-gray-lighter text-xs w-fit mt-2"
            iconClassName="h-3 top-1"
          />
        </div>
        <CardSeparator />
        <div className="flex flex-col space-y-2 p-2">
          {[...Array(4)].map((val, idx) => {
            return (
              <div key={idx} className="flex space-x-2">
                <Checkbox size="sm" iconClassName="h-3 top-1" />
                <Image
                  src={imagePhoto}
                  alt="profile"
                  className="w-[38px] h-[38px] rounded-md"
                />
                <div className="flex flex-col">
                  <Text className="text-sm text-gray-dark font-semibold">
                    Annitsa Bestweden
                  </Text>
                  <Text className="text-2xs text-gray-lighter font-medium">
                    email@namaweb.com
                  </Text>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm">Terima</Button>
                    <Button size="sm" color="danger">
                      Tolak
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <CardSeparator />
        <div className="p-2">
          <Button size="sm" className="w-full">
            Konfirmasi
          </Button>
        </div>
      </Card>
    </div>
  )
}
