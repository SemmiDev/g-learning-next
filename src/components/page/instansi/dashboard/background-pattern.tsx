import { hashToRangeNumber } from '@/utils/hash'
import bgp00 from '@public/images/background-profile/00.png'
import bgp01 from '@public/images/background-profile/01.png'
import bgp02 from '@public/images/background-profile/02.png'
import bgp03 from '@public/images/background-profile/03.png'
import bgp04 from '@public/images/background-profile/04.png'
import bgp05 from '@public/images/background-profile/05.png'
import bgp06 from '@public/images/background-profile/06.png'
import bgp07 from '@public/images/background-profile/07.png'
import bgp08 from '@public/images/background-profile/08.png'
import bgp09 from '@public/images/background-profile/09.png'
import bgp10 from '@public/images/background-profile/10.png'
import bgp11 from '@public/images/background-profile/11.png'
import bgp12 from '@public/images/background-profile/12.png'
import bgp13 from '@public/images/background-profile/13.png'
import bgp14 from '@public/images/background-profile/14.png'
import bgp15 from '@public/images/background-profile/15.png'
import bgp16 from '@public/images/background-profile/16.png'
import bgp17 from '@public/images/background-profile/17.png'
import bgp18 from '@public/images/background-profile/18.png'
import bgp19 from '@public/images/background-profile/19.png'
import bgp20 from '@public/images/background-profile/20.png'
import { useSession } from 'next-auth/react'

/* const imageColors = {
  orange: 'inset 0 0 0 2000px rgba(203, 50, 2, 0.8)',
  purple: 'inset 0 0 0 2000px rgba(114, 2, 203, 0.8)',
  yellow: 'inset 0 0 0 2000px rgba(137, 140, 0, 0.8)',
  green: 'inset 0 0 0 2000px rgba(8, 94, 0, 0.8)',
  teal: 'inset 0 0 0 2000px rgba(0, 167, 107, 0.8)',
  blue: 'inset 0 0 0 2000px rgba(23, 0, 167, 0.8)',
  magenta: 'inset 0 0 0 2000px rgba(167, 0, 90, 0.8)',
  violet: 'inset 0 0 0 2000px rgba(104, 0, 167, 0.8)',
  lightBlue: 'inset 0 0 0 2000px rgba(0, 67, 167, 0.8)',
} */

const bgList = [
  bgp00,
  bgp01,
  bgp02,
  bgp03,
  bgp04,
  bgp05,
  bgp06,
  bgp07,
  bgp08,
  bgp09,
  bgp10,
  bgp11,
  bgp12,
  bgp13,
  bgp14,
  bgp15,
  bgp16,
  bgp17,
  bgp18,
  bgp19,
  bgp20,
]

export default function BackgroundProfile({
  className,
}: {
  className?: string
}) {
  const { data: session } = useSession()

  const bgp =
    bgList[
      hashToRangeNumber(
        `${session?.jwt ?? ''}${new Date().toJSON().slice(0, 10)}`,
        21
      )
    ]

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${bgp.src})`,
        backgroundSize: 'cover',
      }}
    ></div>
  )
}
