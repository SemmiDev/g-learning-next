'use client'

import { AppProgressBar } from 'next-nprogress-bar'

export default function NextProgress() {
  return <AppProgressBar options={{ showSpinner: false }} shallowRouting />
}
