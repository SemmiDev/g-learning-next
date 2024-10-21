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

    return data ?? ({} as T)
  }

export const makeSimpleQueryDataWithId =
  <T extends AnyObject>(
    action: (id: string) => Promise<ActionResponseType<T>>,
    id: string | undefined,
    wait?: number
  ) =>
  async () => {
    if (!id) return {} as T

    if (wait) await waiting(wait)

    const { data, success, message } = await action(id)

    if (!success) {
      console.error(message)
    }

    return data ?? ({} as T)
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
    }

    return data ?? ({} as T)
  }
