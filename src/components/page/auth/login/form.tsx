'use client'

import {
  ActionIcon,
  ButtonSubmit,
  Form,
  Modal,
  Text,
  TextLink,
} from '@/components/ui'
import { publicRoutes, routes } from '@/config/routes'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { TbSelect } from 'react-icons/tb'
import { Input, Password } from 'rizzui'

const listUser = [
  {
    level: 'Slicing Pengajar',
    username: 'pengajar@glearning.com',
  },
  { level: 'Slicing Peserta', username: 'peserta@glearning.com' },
  {
    level: 'Slicing Pengguna Akademik',
    username: 'pengguna@glearning.com',
  },
  { level: 'Admin', username: 'admin@gmail.com' },
  { level: 'Instansi', username: 'adminuin' },
  { level: 'Contoh Dosen', username: '1502021102950004' },
  { level: 'Contoh Mahasiswa 1', username: '1502020105060001' },
  { level: 'Contoh Mahasiswa 2', username: '1502082008050001' },
  { level: 'Rizky (Pengguna 1)', username: 'reazon7@gmail.com' },
  {
    level: 'Sammi (Pengguna 2)',
    username: 'sammidev4@gmail.com',
  },
  { level: 'Peserta 1', username: 'peserta1@gmail.com' },
  { level: 'Peserta 2', username: 'peserta2@gmail.com' },
  { level: 'Pengajar 1', username: 'pengajar1@gmail.com' },
]

const formSchema = z.object({
  username: z.string().pipe(required),
  password: z.string().pipe(requiredPassword),
})

type LoginFormSchema = {
  username?: string
  password?: string
}

type LoginFormProps = {
  devMode?: boolean
}

export default function LoginForm({ devMode }: LoginFormProps) {
  const router = useRouter()

  const [showModalUser, setShowModalUser] = useState(false)

  const initialValues: LoginFormSchema = {}

  const doLogin = async (data: LoginFormSchema) => {
    const { ok, error } =
      (await signIn('normalLogin', {
        username: data.username,
        password: data.password,
        redirect: false,
      })) ?? {}

    if (ok) {
      router.replace(routes.dashboard)
    } else {
      throw error
    }
  }

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    await toast.promise(doLogin(data), {
      loading: <Text>Mencoba masuk...</Text>,
      success: <Text>Berhasil masuk.</Text>,
      error: (error) => <Text>{error}</Text>,
    })
  }

  return (
    <>
      <Form<LoginFormSchema>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ register, setValue, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-y-5 lg:gap-y-6">
              <Input
                label="Username/Email"
                placeholder="Tulis username atau email Anda di sini"
                className="[&>label>span]:font-medium"
                {...register('username')}
                error={errors.username?.message}
                suffix={
                  devMode && (
                    <ActionIcon
                      size="sm"
                      variant="flat"
                      onClick={() => setShowModalUser(true)}
                    >
                      <TbSelect />
                    </ActionIcon>
                  )
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
                  href={publicRoutes.lupaPassword}
                  className="h-auto p-0 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>

              <ButtonSubmit
                className="w-full"
                type="submit"
                isSubmitting={isSubmitting}
              >
                Masuk
              </ButtonSubmit>
            </div>

            {devMode && (
              <Modal
                title="Pilih User (Dev Mode)"
                size="sm"
                isOpen={showModalUser}
                onClose={() => setShowModalUser(false)}
                bodyClassName="flex flex-col gap-y-2 p-3"
              >
                {listUser.map(({ level, username }, idx) => (
                  <div
                    className="flex flex-col bg-gray-50/50 rounded-md border border-dashed border-gray-200 cursor-pointer p-2 hover:bg-gray-50"
                    onClick={() => {
                      setValue('username', username)
                      setValue('password', 'password')
                      setShowModalUser(false)
                    }}
                    key={idx}
                  >
                    <Text size="sm" weight="medium">
                      {level}
                    </Text>
                    <Text size="xs" weight="semibold" variant="dark">
                      {username}
                    </Text>
                  </div>
                ))}
              </Modal>
            )}
          </>
        )}
      </Form>

      <Text weight="bold" className="mt-6 leading-loose md:mt-7 lg:mt-9">
        Belum punya Akun?{' '}
        <TextLink href={publicRoutes.daftar} color="primary" weight="semibold">
          Klik di sini untuk mendaftar
        </TextLink>
      </Text>
    </>
  )
}
