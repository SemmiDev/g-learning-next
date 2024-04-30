'use client'

import {
  Button,
  Card,
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  ReadMore,
  Text,
} from '@/components/ui'
import { Form } from '@/components/ui/form'
import { routes } from '@/config/routes'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { RiArrowLeftLine } from 'react-icons/ri'

const formSchema = z.object({
  nilai: z.string().pipe(required).pipe(z.coerce.number().min(0).max(100)),
  catatan: z.string().optional(),
})

type FormSchema = {
  nilai?: string | number
  catatan?: string
}

const initialValues: FormSchema = {}

export default function TugasDetailPage() {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={`${routes.kelas}/tugas`}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-5/12">
          <div className="flex space-x-3 py-2 px-4">
            <Image
              src={imagePhoto}
              alt="profile"
              className="w-10 h-10 rounded-md"
            />
            <div className="flex flex-col justify-center">
              <Text weight="semibold" variant="dark">
                Prabroro Janggar
              </Text>
              <Text size="sm" weight="medium" variant="dark">
                13 Des 24 - 13 : 55
              </Text>
            </div>
          </div>
          <CardSeparator />

          <Form<FormSchema>
            onSubmit={onSubmit}
            validationSchema={formSchema}
            useFormProps={{
              mode: 'onSubmit',
              defaultValues: initialValues,
            }}
          >
            {({ control, formState: { errors, isSubmitting } }) => (
              <>
                <div className="space-y-5 p-2">
                  <ControlledInput
                    name="nilai"
                    control={control}
                    errors={errors}
                    type="number"
                    label="Nilai"
                    placeholder="Berikan nilai. Contoh: 80"
                  />
                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    label="Catatan Tambahan"
                    className="col-span-full [&_.ql-editor]:min-h-[150px]"
                    placeholder="Berikan catatan kepada peserta terkait tugas yang dikumpulkan"
                    toolbar="minimalist"
                  />
                </div>
                <CardSeparator />
                <div className="flex gap-2 p-2">
                  <Button
                    type="submit"
                    className="flex-1 text-xs"
                    disabled={isSubmitting}
                  >
                    Simpan Penilaian
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Card>
        <Card className="flex flex-col flex-1 p-2">
          <div className="mb-3">
            <ReadMore className="contents">
              Ini merupakan catatan dari si peserta kelas yang telah membuat
              tugas, jadi ini bisa kosong bisa tidak tergantung pesertanya juga.
            </ReadMore>
          </div>
          THUMBNAIL/ICON FILE
        </Card>
      </div>
    </>
  )
}
