'use client'

import { Button, Form, Text, TextLink } from '@/components/ui'
import { publicRoutes } from '@/config/routes'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Checkbox, Input, Password } from 'rizzui'
import { signUpSchema, SignUpSchema } from './schema'

const initialValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
}

export default function SignUpForm() {
  const [reset, setReset] = useState({})
  const [agreed, setAgreed] = useState(false)
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    console.log(data)

    const fetchData = new Promise((resolve, reject) => {
      setTimeout(Math.floor(Math.random() * 2) ? resolve : reject, 2000)
    })

    await toast.promise(fetchData, {
      loading: <Text>Mendaftar...</Text>,
      success: <Text>Berhasil mendaftar.</Text>,
      error: <Text>Gagal mendaftar!</Text>,
    })

    setReset({ ...initialValues, isAgreed: false })
  }

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors, isSubmitting } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              label="Alamat Email"
              placeholder="Tulis alamat email Anda di sini"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Nama Lengkap"
              placeholder="Tuliskan nama lengkap Anda di sini"
              className="[&>label>span]:font-medium"
              {...register('name')}
              error={errors.name?.message}
            />
            <div className="space-y-5 2xl:grid 2xl:grid-cols-2 2xl:gap-3 2xl:space-y-0">
              <Password
                label="Kata Sandi"
                placeholder="Tulis Kata sandi Anda di sini"
                {...register('password')}
                className="[&>label>span]:font-medium"
                error={errors.password?.message}
              />
              <Password
                label="Ulangi Kata sandi"
                placeholder="Tulis ulang kata sandi Anda di sini"
                {...register('confirmPassword')}
                className="[&>label>span]:font-medium"
                error={errors.confirmPassword?.message}
              />
            </div>
            <div className="col-span-2 flex items-start">
              <Checkbox
                onChange={(e) => setAgreed(e.target.checked)}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" size="sm">
                    Dengan mendaftar, anda telah menyetujui{' '}
                    <TextLink href={publicRoutes.term} weight="semibold">
                      Ketentuan Layanan
                    </TextLink>{' '}
                    &{' '}
                    <TextLink
                      href={publicRoutes.privacyPolicy}
                      weight="semibold"
                    >
                      Kebijakan Privasi
                    </TextLink>{' '}
                    dari Kami
                  </Text>
                }
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={!agreed || isSubmitting}
            >
              Daftar Sekarang
            </Button>
          </div>
        )}
      </Form>
      <Text weight="bold" className="mt-6 leading-loose md:mt-7 lg:mt-9">
        Sudah punya akun?{' '}
        <TextLink href={publicRoutes.login} color="primary" weight="semibold">
          Klik di sini untuk masuk
        </TextLink>
      </Text>
    </>
  )
}
