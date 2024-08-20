import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Text } from '@/components/ui'
import { getServerSession } from 'next-auth'
import toast from 'react-hot-toast'
import { makeUrl } from './string'

export type ActionPromiseType = {
  success: boolean
  message?: string
  error?: string
  data?: any
}

export const handleActionWithToast = async <T extends ActionPromiseType>(
  action: Promise<T>,
  {
    loading = 'Loading...',
    success = ({ message }: ActionPromiseType) => message,
    error = ({ message }: ActionPromiseType) => message,
    onStart,
    onSuccess,
    onError,
  }: {
    loading?: string
    success?: string | ((message: ActionPromiseType) => string | undefined)
    error?: string | ((message: ActionPromiseType) => string | undefined)
    onStart?(): void
    onSuccess?(result: T): void
    onError?(result: T): void
  } = {}
) => {
  onStart && onStart()

  const toastId = toast.loading(<Text>{loading}</Text>)

  const res = await action

  toast.dismiss(toastId)

  if (res.success) {
    toast.success(
      <Text>{typeof success === 'string' ? success : success(res)}</Text>
    )
    onSuccess && onSuccess(res)
  } else {
    toast.error(<Text>{typeof error === 'string' ? error : error(res)}</Text>)
    onError && onError(res)
  }
}

export const makeActionResponse = (
  success: boolean,
  message?: string,
  error?: string,
  data?: any
): ActionPromiseType => ({
  success: success,
  message: message ?? (!success ? 'Terjadi kesalahan.' : undefined),
  error: error ?? undefined,
  data: data,
})

export const makeBasicPostRequestAction = async (
  url: string,
  payload: Record<string, string | number | undefined> = {}
) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const { success, message, errors, data } = await res.json()

    return makeActionResponse(success, message, errors, data)
  } catch (error) {
    return makeActionResponse(false)
  }
}

export const makeJwtGetRequestAction = async (
  url: string,
  params?: Record<string, string | number | undefined>
) => {
  try {
    const { jwt } = (await getServerSession(authOptions)) ?? {}

    const res = await fetch(makeUrl(url, params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt ?? ''}`,
      },
    })

    const { success, message, errors, data } = await res.json()

    return makeActionResponse(success, message, errors, data)
  } catch (error) {
    return makeActionResponse(false)
  }
}

const makeJwtDataRequestAction = async (
  url: string,
  method: 'POST' | 'PUT',
  payload: Record<string, string | number | undefined> = {}
) => {
  try {
    const { jwt } = (await getServerSession(authOptions)) ?? {}

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt ?? ''}`,
      },
      body: JSON.stringify(payload),
    })

    const { success, message, errors, data } = await res.json()

    return makeActionResponse(success, message, errors, data)
  } catch (error) {
    return makeActionResponse(false)
  }
}

export const makeJwtPostRequestAction = (
  url: string,
  payload: Record<string, string | number | undefined> = {}
) => makeJwtDataRequestAction(url, 'POST', payload)

export const makeJwtPutRequestAction = (
  url: string,
  payload: Record<string, string | number | undefined> = {}
) => makeJwtDataRequestAction(url, 'PUT', payload)
