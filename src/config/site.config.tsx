import logoIconImg from '@public/logo-short.svg'
import logoImg from '@public/logo.svg'
import { Metadata } from 'next'

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
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Smart Campus` : siteConfig.title,
    description,
  }
}
