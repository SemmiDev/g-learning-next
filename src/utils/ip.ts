import { headers } from 'next/headers'

export const getIp = async () => {
  const getHeaders = await headers()
  const forwardedFor = getHeaders.get('x-forwarded-for')
  const realIp = getHeaders.get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (realIp) return realIp.trim()

  return null
}
