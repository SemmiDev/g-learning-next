'use client'

import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { Password, Input } from 'rizzui'
import { publicRoutes, routes } from '@/config/routes'
import toast from 'react-hot-toast'
import { LoginSchema, loginSchema } from './schema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'
import {
  ActionIcon,
  Button,
  Form,
  Modal,
  Text,
  TextLink,
} from '@/components/ui'
import { TbSelect } from 'react-icons/tb'
import { useState } from 'react'

const initialValues: LoginSchema = {
  email: 'peserta@gmail.com',
  password: '123',
}

export default function LoginForm() {
  const router = useRouter()

  const [showModalUser, setShowModalUser] = useState(false)

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
        {({ register, setValue, formState: { errors, isSubmitting } }) => (
          <>
            <div className="space-y-5 lg:space-y-6">
              <Input
                type="email"
                label="Alamat Email"
                placeholder="Tulis alamat email Anda di sini"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
                suffix={
                  <ActionIcon
                    size="sm"
                    variant="flat"
                    onClick={() => setShowModalUser(true)}
                  >
                    <TbSelect />
                  </ActionIcon>
                }
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

            <Modal
              title="Pilih User (Dev Mode)"
              size="sm"
              isOpen={showModalUser}
              onClose={() => setShowModalUser(false)}
              bodyClassName="flex flex-col space-y-2 p-3"
            >
              {[
                { level: 'Pengajar', email: 'pengajar@gmail.com' },
                { level: 'Peserta', email: 'peserta@gmail.com' },
              ].map(({ level, email }, idx) => (
                <div
                  className="flex flex-col bg-gray-50/50 rounded-md border border-dashed border-gray-200 cursor-pointer p-2 hover:bg-gray-50"
                  onClick={() => {
                    setValue('email', email)
                    setShowModalUser(false)
                  }}
                  key={idx}
                >
                  <Text size="sm" weight="medium">
                    {level}
                  </Text>
                  <Text size="xs" weight="semibold" variant="dark">
                    {email}
                  </Text>
                </div>
              ))}
            </Modal>
          </>
        )}
      </Form>

      <Text weight="bold" className="mt-6 leading-loose md:mt-7 lg:mt-9">
        Belum punya Akun?{' '}
        <TextLink href={publicRoutes.signUp} color="primary" weight="semibold">
          Klik di sini untuk mendaftar
        </TextLink>
      </Text>
    </>
  )
}
