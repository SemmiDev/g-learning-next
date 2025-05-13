import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusBerkasAction = async (id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media`,
    {
      id: [id],
    }
  )
