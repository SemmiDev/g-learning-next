import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/theme-provider'
import { inter, lexendDeca } from '@/app/fonts'
import { siteConfig } from '@/config/site.config'
import { cn } from '@/utils/class-names'
import NextProgress from '@/components/next-progress'
import { getServerSession } from 'next-auth'
import SessionProvide from '@/components/session-provider'

import '@/app/globals.css'

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <ThemeProvider>
          <NextProgress />
          <SessionProvide session={session}>{children}</SessionProvide>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
