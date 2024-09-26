'use client'

import {
  Button,
  Card,
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  FileListItem,
  Form,
  PustakaMediaFileType,
  ReadMore,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { LuChevronDown } from 'react-icons/lu'
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

  const files: PustakaMediaFileType[] = [
    {
      id: '1',
      name: 'NamaFile.jpg',
      folder: false,
      size: 50,
      time: '2024-09-20T15:55:35+07:00',
    },
    {
      id: '2',
      name: 'NamaFile.pdf',
      folder: false,
      size: 280,
      time: '2024-09-20T15:55:35+07:00',
    },
    {
      id: '3',
      name: 'NamaFile.ext',
      folder: false,
      size: 500,
      time: '2024-09-20T15:55:35+07:00',
    },
  ]

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={`${routes.pengajar.kelas}/tugas`}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>

      <Card className="flex flex-col mb-4">
        <Title as="h4">Judul Tugas Kedua</Title>
        <Text weight="medium" variant="lighter">
          Keterangan singkat terkait tugasnya
        </Text>
      </Card>

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
            <Card className="flex flex-col justify-between items-center gap-2 mb-4 lg:flex-row">
              <div
                className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-8/12"
                onClick={() => {}}
              >
                <div className="flex items-center space-x-2">
                  <figure className="flex justify-center items-center size-12 rounded overflow-clip">
                    <Image
                      src={imagePhoto}
                      alt="profil"
                      className="object-cover"
                    />
                  </figure>
                  <Text weight="semibold" variant="dark">
                    Prabroro Janggar
                  </Text>
                </div>
                <div className="flex items-center space-x-4">
                  <Text weight="semibold" variant="lighter">
                    Sudah Dinilai
                  </Text>
                  <LuChevronDown size={24} />
                </div>
              </div>
              <div className="flex justify-end flex-1">
                <Button type="submit" disabled={isSubmitting}>
                  Simpan Penilaian
                </Button>
              </div>
            </Card>

            <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
              <Card className="flex flex-col flex-1 p-0">
                <div className="flex flex-col p-2">
                  <Text weight="semibold" variant="dark">
                    Tugas yang dikumpulkan
                  </Text>
                  <Text size="xs" weight="medium" variant="lighter">
                    Dikumpulkan pada 13 Desember 2024 - 15:36
                  </Text>
                </div>
                <CardSeparator />
                <div className="p-2">
                  <ReadMore className="contents">
                    Ini merupakan catatan atau tulisan dari yang mengumpulkan
                    tugas di LMS. Ini merupakan catatan atau tulisan dari yang
                    mengumpulkan tugas di LMS. Ini merupakan catatan atau
                    tulisan dari yang mengumpulkan tugas di LMS.
                  </ReadMore>
                  <div className="flex flex-col space-y-2 mt-4">
                    {files.map((file, idx) => (
                      <FileListItem file={file} key={idx} download />
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="flex flex-col p-0 w-full lg:w-5/12">
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
                    toolbar="minimalist"
                    size="md"
                    label="Catatan Tambahan"
                    placeholder="Berikan catatan kepada peserta terkait tugas yang dikumpulkan"
                  />
                </div>
              </Card>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
