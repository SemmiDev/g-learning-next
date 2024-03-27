'use client'

import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { Password, Button, Input, Text } from 'rizzui'
import { Form } from '@/components/ui/form'
import { publicRoutes, routes } from '@/config/routes'
import toast from 'react-hot-toast'
import { LoginSchema, loginSchema } from './schema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'

const initialValues: LoginSchema = {
  email: 'anto@gmail.com',
  password: 'admin123',
}

export default function LoginForm() {
  const router = useRouter()

  const doLogin = async (data: LoginSchema) => {
    const resLogin = await signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: false,
    })

    if (resLogin?.ok) {
      router.replace(routes.dashboard)
    } else {
      throw new Error()
    }
  }

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    console.log('data di client', data)

    await toast.promise(doLogin(data), {
      loading: <Text>Mencoba masuk...</Text>,
      success: <Text>Berhasil masuk.</Text>,
      error: <Text>Username atau password salah!</Text>,
    })
  }

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onSubmit',
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
            <Password
              label="Kata Sandi"
              placeholder="Tulis Kata sandi Anda di sini"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-end pb-1">
              <Link
                href={publicRoutes.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Lupa Kata Sandi?
              </Link>
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Masuk
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 font-bold leading-loose md:mt-7 lg:mt-9">
        Belum punya Akun?{' '}
        <Link
          href={publicRoutes.signUp}
          className="font-semibold transition-colors text-primary hover:text-primary-dark"
        >
          Klik di sini untuk mendaftar
        </Link>
      </Text>
    </>
  )
}
