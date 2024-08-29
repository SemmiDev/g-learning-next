import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { AnyObject } from './type-interface'
import { ActionResponseType } from './action'

export const makeSimpleQueryData =
  <T extends AnyObject>(action: () => Promise<ActionResponseType<T>>) =>
  async () => {
    const { data } = await action()

    return data
  }

export const makeSimpleQueryDataWithId =
  <T extends AnyObject>(
    action: (id: string) => Promise<ActionResponseType<T>>,
    id: string | undefined
  ) =>
  async () => {
    if (!id) return null

    const { data } = await action(id)

    return data
  }

export const makeAsyncTableQueryData =
  <T extends AnyObject>(
    action: (
      actionProps: ControlledAsyncTableActionProps
    ) => Promise<ControlledAsyncTableActionType<T>>,
    actionProps: ControlledAsyncTableActionProps = {}
  ) =>
  async () => {
    const { data } = await action(actionProps)

    return data?.list ?? []
  }
