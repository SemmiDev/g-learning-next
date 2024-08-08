'use client'

import { Button, Form, Input, Text, TextLink } from '@/components/ui'
import { publicRoutes } from '@/config/routes'
import { useMedia } from '@/hooks/use-media'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

const formSchema = z.object({
  email: z.string().pipe(required.email()),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  email?: string
}

const initialValues = {}

export default function LupaPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false)
  const [reset, setReset] = useState({})
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
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
      <Form<FormSchema>
        validationSchema={formSchema}
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
              placeholder="Masukkan email anda"
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
