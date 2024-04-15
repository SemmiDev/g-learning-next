import { Metadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import logoImg from '@public/logo.svg'
import logoIconImg from '@public/logo-short.svg'

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'G-Learing',
  description: `Learning management system (LMS).`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
}

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - G-Learing` : siteConfig.title,
    description,
    // openGraph: openGraph ?? {
    //   title: title ? `${title} - G-Learing` : title,
    //   description,
    //   url: 'https://isomorphic-furyroad.vercel.app',
    //   siteName: 'G-Learing',
    //   images: {
    //     url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
    //     width: 1200,
    //     height: 630,
    //   },
    //   locale: 'en_US',
    //   type: 'website',
    // },
  }
}
