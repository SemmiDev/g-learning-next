import Image, { ImageProps } from 'next/image'
import c1 from '@public/images/cover/01.png'
import c2 from '@public/images/cover/02.png'
import c3 from '@public/images/cover/03.png'
import c4 from '@public/images/cover/04.png'
import c5 from '@public/images/cover/05.png'
import c6 from '@public/images/cover/06.png'
import c7 from '@public/images/cover/07.png'
import c8 from '@public/images/cover/08.png'
import c9 from '@public/images/cover/09.png'
import c10 from '@public/images/cover/10.png'
import c11 from '@public/images/cover/11.png'
import c12 from '@public/images/cover/12.png'
import c13 from '@public/images/cover/13.png'
import { hashToRangeNumber } from '@/utils/hash'

const coverList = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13]

type RandomCoverImageProps = Omit<ImageProps, 'src'> & {
  persistentKey: string
}

export default function RandomCoverImage({
  persistentKey,
  alt,
  ...props
}: RandomCoverImageProps) {
  const cover =
    coverList[hashToRangeNumber(persistentKey, coverList.length - 1)]

  return <Image src={cover} alt={alt} {...props} />
}
