import { Button, Title } from '@/components/ui'
import { metaObject, siteConfig } from '@/config/site.config'
import NotFoundImg from '@public/not-found.png'
import Image from 'next/image'
import Link from 'next/link'
import { PiHouseLineBold } from 'react-icons/pi'

export const metadata = {
  ...metaObject('404 - Not Found'),
}

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col bg-[#F8FAFC]">
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto text-center">
          <Image
            src={NotFoundImg}
            alt="not found"
            className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[290px] lg:mb-12 2xl:mb-16"
          />
          <Title
            as="h1"
            weight="bold"
            className="text-base leading-normal text-black lg:text-xl"
          >
            404 - Halaman tidak ditemukan
          </Title>
          <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-2 lg:text-base lg:leading-loose">
            Maaf, halaman yang anda cari tidak ditemukan. Silahkan periksa
            kembali alamat tujuan anda.
          </p>
          <Link href={'/'}>
            <Button as="span" color="primary" className="mt-8">
              <PiHouseLineBold className="mr-1.5 text-lg" />
              Kembali ke Dasbor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
