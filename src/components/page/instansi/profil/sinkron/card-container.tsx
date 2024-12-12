import { Card, TextSpan } from '@/components/ui'
import cn from '@/utils/class-names'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { ReactNode } from 'react'

type SinkronCardItemProps = {
  logo: string | StaticImport
  labelTop: string
  labelBottom: string
  bgColor: string
  children?: ReactNode
  className?: string
}

export default function SinkronCardContainer({
  logo,
  labelTop,
  labelBottom,
  bgColor,
  children,
  className,
}: SinkronCardItemProps) {
  return (
    <Card className={cn('p-0', className)}>
      <div
        className="flex justify-center items-center h-[150px] space-x-2 px-3 py-3"
        style={{ backgroundColor: bgColor }}
      >
        <figure className="shrink-0 h-[60px] xs:h-[100px] sm:h-[125px]">
          <Image
            src={logo}
            alt="sinkron"
            className="w-full h-full object-contain object-right"
          />
        </figure>
        <div className="flex flex-row gap-x-2 text-[1.5rem] leading-10 font-extrabold text-white xs:text-[2.5rem] sm:text-[2.5rem] md:flex-col xl:text-[2.8125rem] xl:leading-[2.8rem] 2xl:text-[3rem] 2xl:leading-[3rem]">
          <TextSpan>{labelTop}</TextSpan>
          <TextSpan>{labelBottom}</TextSpan>
        </div>
      </div>
      {children}
    </Card>
  )
}
