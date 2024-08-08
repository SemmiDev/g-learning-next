import { Text } from '@/components/ui'
import toast from 'react-hot-toast'

export type ActionPromiseType = {
  success: boolean
  message?: string
  error?: string
}

export const handleActionWithToast = async <T extends ActionPromiseType>(
  action: Promise<T>,
  {
    loading = 'Loading...',
    onStart,
    onSuccess,
    onError,
  }: {
    loading?: string
    onStart?(): void
    onSuccess?(result: T): void
    onError?(result: T): void
  } = {}
) => {
  onStart && onStart()

  const toastId = toast.loading(<Text>{loading}</Text>)

  const res = await action

  toast.dismiss(toastId)

  if (res.success) {
    toast.success(<Text>{res.message}</Text>)
    onSuccess && onSuccess(res)
  } else {
    toast.error(<Text>{res.message}</Text>)
    onError && onError(res)
  }
}

// export const makeActionPromise = <T extends ActionPromiseType>(
//   promise: Promise<T>
// ): Promise<T> => {
//   return new Promise(async (resolve, reject) => {
//     const res = await promise
//     if (res.success) {
//       resolve(res)
//     } else {
//       reject(res)
//     }
//   })
// }

export const makeActionResponse = (
  success: boolean,
  message?: string,
  error?: string
): ActionPromiseType => ({
  success: success,
  message: message ?? (!success ? 'Terjadi kesalahan.' : undefined),
  error: error ?? undefined,
})
