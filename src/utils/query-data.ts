import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { ActionResponseType } from './action'
import { AnyObject, Nullish } from './type-interface'

export const makeSimpleQueryData =
  <TData extends AnyObject, TParams extends Array<string | number>>(
    action: (...params: TParams) => Promise<ActionResponseType<TData>>,
    ...params: Nullish<Parameters<typeof action>>
  ) =>
  async () => {
    if (params.some((param) => param === null || param === '')) return null

    const { data, success, message } = await action(
      ...(params as Parameters<typeof action>)
    )

    if (!success) {
      console.error(message)
    }

    return data ?? null
  }

export const makeAsyncTableQueryData =
  <T extends AnyObject>(
    action: (
      actionProps: ControlledAsyncTableActionProps
    ) => Promise<ControlledAsyncTableActionType<T>>,
    actionProps: ControlledAsyncTableActionProps = {}
  ) =>
  async () => {
    const { data, success, message } = await action(actionProps)

    if (!success) {
      console.error(message)
      throw new Error(message)
    }

    return data ?? null
  }
