import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { AnyObject } from './type-interface'

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
