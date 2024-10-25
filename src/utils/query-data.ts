import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { ActionResponseType } from './action'
import { AnyObject } from './type-interface'
import { wait as waiting } from './wait'

export const makeSimpleQueryData =
  <T extends AnyObject>(
    action: () => Promise<ActionResponseType<T>>,
    wait?: number
  ) =>
  async () => {
    if (wait) await waiting(wait)

    const { data, success, message } = await action()

    if (!success) {
      console.error(message)
    }

    return data ?? null
  }

export const makeSimpleQueryDataWithId =
  <T extends AnyObject>(
    action: (id: string) => Promise<ActionResponseType<T>>,
    id: string | undefined,
    wait?: number
  ) =>
  async () => {
    if (!id) return null

    if (wait) await waiting(wait)

    const { data, success, message } = await action(id)

    if (!success) {
      console.error(message)
    }

    return data ?? null
  }

export const makeSimpleQueryDataWithParams =
  <T extends AnyObject>(
    action: (...params: string[]) => Promise<ActionResponseType<T>>,
    ...params: string[]
  ) =>
  async () => {
    const { data, success, message } = await action(...params)

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
