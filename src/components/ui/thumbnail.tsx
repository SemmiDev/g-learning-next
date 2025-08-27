import cn from '@/utils/class-names'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { ReactNode } from 'react'
import ImageName from './image-with-name'

const thumbnailRoundeds = {
  sm: 'rounded-sm',
  base: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
}

export type ThumbnailProps = {
  size: number
  resize?: number //resized image size by nextjs, default is same as size
  rounded?: keyof typeof thumbnailRoundeds
  src: string | StaticImport | undefined
  alt: string
  avatar?: string
  bordered?: boolean
  priority?: boolean
  defaultImage?: ReactNode
  onClick?: () => void
  className?: string
}

export default function Thumbnail({
  size,
  resize,
  rounded = 'base',
  src,
  alt,
  avatar,
  bordered,
  priority,
  defaultImage,
  onClick,
  className,
}: ThumbnailProps) {
  return (
    <figure
      className={cn(
        'bg-white overflow-clip',
        thumbnailRoundeds[rounded],
        { 'border border-muted dark:border-gray-800': bordered },
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={resize ?? size}
          height={resize ?? size}
          priority={priority}
          className="w-full h-full object-cover"
        />
      ) : avatar ? (
        <ImageName name={avatar} size={size} />
      ) : (
        defaultImage
      )}
    </figure>
  )
}
