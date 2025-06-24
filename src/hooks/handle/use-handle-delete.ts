import { DeleteActionType, handleActionWithToast } from '@/utils/action'
import { DeleteApiType } from '@/utils/api'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSessionJwt } from '../use-session-jwt'

// using server action
export function useHandleActionDelete({
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

// using API directly
export function useHandleApiDelete({
  action,
  refetchKey,
  loading = 'Menghapus...',
  onFinish,
}: {
  action: DeleteApiType
  refetchKey?: QueryKey
  loading?: string
  onFinish?: (id: string) => void
}) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const [id, setId] = useState<string>()

  const handle = () => {
    if (!id) return

    handleActionWithToast(action(jwt, id), {
      loading,
      onSuccess: () => {
        setId(undefined)

        if (!refetchKey) return

        queryClient.invalidateQueries({
          queryKey: refetchKey,
        })
      },
      onFinish: () => onFinish?.(id),
    })
  }

  return { handle, id, setId }
}
