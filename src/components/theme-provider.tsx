'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const queryClient = new QueryClient()

  return (
    <NextThemeProvider
      enableSystem
      defaultTheme="light"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextThemeProvider>
  )
}
