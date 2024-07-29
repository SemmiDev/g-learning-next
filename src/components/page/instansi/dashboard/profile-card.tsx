import { ActionIcon, Card, Text, Title } from '@/components/ui'
import Image from 'next/image'
import logo from '@public/images/instansi-logo.png'
import background from '@public/images/instansi-background.png'
import { BsGear } from 'react-icons/bs'
import { ComponentType, ReactNode } from 'react'
import {
  LuAccessibility,
  LuCalendar,
  LuCreditCard,
  LuPackage,
} from 'react-icons/lu'
import { IconBaseProps, IconType } from 'react-icons/lib'
import cn from '@/utils/class-names'
import { angka, rupiah } from '@/utils/text'

export default function ProfileCard() {
  return (
    <Card className="flex flex-col p-0">
      <div
        className="flex flex-col items-center pt-4 pb-4"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <figure className="size-[150px] bg-white border border-muted rounded-md mb-2">
          <Image
            src={logo}
            alt="logo instansi"
            className="object-contain w-full h-full"
          />
        </figure>
        <Title size="1.5xl">UIN SUSKA RIAU</Title>
        <div className="flex items-center">
          <Text size="xs" weight="medium" variant="lighter" className="me-1">
            Tipe sinkron: Misca
          </Text>
          <ActionIcon size="sm" variant="outline" color="warning">
            <BsGear size={12} />
          </ActionIcon>
        </div>
      </div>
      <div className="flex space-x-3 p-2 mb-3">
        <ProfileItem
          Icon={LuPackage}
          label={'Jenis Paket\nyang digunakan'}
          value="Premium"
          variant="solid"
          color="blue"
          className="w-1/3"
        />
        <ProfileItem
          Icon={LuCalendar}
          label={'Tanggal Pembayaran\nSelanjutnya'}
          value="01/12/2024"
          variant="solid"
          color="green"
          className="w-1/3"
        />
        <ProfileItem
          Icon={LuCreditCard}
          label={'Biaya\nPaket'}
          value={rupiah(5000000)}
          variant="solid"
          color="red"
          className="w-1/3"
        />
      </div>
      <div className="flex space-x-3 p-2">
        <ProfileItem
          Icon={LuPackage}
          label={'Limit\nPengguna'}
          value={angka(10000)}
          variant="outline"
          color="blue"
          className="w-1/3"
        />
        <ProfileItem
          Icon={LuCalendar}
          label={'Limit\nPembukaan Kelas'}
          value={angka(5000)}
          variant="outline"
          color="green"
          className="w-1/3"
        />
        <ProfileItem
          Icon={LuCreditCard}
          label={'Limit Kelas\nTiap Pengajar'}
          value={angka(50)}
          variant="outline"
          color="red"
          className="w-1/3"
        />
      </div>
    </Card>
  )
}

function ProfileItem({
  Icon,
  label,
  value,
  color = 'blue',
  variant = 'solid',
  className,
}: {
  Icon: ComponentType<IconBaseProps>
  label: string
  value: string
  color?: 'blue' | 'green' | 'red'
  variant?: 'solid' | 'outline'
  className?: string
}) {
  const colors = {
    blue: '#3B82F6',
    green: '#00B929',
    red: '#F1416C',
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-md p-2',
        {
          'border border-dashed border-muted': variant === 'outline',
        },
        className
      )}
      style={{
        backgroundColor: variant === 'solid' ? colors[color] : undefined,
      }}
    >
      <Icon
        size={16}
        className="mb-1"
        style={{
          color: variant === 'solid' ? 'white' : colors[color],
        }}
      />
      <Text
        size="sm"
        weight="medium"
        className={cn(
          'mb-1',
          variant === 'solid' ? 'text-white' : 'text-gray-lighter'
        )}
      >
        {label.split('\n').map((val, idx) => (
          <>
            <span key={idx}>{val}</span>
            <br />
          </>
        ))}
      </Text>
      <Text
        size="1.5xl"
        weight="semibold"
        variant="dark"
        className={cn(variant === 'solid' ? 'text-white' : 'text-gray-dark')}
      >
        {value}
      </Text>
    </div>
  )
}
