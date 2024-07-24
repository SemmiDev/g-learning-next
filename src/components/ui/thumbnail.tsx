import cn from '@/utils/class-names'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export type ThumbnailProps = {
  size: number
  rounded?: 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  src: string | StaticImport
  alt: string
  bordered?: boolean
  className?: string
}

export default function Thumbnail({
  size,
  rounded = 'base',
  src,
  alt,
  bordered,
  className,
}: ThumbnailProps) {
  return (
    <figure
      className={cn(
        'flex justify-center items-center overflow-clip',
        !!rounded
          ? rounded !== 'base'
            ? `rounded-${rounded}`
            : 'rounded'
          : null,
        { 'border border-muted': bordered },
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image src={src} alt={alt} className="object-cover" />
    </figure>
  )
}
