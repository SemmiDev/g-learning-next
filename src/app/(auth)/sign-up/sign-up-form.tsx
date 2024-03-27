'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Password, Checkbox, Button, Input, Text } from 'rizzui'
import { Form } from '@/components/ui/form'
import { publicRoutes } from '@/config/routes'
import toast from 'react-hot-toast'
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
            <div className="col-span-2 flex items-start text-gray-700">
              <Checkbox
                onChange={(e) => setAgreed(e.target.checked)}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" className="ps-1 text-gray">
                    Dengan mendaftar, anda telah menyetujui{' '}
                    <Link
                      href={publicRoutes.term}
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Ketentuan Layanan
                    </Link>{' '}
                    &{' '}
                    <Link
                      href={publicRoutes.privacyPolicy}
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Kebijakan Privasi
                    </Link>{' '}
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
      <Text className="mt-6 font-bold leading-loose md:mt-7 lg:mt-9">
        Sudah punya akun?{' '}
        <Link
          href={publicRoutes.login}
          className="font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Klik di sini untuk masuk
        </Link>
      </Text>
    </>
  )
}
