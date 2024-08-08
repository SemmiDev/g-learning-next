'use server'

import { DaftarFormSchema } from '@/components/page/auth/daftar/form'
import { makeActionResponse } from '@/utils/action'

export const daftarAction = async (data: DaftarFormSchema) => {
  const payload = {
    nama: data.nama,
    email: data.email,
    kata_sandi: data.password,
    ulangi_kata_sandi: data.ulangiPassword,
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const resData = await res.json()

    return makeActionResponse(resData.success, resData.message, resData.errors)
  } catch (error) {
    return makeActionResponse(false)
  }
}
