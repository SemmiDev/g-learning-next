import { inter, lexendDeca } from '@/app/fonts'
import '@/app/globals.css'
import QueryProvider from '@/components/query-provider'
import SessionProvider from '@/components/session-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site.config'
import { cn } from '@/utils/class-names'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { authOptions } from './api/auth/[...nextauth]/options'

/* Temporary Fix for react-select issue https://github.com/JedWatson/react-select/issues/5911 */
import NextProgressProvider from '@/components/next-progress-provider'
import * as React from 'react'
declare global {
  namespace JSX {
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty
      extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends React.JSX.ElementChildrenAttribute {}

    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<
      C,
      P
    >

    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends React.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}
/* End */

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
        <NextProgressProvider>
          <ThemeProvider>
            <SessionProvider session={session}>
              <QueryProvider>{children}</QueryProvider>
            </SessionProvider>
            <Toaster />
          </ThemeProvider>
        </NextProgressProvider>
      </body>
    </html>
  )
}
