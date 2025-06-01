import logoIconImg from '@public/logo-short.svg'
import logoImg from '@public/logo.svg'
import { Metadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Smart Campus',
  description: `Learning management system (LMS).`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
}

export const metaObject = (
  title?: string,
  // openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Smart Campus` : siteConfig.title,
    description,
    // openGraph: openGraph ?? {
    //   title: title ? `${title} - Smart Campus` : title,
    //   description,
    //   url: 'https://isomorphic-furyroad.vercel.app',
    //   siteName: 'Smart Campus',
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
