'use client'

import toast from 'react-hot-toast'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Input } from 'rizzui'
import { useMedia } from '@/hooks/use-media'
import { Form } from '@/components/ui/form'
import { publicRoutes } from '@/config/routes'
import { z } from '@/utils/zod-id'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import TextLink from '@/components/ui/text-link'

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
})

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>

const initialValues = {
  email: '',
}

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false)
  const [reset, setReset] = useState({})
  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    console.log(data)

    const fetchData = new Promise((resolve, reject) => {
      setTimeout(Math.floor(Math.random() * 2) ? resolve : reject, 2000)
    })

    toast.promise(fetchData, {
      loading: <Text>Mengirim email...</Text>,
      success: (
        <Text>
          Link untuk reset password berhasil dikirim ke email berikut:{' '}
          <Text as="b" className="font-semibold">
            {data.email}
          </Text>
        </Text>
      ),
      error: <Text>Gagal mengirim email!</Text>,
    })

    setReset(initialValues)
  }

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text weight="semibold" className="mt-6 leading-loose md:mt-7 lg:mt-9">
        Tidak ingin me-reset password?{' '}
        <TextLink href={publicRoutes.login} color="primary" weight="bold">
          Masuk
        </TextLink>
      </Text>
    </>
  )
}
