import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Text } from '@/components/ui'
import { getServerSession } from 'next-auth'
import toast from 'react-hot-toast'
import { makeUrl } from './string'
import { AnyObject } from './type-interface'

export type ActionPromiseType<T = AnyObject> = {
  success: boolean
  message?: string
  error?: string
  data?: T
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
    success &&
      toast.success(
        <Text>{typeof success === 'string' ? success : success(res)}</Text>
      )

    onSuccess && onSuccess(res)
  } else {
    error &&
      toast.error(<Text>{typeof error === 'string' ? error : error(res)}</Text>)

    onError && onError(res)
  }
}

export const makeActionResponse = <T extends AnyObject>(
  success: boolean,
  message?: string,
  error?: string,
  data?: T
): ActionPromiseType<T> => ({
  success: success,
  message: message ?? (!success ? 'Terjadi kesalahan.' : undefined),
  error: error ?? undefined,
  data: data,
})

export const makeBasicPostRequestAction = async <T extends AnyObject>(
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

    return makeActionResponse<T>(success, message, errors, data)
  } catch (error) {
    return makeActionResponse<T>(false)
  }
}

type GetRequestParamsType = {
  current_page?: number
  per_page?: number
  keyword?: string
  sort_by?: string
  order?: string
} & Record<string, string | number | undefined>

export const makeJwtGetRequestAction = async <T extends AnyObject>(
  url: string,
  params?: GetRequestParamsType
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

    return makeActionResponse<T>(success, message, errors, data)
  } catch (error) {
    return makeActionResponse<T>(false)
  }
}

const makeJwtDataRequestAction = async <T extends AnyObject>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE',
  payload: Record<string, string | number | undefined | null> = {}
) => {
  try {
    // console.log(payload)

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
    // console.log({ success, message, errors, data })

    return makeActionResponse<T>(success, message, errors, data)
  } catch (error) {
    return makeActionResponse<T>(false)
  }
}

export const makeJwtPostRequestAction = <T extends AnyObject>(
  url: string,
  payload: Record<string, string | number | undefined | null> = {}
) => makeJwtDataRequestAction<T>(url, 'POST', payload)

export const makeJwtPutRequestAction = <T extends AnyObject>(
  url: string,
  payload: Record<string, string | number | undefined | null> = {}
) => makeJwtDataRequestAction<T>(url, 'PUT', payload)

export const makeJwtDeleteRequestAction = <T extends AnyObject>(url: string) =>
  makeJwtDataRequestAction<T>(url, 'DELETE')
