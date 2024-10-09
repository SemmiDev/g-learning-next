import { inter, lexendDeca } from '@/app/fonts'
import '@/app/globals.css'
import NextProgress from '@/components/next-progress'
import QueryProvider from '@/components/query-provider'
import SessionProvider from '@/components/session-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site.config'
import { cn } from '@/utils/class-names'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { authOptions } from './api/auth/[...nextauth]/options'

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

type RootLayoutProps = {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <ThemeProvider>
          <NextProgress />
          <SessionProvider session={session}>
            <QueryProvider>{children}</QueryProvider>
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
