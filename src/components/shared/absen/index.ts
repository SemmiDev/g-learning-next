'use client'

import dynamic from 'next/dynamic'
import Camera from './camera'

const Map = dynamic(() => import('./map'), { ssr: false })

export { Camera, Map }
