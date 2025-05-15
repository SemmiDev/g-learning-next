import { ActionResponseType } from '@/utils/action'
import { AnyObject, Nullish, RemainingParams } from '@/utils/type-interface'
import { useSession } from 'next-auth/react'

export function useSessionJwt() {
  const { data: session } = useSession()

  const jwt = session?.jwt || ''

  const makeSimpleApiQueryData =
    <TData extends AnyObject, TParams extends Array<string | number>>(
      action: (
        jwt: string,
        ...params: TParams
      ) => Promise<ActionResponseType<TData>>,
      ...params: Nullish<RemainingParams<typeof action>>
    ) =>
    async () => {
      if (!jwt || params.some((param) => param === null || param === ''))
        return null

      const { data, success, message } = await action(
        jwt,
        ...(params as RemainingParams<typeof action>)
      )

      if (!success) {
        console.error(message)
      }

      return data ?? null
    }

  return {
    jwt,
    makeSimpleApiQueryData,
  }
}
