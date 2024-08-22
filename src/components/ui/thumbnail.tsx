import cn from '@/utils/class-names'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export type ThumbnailProps = {
  size: number
  rounded?: 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  src: string | StaticImport | undefined
  alt: string
  bordered?: boolean
  priority?: boolean
  className?: string
}

export default function Thumbnail({
  size,
  rounded = 'base',
  src,
  alt,
  bordered,
  priority,
  className,
}: ThumbnailProps) {
  return (
    <figure
      className={cn(
        'overflow-clip',
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
      {src && (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority={priority}
          className="w-full h-full object-cover"
        />
      )}
    </figure>
  )
}
