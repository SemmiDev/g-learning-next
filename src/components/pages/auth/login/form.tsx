'use client'

import {
  ActionIcon,
  Button,
  ButtonSubmit,
  Form,
  Modal,
  Text,
  TextLink,
} from '@/components/ui'
import { publicRoutes, routes } from '@/config/routes'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { useMinViewportSize } from '@/hooks/viewport-size/use-min-size'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useRouter } from '@bprogress/next/app'
import MTCaptcha from 'mt-react-captcha'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuCheck, LuRefreshCw } from 'react-icons/lu'
import { TbSelect } from 'react-icons/tb'
import { Input, Password } from 'rizzui'

const formSchema = z
  .object({
    username: z.string().pipe(required),
    password: z.string().pipe(requiredPassword),
    useCaptcha: z.boolean(),
    captcha: z.boolean(),
  })
  .refine((data) => !data['useCaptcha'] || data['captcha'], {
    message: 'Captcha tidak valid.',
    path: ['captcha'],
  })

type LoginFormSchema = {
  username?: string
  password?: string
  useCaptcha?: boolean
  captcha?: boolean
  inputCaptcha?: string
}

type Attempt = {
  count: number
  time: number
}

const maxFailedAttempt = 3

type LoginFormProps = {
  testingUsers?: {
    level: string
    username: string
    password?: string
  }[]
}

export default function LoginForm({ testingUsers }: LoginFormProps) {
  const router = useRouter()
  const atMinSizeXs = useMinViewportSize('xs')

  const [failedAttempt, setFailedAttempt] = useLocalStorage<Attempt>(
    'failed-attempt',
    {
      count: 0,
      time: 0,
    }
  )
  const [reloadCaptcha, setReloadCaptcha] = useState(false)
  const [resetValues, setResetValues] = useState<LoginFormSchema>()
  const [showModalUser, setShowModalUser] = useState(false)

  const [callbackUrl] = useQueryState('callbackUrl')

  const initialValues: LoginFormSchema = {
    useCaptcha: false,
    captcha: false,
    inputCaptcha: '',
  }

  const doLogin = async (data: LoginFormSchema) => {
    const { ok, error } =
      (await signIn('normalLogin', {
        username: data.username,
        password: data.password,
        redirect: false,
      })) ?? {}

    if (ok) {
      router.replace(callbackUrl ?? routes.dashboard)
    } else {
      const failedCount = !failedAttempt.count ? 1 : failedAttempt.count + 1

      setFailedAttempt({
        count: failedCount,
        time: Date.now(),
      })
      setResetValues({
        ...data,
        useCaptcha: failedCount >= maxFailedAttempt,
        captcha: false,
        inputCaptcha: '',
      })
      setReloadCaptcha(true)

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

  useEffect(() => {
    if (reloadCaptcha) {
      setTimeout(() => setReloadCaptcha(false), 500)
    }
  }, [reloadCaptcha])

  useEffect(() => {
    if (Date.now() - failedAttempt.time > 5 * 60 * 1000) {
      setFailedAttempt({
        count: 0,
        time: 0,
      })
    } else if (failedAttempt.count >= maxFailedAttempt) {
      setResetValues({
        ...initialValues,
        useCaptcha: true,
      })
    }
  }, [])

  return (
    <>
      <Form<LoginFormSchema>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        resetValues={resetValues}
      >
        {({
          control,
          register,
          watch,
          setValue,
          trigger,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-y-5 lg:gap-y-6">
              <Input
                label="Username/Email"
                placeholder="Tulis username atau email Anda di sini"
                className="[&>label>span]:font-medium"
                {...register('username')}
                error={errors.username?.message}
                suffix={
                  testingUsers && (
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

              {watch('useCaptcha') && (
                <Controller
                  name="inputCaptcha"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <div className="flex gap-2">
                      <div className="relative">
                        {watch('captcha') ? (
                          <div className="absolute top-0 right-0 p-1">
                            <LuCheck className="size-4 text-success" />
                          </div>
                        ) : (
                          <Button
                            variant="text"
                            size="sm"
                            className="absolute top-0 right-0 min-h-6 py-0 px-1.5"
                            onClick={() => setReloadCaptcha(true)}
                          >
                            <LuRefreshCw />
                          </Button>
                        )}
                        <MTCaptcha
                          length={5}
                          mode="numbersOnly"
                          fontSize={58}
                          fontWeight={600}
                          height={40}
                          width={atMinSizeXs ? 200 : 150}
                          userText={value}
                          onValidate={(val) => {
                            if (!watch('captcha') && val) {
                              setValue('captcha', val)
                              trigger('captcha')
                            }
                          }}
                          regenerate={reloadCaptcha}
                        />
                      </div>

                      <Input
                        placeholder="Masukkan angka di samping"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full"
                        disabled={watch('captcha')}
                        error={errors.captcha?.message}
                      />
                    </div>
                  )}
                />
              )}

              <div className="flex items-center justify-end pb-1">
                <Link
                  href={publicRoutes.lupaPassword}
                  className="h-auto p-0 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>

              <ButtonSubmit
                type="submit"
                className="w-full"
                isSubmitting={isSubmitting}
              >
                Masuk
              </ButtonSubmit>
            </div>

            {testingUsers && (
              <Modal
                title="Pilih User (Dev Mode)"
                size="sm"
                isOpen={showModalUser}
                onClose={() => setShowModalUser(false)}
                bodyClassName="flex flex-col gap-y-2 max-h-[80dvh] overflow-y-auto p-3"
              >
                {testingUsers.map(({ level, username, password }, idx) => (
                  <div
                    className="flex flex-col bg-gray-50/50 rounded-md border border-dashed border-gray-200 cursor-pointer p-2 hover:bg-gray-50"
                    onClick={() => {
                      setValue('username', username)
                      setValue('password', password ?? 'password')
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
      <Text as="span" size="sm">
        Lihat{' '}
        <TextLink href={publicRoutes.term} weight="semibold" target="_blank">
          Ketentuan Layanan
        </TextLink>{' '}
        &{' '}
        <TextLink
          href={publicRoutes.privacyPolicy}
          weight="semibold"
          target="_blank"
        >
          Kebijakan Privasi
        </TextLink>{' '}
        dari Kami
      </Text>
    </>
  )
}
