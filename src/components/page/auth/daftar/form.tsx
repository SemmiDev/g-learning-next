'use client'

import { daftarAction } from '@/actions/auth/daftar'
import {
  ButtonSubmit,
  ControlledInput,
  ControlledPassword,
  Form,
  FormError,
  Text,
  TextLink,
} from '@/components/ui'
import { authRoutes, publicRoutes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useRouter } from '@bprogress/next/app'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Checkbox } from 'rizzui'

const formSchema = z
  .object({
    email: z.string().pipe(required.email()),
    nama: z.string().pipe(required),
    password: z.string().pipe(requiredPassword),
    ulangiPassword: z.string().pipe(requiredPassword),
  })
  .refine((data) => data.password === data.ulangiPassword, {
    message: 'Kata sandi dan ulangi kata sandi harus sama.',
    path: ['ulangiPassword'],
  })

export type DaftarFormSchema = {
  email?: string
  nama?: string
  password?: string
  ulangiPassword?: string
}

const initialValues = {}

export default function DaftarForm() {
  const router = useRouter()

  const [agreed, setAgreed] = useState(false)
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<DaftarFormSchema> = async (data) => {
    await handleActionWithToast(daftarAction(data), {
      loading: 'Mendaftar...',
      onStart: () => setFormError(undefined),
      onSuccess: () => router.push(authRoutes.login),
      onError: ({ error }) => setFormError(error),
    })
  }

  return (
    <>
      <Form<DaftarFormSchema>
        validationSchema={formSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <div className="flex flex-col gap-y-5 lg:gap-y-6">
            <ControlledInput
              name="email"
              control={control}
              errors={errors}
              type="email"
              label="Alamat Email"
              placeholder="Tulis alamat email Anda di sini"
            />

            <ControlledInput
              name="nama"
              control={control}
              errors={errors}
              label="Nama Lengkap"
              placeholder="Tuliskan nama lengkap Anda di sini"
            />

            <div className="flex flex-col gap-y-5 2xl:grid 2xl:grid-cols-2 2xl:gap-3 2xl:gap-y-0">
              <ControlledPassword
                name="password"
                control={control}
                errors={errors}
                label="Kata Sandi"
                placeholder="Tulis Kata sandi Anda di sini"
              />

              <ControlledPassword
                name="ulangiPassword"
                control={control}
                errors={errors}
                label="Ulangi Kata sandi"
                placeholder="Tulis ulang kata sandi Anda di sini"
              />
            </div>

            <div className="col-span-2 flex items-start">
              <Checkbox
                onChange={(e) => setAgreed(e.target.checked)}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" size="sm">
                    Dengan mendaftar, anda telah menyetujui{' '}
                    <TextLink
                      href={publicRoutes.term}
                      weight="semibold"
                      target="_blank"
                    >
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
                }
              />
            </div>

            <FormError error={formError} />

            <ButtonSubmit
              className="w-full"
              disabled={!agreed}
              isSubmitting={isSubmitting}
            >
              Daftar Sekarang
            </ButtonSubmit>
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
