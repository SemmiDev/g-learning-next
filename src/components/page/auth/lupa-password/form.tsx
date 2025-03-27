'use client'

import { resetPasswordAction } from '@/actions/auth/reset-password'
import {
  Button,
  ControlledInput,
  Form,
  FormError,
  Text,
  TextLink,
} from '@/components/ui'
import { authRoutes, publicRoutes } from '@/config/routes'
import { useMedia } from '@/hooks/use-media'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  email: z.string().pipe(required.email()),
})

export type LupaPassowrdFormSchema = {
  email?: string
}

const initialValues = {}

export default function LupaPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false)
  const router = useRouter()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<LupaPassowrdFormSchema> = async (data) => {
    await handleActionWithToast(resetPasswordAction(data), {
      loading: 'Mengirim email...',
      onStart: () => setFormError(undefined),
      onSuccess: () => router.push(authRoutes.login),
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <>
      <Form<LupaPassowrdFormSchema>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors } }) => (
          <div className="flex flex-col gap-y-6">
            <ControlledInput
              name="email"
              control={control}
              errors={errors}
              type="email"
              label="Alamat Email"
              placeholder="Tulis alamat email Anda di sini"
            />

            <FormError error={formError} />

            <Button type="submit" className="w-full">
              Reset Kata Sandi
            </Button>
          </div>
        )}
      </Form>
      <Text weight="semibold" className="mt-6 leading-loose md:mt-7 lg:mt-9">
        Tidak ingin me-reset kata sandi?{' '}
        <TextLink href={publicRoutes.login} color="primary" weight="bold">
          Masuk
        </TextLink>
      </Text>
    </>
  )
}
