import { LupaPassowrdFormSchema } from '@/components/pages/auth/lupa-password/form'
import { ResetPasswordFormSchema } from '@/components/pages/auth/reset-password/form'
import { makeBasicPostRequestAction } from '@/utils/action'

export const resetPasswordAction = async (data: LupaPassowrdFormSchema) =>
  makeBasicPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
    {
      email: data.email,
    }
  )

export const verifikasiTokenResetPasswordAction = async (token: string) =>
  makeBasicPostRequestAction<{ valid: boolean }>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifikasi-token-reset-password`,
    {
      token: token,
    }
  )

export const verifikasiResetPasswordAction = async (
  data: ResetPasswordFormSchema & { token: string }
) =>
  makeBasicPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifikasi-reset-password`,
    {
      token: data.token,
      kata_sandi: data.password,
      ulangi_kata_sandi: data.ulangiPassword,
    }
  )
