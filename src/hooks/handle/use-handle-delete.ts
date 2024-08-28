import { DeleteActionType, handleActionWithToast } from '@/utils/action'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function useHandleDelete({
  action,
  refetchKey,
  loading = 'Menghapus...',
}: {
  action: DeleteActionType
  refetchKey?: QueryKey
  loading?: string
}) {
  const queryClient = useQueryClient()
  const [id, setId] = useState<string>()

  const handle = () => {
    if (!id) return

    handleActionWithToast(action(id), {
      loading,
      onSuccess: () => {
        setId(undefined)

        if (!refetchKey) return

        queryClient.invalidateQueries({
          queryKey: refetchKey,
        })
      },
    })
  }

  return { handle, id, setId }
}
