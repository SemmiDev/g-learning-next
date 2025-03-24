import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Text } from '@/components/ui'
import { ControlledAsyncTableActionType } from '@/components/ui/controlled-async-table'
import { AsyncPaginateSelectActionType } from '@/components/ui/select/async-paginate'
import { DEFAULT_DATA_PER_PAGE } from '@/config/const'
import { getServerSession } from 'next-auth'
import toast from 'react-hot-toast'
import { makeUrl } from './string'
import { AnyObject } from './type-interface'

const API_UNREACHABLE_MESSAGE = 'Tidak dapat menghubungi API.' as const
const CONSOLE_LOG_REQUEST =
  process.env.CONSOLE_LOG_REQUEST?.toLowerCase() === 'true'
const CONSOLE_LOG_RESPONSE =
  process.env.CONSOLE_LOG_RESPONSE?.toLowerCase() === 'true'

export type ActionResponseType<T = AnyObject> = {
  success: boolean
  code?: number
  message?: string
  error?: string
  data?: T
}

export const handleActionWithToast = async <T extends ActionResponseType>(
  action: Promise<T>,
  {
    loading = 'Loading...',
    success = ({ message }: T) => message,
    error = ({ message }: T) => message,
    onStart,
    onSuccess,
    onError,
    onFinish,
  }: {
    loading?: string
    success?: string | ((message: T) => string | undefined)
    error?: string | ((message: T) => string | undefined)
    onStart?(): void
    onSuccess?(result: T): void
    onError?(result: T): void
    onFinish?(): void
  } = {}
) => {
  onStart && onStart()

  const toastId = toast.loading(<Text>{loading}</Text>)

  try {
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
        toast.error(
          <Text>{typeof error === 'string' ? error : error(res)}</Text>
        )

      onError && onError(res)
    }
  } catch (err) {
    toast.dismiss(toastId)

    const res = makeActionResponse(
      false,
      'Tidak dapat menghubungi server.'
    ) as T

    error &&
      toast.error(<Text>{typeof error === 'string' ? error : error(res)}</Text>)

    onError && onError(res)
  }

  onFinish && onFinish()
}

export const makeActionResponse = <T extends AnyObject>(
  success: boolean,
  message?: string,
  error?: string,
  code?: number,
  data?: T
): ActionResponseType<T> => ({
  success: success,
  message: message ?? (!success ? 'Terjadi kesalahan!' : undefined),
  error: error,
  code: code,
  data: data,
})

export type ActionResponsePaginationDataType<T extends AnyObject = AnyObject> =
  {
    list: T[]
    page_info: {
      has_previous_page: boolean
      has_next_page: boolean
      current_page: number
      per_page: number
      total_data: number
      last_page: number
      from: number
      to: number
    }
  }

export const makeTableActionResponse = <T extends AnyObject>(
  actionResponse: ActionResponseType<ActionResponsePaginationDataType<T>>
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
        hasNextPage: page_info?.has_next_page,
        hasPrevPage: page_info?.has_previous_page,
      },
    },
  }
}

export const makeSelectDataActionResponse = <T extends AnyObject>(
  actionResponse: ActionResponseType<ActionResponsePaginationDataType<T>>
): AsyncPaginateSelectActionType<T> => {
  const { list, page_info } = actionResponse?.data ?? {}

  return {
    list: list ?? [],
    hasMore: !!page_info?.has_next_page,
  }
}

type PayloadType = Record<string, any> | FormData

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

    const { success, message, errors, code, data } = await res.json()

    return makeActionResponse<T>(success, message, errors, code, data)
  } catch (error) {
    return makeActionResponse<T>(false, API_UNREACHABLE_MESSAGE)
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
    if (CONSOLE_LOG_REQUEST) console.log('Send Request', makeUrl(url, params))

    const { jwt } = (await getServerSession(authOptions)) ?? {}

    const res = await fetch(makeUrl(url, params), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt ?? ''}`,
      },
    })

    const { success, message, errors, code, data } = await res.json()

    if (CONSOLE_LOG_RESPONSE)
      console.log('Response', { success, message, errors, code, data })

    return makeActionResponse<T>(success, message, errors, code, data)
  } catch (error) {
    return makeActionResponse<T>(false, API_UNREACHABLE_MESSAGE)
  }
}

export const makeJwtGetRequestTableAction = async <T extends AnyObject>(
  url: string,
  params?: GetRequestParamsType
) => {
  const resData = await makeJwtGetRequestAction<
    ActionResponsePaginationDataType<T>
  >(url, {
    ...params,
    per_page: params?.per_page ?? DEFAULT_DATA_PER_PAGE,
  })

  return makeTableActionResponse(resData)
}

export const makeJwtGetRequestSelectDataAction = async <T extends AnyObject>(
  url: string,
  params?: GetRequestParamsType
) => {
  const resData = await makeJwtGetRequestAction<
    ActionResponsePaginationDataType<T>
  >(url, params)

  return makeSelectDataActionResponse<T>(resData)
}

const makeJwtDataRequestAction = async <T extends AnyObject>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE',
  payload: PayloadType = {}
) => {
  try {
    if (CONSOLE_LOG_REQUEST) console.log('Send Request', url, payload)

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

    const { success, message, errors, code, data } = await res.json()

    if (CONSOLE_LOG_RESPONSE)
      console.log('Response', { success, message, errors, code, data })

    return makeActionResponse<T>(success, message, errors, code, data)
  } catch (error) {
    return makeActionResponse<T>(false, API_UNREACHABLE_MESSAGE)
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

export const makeJwtDeleteRequestAction = <T extends AnyObject>(
  url: string,
  payload: PayloadType = {}
) => makeJwtDataRequestAction<T>(url, 'DELETE', payload)

export type DeleteActionType<T extends AnyObject = AnyObject> = (
  id: string
) => Promise<ActionResponseType<T>>
