'use server'

import { LupaPassowrdFormSchema } from '@/components/page/auth/lupa-password/form'
import { ResetPasswordFormSchema } from '@/components/page/auth/reset-password/form'
import { makeBasicPostRequestAction } from '@/utils/action'

export const resetPasswordAction = (data: LupaPassowrdFormSchema) =>
  makeBasicPostRequestAction(`${process.env.API_URL}/auth/reset-password`, {
    email: data.email,
  })

export const verifikasiTokenResetPasswordAction = (token: string) =>
  makeBasicPostRequestAction(
    `${process.env.API_URL}/auth/verifikasi-token-reset-password`,
    {
      token: token,
    }
  )

export const verifikasiResetPasswordAction = (
  data: ResetPasswordFormSchema & { token: string }
) =>
  makeBasicPostRequestAction(
    `${process.env.API_URL}/auth/verifikasi-reset-password`,
    {
      token: data.token,
      kata_sandi: data.password,
      ulangi_kata_sandi: data.ulangiPassword,
    }
  )
