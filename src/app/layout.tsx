import { inter, lexendDeca } from '@/app/fonts'
import '@/app/globals.css'
import NextProgress from '@/components/next-progress'
import QueryProvider from '@/components/query-provider'
import SessionProvide from '@/components/session-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site.config'
import { cn } from '@/utils/class-names'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'

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
          <SessionProvide session={session}>
            <QueryProvider>{children}</QueryProvider>
          </SessionProvide>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
