'use client'

import {
  verifikasiResetPasswordAction,
  verifikasiTokenResetPasswordAction,
} from '@/actions/auth/reset-password'
import { Button, ControlledPassword, Form, Text, Title } from '@/components/ui'
import { authRoutes, routes } from '@/config/routes'
import { useMedia } from '@/hooks/use-media'
import { handleActionWithToast } from '@/utils/action'
import { requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'
import { Alert } from 'rizzui'

const formSchema = z
  .object({
    password: z
      .string()
      .pipe(requiredPassword.min(8, 'Kata sandi minimal 8 karakter')),
    ulangiPassword: z
      .string()
      .pipe(requiredPassword.min(8, 'Kata sandi minimal 8 karakter')),
  })
  .refine((data) => data.password === data.ulangiPassword, {
    message: 'Kata sandi dan ulangi kata sandi harus sama.',
    path: ['ulangiPassword'],
  })

// type FormSchema = z.infer<typeof formSchema>
export type ResetPasswordFormSchema = {
  password?: string
  ulangiPassword?: string
}

const initialValues = {}

export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [checking, setChecking] = useState(true)
  const [formError, setFormError] = useState<string>()

  const doLogin = async (jsonData: string) => {
    const { ok } =
      (await signIn('withToken', {
        data: jsonData,
        redirect: false,
      })) ?? {}

    if (ok) {
      router.replace(routes.dashboard)
      return
    }

    router.replace(authRoutes.login)
  }

  const onSubmit: SubmitHandler<ResetPasswordFormSchema> = async (data) => {
    await handleActionWithToast(
      verifikasiResetPasswordAction({ ...data, token }),
      {
        loading: 'Menyimpan kata sandi baru...',
        success: () => 'Berhasil menyimpan kata sandi baru',
        onStart: () => setFormError(undefined),
        onSuccess: ({ data }) => doLogin(JSON.stringify(data)),
        onError: ({ error }) => setFormError(error),
      }
    )
  }

  const checkToken = useCallback(async () => {
    const { success, data } = await verifikasiTokenResetPasswordAction(token)

    if (!success || !data.valid) {
      toast.error(
        <Text>Permintaan reset kata sandi tidak valid atau sudah expired.</Text>
      )
      router.replace(authRoutes.login)
    } else {
      setChecking(false)
    }
  }, [router, token])

  useEffect(() => {
    checkToken()
  }, [checkToken])

  if (checking) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Text weight="medium">Sedang melakukan verifikasi...</Text>
        <CgSpinner size={40} className="text-primary animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Title
        as="h2"
        className="text-lg leading-snug mb-4 lg:text-xl xl:text-2xl 2xl:text-3xl"
      >
        Reset Kata Sandi
      </Title>
      <Text
        weight="medium"
        className="xs:text-xs md:text-sm text-gray-700 mb-6"
      >
        Masukkan kata sandi baru kamu
      </Text>
      <Form<ResetPasswordFormSchema>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors } }) => (
          <div className="space-y-6">
            <ControlledPassword
              name="password"
              control={control}
              errors={errors}
              label="Kata Sandi Baru"
              placeholder="Tulis Kata sandi baru Anda di sini"
            />

            <ControlledPassword
              name="ulangiPassword"
              control={control}
              errors={errors}
              label="Ulangi Kata Sandi Baru"
              placeholder="Tulis ulang kata sandi baru Anda di sini"
            />

            {formError && (
              <Alert size="sm" variant="flat" color="danger">
                <Text size="sm" weight="medium">
                  {formError}
                </Text>
              </Alert>
            )}

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Ubah Kata Sandi
            </Button>
          </div>
        )}
      </Form>
    </>
  )
}
