'use client'

import KomentarSectionShort from '@/components/page/peserta/ruang-kelas/kelas/diskusi/komentar-section-short'
import FileListItem, {
  FileListItemType,
} from '@/components/shared/file/file-list-item'
import {
  Button,
  ButtonSubmit,
  Card,
  CardSeparator,
  ControlledQuillEditor,
  ControlledUploadFile,
  Form,
  ReadMore,
  Text,
  TextSpan,
  Title,
  UploadFileType,
} from '@/components/ui'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { RiArrowLeftLine } from 'react-icons/ri'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { objectRequired } from '@/utils/validations/refine'
import { BsPlusCircle } from 'react-icons/bs'

const formSchema = z.object({
  berkas: z.any().superRefine(objectRequired),
  catatan: z.string().optional(),
})

type FormSchema = {
  berkas?: UploadFileType
  catatan?: string
}

const initialValues: FormSchema = {}

export default function DiskusiDetailTugasPage() {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  const files: FileListItemType[] = [
    {
      name: 'NamaFile.jpg',
      size: 50,
    },
    {
      name: 'NamaFile.pdf',
      size: 280,
    },
    {
      name: 'NamaFile.ext',
      size: 500,
    },
  ]

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.peserta.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-7/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Tugas
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah tugas yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
              <Text size="sm" weight="semibold" variant="dark" className="mt-2">
                Batas Waktu Pengumpulan:{' '}
                <TextSpan color="danger">13 April 2024, 23:59 WIB </TextSpan>
              </Text>
            </div>
          </div>
          <CardSeparator />
          <div className="flex flex-col space-y-2 p-2">
            {files.map((file, idx) => (
              <FileListItem file={file} download key={idx} />
            ))}
          </div>
          <CardSeparator />
          <KomentarSectionShort className="p-4" />
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
            Tugas Kamu
          </Title>
          <CardSeparator />
          <div className="flex justify-between p-2">
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                Catatan dari pengajar
              </Text>
              <Text size="sm" variant="dark">
                Ini adalah catatan dari pengajar
              </Text>
            </div>
            <div className="flex flex-col items-center bg-green-100 w-24 rounded-md p-3">
              <Text size="sm" weight="medium" variant="lighter">
                Nilai
              </Text>
              <Text size="3xl" weight="bold" variant="dark" className="mt-1">
                100
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
                <div className="flex flex-col p-2">
                  <ControlledUploadFile
                    name="berkas"
                    control={control}
                    errors={errors}
                    className="mb-2"
                    containerClassName="bg-gray-50/40 border-solid"
                  >
                    <div className="flex justify-center items-center space-x-1">
                      <Text size="sm" weight="semibold" color="primary">
                        Tambah Berkas
                      </Text>
                      <BsPlusCircle className="text-primary" />
                    </div>
                  </ControlledUploadFile>
                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    toolbar="minimalist"
                    minHeight={150}
                    label="Catatan"
                    placeholder="Tulis catatan terkait tugas yang kamu kumpulkan"
                  />
                </div>
                <CardSeparator />
                <div className="flex flex-col p-2">
                  <ButtonSubmit isSubmitting={isSubmitting}>
                    Kumpulkan Tugas
                  </ButtonSubmit>
                </div>
              </>
            )}
          </Form>
        </Card>
      </div>
    </>
  )
}
