'use client'

import {
  Button,
  Card,
  CardSeparator,
  ControlledQuillEditor,
  ControlledRadio,
  Form,
  Text,
  TextLabel,
  Title,
} from '@/components/ui'
import ButtonSubmit from '@/components/ui/button/submit'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { removeFromList } from '@/utils/list'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs'
import { ActionIcon, FieldError } from 'rizzui'

const formSchema = z.object({
  soal: z.string().pipe(required),
  jawaban: z.array(z.string().pipe(required)),
  benar: z.string({ required_error: 'Pilihan jawaban wajib dipilih' }),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  soal?: string
  jawaban: string[]
  benar?: string
}

const initialValues: FormSchema = {
  jawaban: ['', '', ''],
}

const abc = ['A', 'B', 'C', 'D', 'E', 'F']

export default function KelolaSoalBody() {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  const listSoal = [...Array(20)].map((_, idx) => ({
    soal: '<p>hjabsd <b>asjkd</b> hjbs</p>',
    jawaban: [...Array(4)].map((_, idx) => '<p>etref <b>xss</b> wwqa</p>'),
  }))

  return (
    <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-start">
      <div className="flex flex-col gap-4 w-full">
        <Card className="flex flex-col p-0">
          <Form<FormSchema>
            onSubmit={onSubmit}
            validationSchema={formSchema}
            useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
          >
            {({
              control,
              watch,
              setValue,
              formState: { errors, isSubmitting },
            }) => (
              <>
                <div className="flex justify-between items-center space-x-2 p-2">
                  <Title as="h6" weight="semibold">
                    Soal Nomor 21
                  </Title>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Import Soal
                    </Button>
                    <ButtonSubmit size="sm" isSubmitting={isSubmitting}>
                      Tambah Soal
                    </ButtonSubmit>
                  </div>
                </div>
                <CardSeparator />
                <div className="flex flex-col space-y-3 p-2">
                  <ControlledQuillEditor
                    name="soal"
                    control={control}
                    errors={errors}
                    label="Soal"
                    placeholder="Deskripsi soal"
                    toolbar="minimalist-image"
                    className="col-span-full [&_.ql-editor]:min-h-[150px]"
                  />

                  <div className="space-y-2">
                    <div>
                      <TextLabel>Pilihan Jawaban</TextLabel>
                      {errors.benar?.message && (
                        <FieldError size="md" error={errors.benar?.message} />
                      )}
                    </div>
                    {watch('jawaban')?.map((item, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <ControlledRadio
                          name="benar"
                          control={control}
                          value={abc[idx]}
                        />
                        <ControlledQuillEditor
                          name={`jawaban.${idx}`}
                          control={control}
                          placeholder="Deskripsi jawaban"
                          toolbar="minimalist-image"
                          className="flex-1"
                          error={errors.jawaban?.[idx]?.message}
                        />
                        {watch('jawaban').length > 3 && (
                          <ActionIcon
                            size="sm"
                            variant="outline"
                            className="hover:border-red-lighter hover:text-red"
                            onClick={() => {
                              if (watch('jawaban').length <= 3) return

                              setValue(
                                'jawaban',
                                removeFromList(watch('jawaban'), idx)
                              )
                            }}
                          >
                            <BsTrash />
                          </ActionIcon>
                        )}
                      </div>
                    ))}

                    {watch('jawaban').length < abc.length && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (watch('jawaban').length >= abc.length) return

                          setValue('jawaban', [...watch('jawaban'), ''])
                        }}
                      >
                        <BsPlus size={20} className="mr-2" />
                        Tambah Pilihan Jawaban
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </Form>
        </Card>

        {listSoal.map((soal, idx) => (
          <Card className="flex flex-col p-0" key={idx}>
            <div className="flex justify-between items-center space-x-2 p-2">
              <Title as="h6" weight="semibold">
                Soal Nomor {idx + 1}
              </Title>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" color="warning">
                  <BsPencil className="mr-1" />
                  Ubah Soal
                </Button>
                <Button size="sm" variant="outline" color="danger">
                  <BsTrash className="mr-1" />
                  Hapus Soal
                </Button>
              </div>
            </div>
            <CardSeparator />
            <div className="flex flex-col space-y-3 p-2">
              <SanitizeHTML html={soal['soal']} />
              <div className="flex flex-col space-y-1">
                {soal['jawaban'].map((jawaban, jIdx) => (
                  <div
                    className="flex space-x-1 items-center"
                    key={`${idx}${jIdx}`}
                  >
                    <Text weight="bold">{abc[jIdx]}. </Text>
                    <SanitizeHTML html={jawaban} />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col lg:w-4/12 p-0">
        <div className="flex flex-col p-2">
          <Title as="h6" weight="semibold">
            Judul Soal
          </Title>
          <Text size="sm" weight="medium" variant="lighter">
            Deskripsi singkatnya di sini
          </Text>
        </div>
        <CardSeparator />
        <div className="flex flex-col space-y-2 p-2">
          <Text
            size="sm"
            weight="semibold"
            variant="dark"
            className="text-center"
          >
            Soal yang sudah dibuat
          </Text>
          <div className="grid grid-cols-10 gap-2 lg:grid-cols-5">
            {listSoal.map((_, idx) => (
              <div className="flex justify-center items-center" key={idx}>
                <Button size="sm" variant="outline" className="size-8">
                  {idx + 1}
                </Button>
              </div>
            ))}
            <div className="flex justify-center items-center">
              <Button size="sm" variant="solid" className="size-8">
                {listSoal.length + 1}
              </Button>
            </div>
          </div>
        </div>
        <CardSeparator />
        <div className="flex flex-col p-2">
          <ButtonSubmit size="sm">Simpan Soal</ButtonSubmit>
        </div>
      </Card>
    </div>
  )
}
