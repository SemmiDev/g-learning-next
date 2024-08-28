import { DeleteActionType, handleActionWithToast } from './action'
import { AnyObject } from './type-interface'

export const makeHandleDelete =
  <T extends AnyObject>(
    action: DeleteActionType<T>,
    id: string | undefined,
    { onSuccess }: { onSuccess?(): void } = {}
  ) =>
  () => {
    if (!id) return

    handleActionWithToast(action(id), {
      loading: 'Menghapus...',
      onSuccess: () => onSuccess && onSuccess(),
    })
  }
