import { DeleteActionType } from '@/utils/action'
import { makeHandleDelete } from '@/utils/handle'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function useHandleDelete({
  action,
  refetchKey,
}: {
  action: DeleteActionType
  refetchKey?: QueryKey
}) {
  const queryClient = useQueryClient()
  const [id, setId] = useState<string>()

  const handle = makeHandleDelete(action, id, {
    onSuccess: () => {
      setId(undefined)

      if (!refetchKey) return

      queryClient.invalidateQueries({
        queryKey: refetchKey,
      })
    },
  })

  return { handle, id, setId }
}
