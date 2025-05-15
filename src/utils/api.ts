import { DEFAULT_DATA_PER_PAGE } from '@/config/const'
import {
  ActionResponsePaginationDataType,
  ActionResponseType,
  API_UNREACHABLE_MESSAGE,
  CONSOLE_LOG_ON_ERROR,
  CONSOLE_LOG_REQUEST,
  CONSOLE_LOG_RESPONSE,
  GetRequestParamsType,
  makeActionResponse,
  makeBasicPostRequestAction,
  makeSelectDataActionResponse,
  makeTableActionResponse,
  PayloadType,
} from './action'
import { makeUrl } from './string'
import { AnyObject } from './type-interface'

export const makeBasicPostRequestApi = makeBasicPostRequestAction

export const makeJwtGetRequestApi = async <T extends AnyObject>(
  url: string,
  jwt: string,
  params?: GetRequestParamsType
) => {
  try {
    if (CONSOLE_LOG_REQUEST) console.log('Send Request', makeUrl(url, params))

    const res = await fetch(makeUrl(url, params), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt ?? ''}`,
      },
    })

    const { success, message, errors, code, data } = await res.json()

    if (CONSOLE_LOG_ON_ERROR && !success) {
      if (!CONSOLE_LOG_REQUEST)
        console.log('Send Request', makeUrl(url, params))
      console.log('Response', { success, message, errors, code, data })
    } else if (CONSOLE_LOG_RESPONSE) {
      console.log('Response', { success, message, errors, code, data })
    }

    return makeActionResponse<T>(success, message, errors, code, data)
  } catch (error) {
    console.error(error)
    return makeActionResponse<T>(false, API_UNREACHABLE_MESSAGE)
  }
}

export const makeJwtGetRequestTableApi = async <T extends AnyObject>(
  url: string,
  jwt: string,
  params?: GetRequestParamsType
) => {
  const resData = await makeJwtGetRequestApi<
    ActionResponsePaginationDataType<T>
  >(url, jwt, {
    ...params,
    per_page: params?.per_page ?? DEFAULT_DATA_PER_PAGE,
  })

  return makeTableActionResponse(resData)
}

export const makeJwtGetRequestSelectDataApi = async <T extends AnyObject>(
  url: string,
  jwt: string,
  params?: GetRequestParamsType
) => {
  const resData = await makeJwtGetRequestApi<
    ActionResponsePaginationDataType<T>
  >(url, jwt, params)

  return makeSelectDataActionResponse<T>(resData)
}

const makeJwtDataRequestApi = async <T extends AnyObject>(
  url: string,
  jwt: string,
  method: 'POST' | 'PUT' | 'DELETE',
  payload: PayloadType = {}
) => {
  try {
    if (CONSOLE_LOG_REQUEST) console.log('Send Request', url, payload)

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

    if (CONSOLE_LOG_ON_ERROR && !success) {
      if (!CONSOLE_LOG_REQUEST) console.log('Send Request', url, payload)
      console.log('Response', { success, message, errors, code, data })
    } else if (CONSOLE_LOG_RESPONSE) {
      console.log('Response', { success, message, errors, code, data })
    }

    return makeActionResponse<T>(success, message, errors, code, data)
  } catch (error) {
    return makeActionResponse<T>(false, API_UNREACHABLE_MESSAGE)
  }
}

export const makeJwtPostRequestApi = <T extends AnyObject>(
  url: string,
  jwt: string,
  payload: PayloadType = {}
) => makeJwtDataRequestApi<T>(url, jwt, 'POST', payload)

export const makeJwtPutRequestApi = <T extends AnyObject>(
  url: string,
  jwt: string,
  payload: PayloadType = {}
) => makeJwtDataRequestApi<T>(url, jwt, 'PUT', payload)

export const makeJwtDeleteRequestApi = <T extends AnyObject>(
  url: string,
  jwt: string,
  payload: PayloadType = {}
) => makeJwtDataRequestApi<T>(url, jwt, 'DELETE', payload)

export type DeleteApiType<T extends AnyObject = AnyObject> = (
  jwt: string,
  id: string
) => Promise<ActionResponseType<T>>
