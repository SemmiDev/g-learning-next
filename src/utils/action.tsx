import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Text } from '@/components/ui'
import { ControlledAsyncTableActionType } from '@/components/ui/controlled-async-table'
import { getServerSession } from 'next-auth'
import toast from 'react-hot-toast'
import { makeUrl } from './string'
import { AnyObject } from './type-interface'

export type ActionResponseType<T = AnyObject> = {
  success: boolean
  message?: string
  error?: string
  data?: T
}

export const handleActionWithToast = async <T extends ActionResponseType>(
  action: Promise<T>,
  {
    loading = 'Loading...',
    success = ({ message }: ActionResponseType) => message,
    error = ({ message }: ActionResponseType) => message,
    onStart,
    onSuccess,
    onError,
  }: {
    loading?: string
    success?: string | ((message: ActionResponseType) => string | undefined)
    error?: string | ((message: ActionResponseType) => string | undefined)
    onStart?(): void
    onSuccess?(result: T): void
    onError?(result: T): void
  } = {}
) => {
  onStart && onStart()

  const toastId = toast.loading(<Text>{loading}</Text>)

  const res = await action
  // console.log(res)

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
): ActionResponseType<T> => ({
  success: success,
  message: message ?? (!success ? 'Terjadi kesalahan' : undefined),
  error: error ?? undefined,
  data: data,
})

export type ActionResponseTableDataType<T extends AnyObject = AnyObject> = {
  list: T[]
  page_info: {
    current_page: number
    per_page: number
    total_data: number
    last_page: number
    from: number
    to: number
  }
}

export const makeTableActionResponse = <T extends AnyObject>(
  actionResponse: ActionResponseType<ActionResponseTableDataType<T>>
): ControlledAsyncTableActionType<T> => {
  const { list, page_info } = actionResponse?.data ?? {}

  return {
    ...actionResponse,
    data: {
      list: list,
      pagination: {
        page: page_info?.current_page,
        perPage: page_info?.per_page,
        totalData: page_info?.total_data,
        lastPage: page_info?.last_page,
        from: page_info?.from,
        to: page_info?.to,
      },
    },
  }
}

type PayloadType = Record<string, string | number | undefined | null> | FormData

export const makeBasicPostRequestAction = async <T extends AnyObject>(
  url: string,
  payload: PayloadType = {}
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
  payload: PayloadType = {}
) => {
  try {
    console.log(payload)

    const { jwt } = (await getServerSession(authOptions)) ?? {}

    const headerContentType = !(payload instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : null

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${jwt ?? ''}`,
        ...headerContentType,
      },
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
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
  payload: PayloadType = {}
) => makeJwtDataRequestAction<T>(url, 'POST', payload)

export const makeJwtPutRequestAction = <T extends AnyObject>(
  url: string,
  payload: PayloadType = {}
) => makeJwtDataRequestAction<T>(url, 'PUT', payload)

export const makeJwtDeleteRequestAction = <T extends AnyObject>(url: string) =>
  makeJwtDataRequestAction<T>(url, 'DELETE')
