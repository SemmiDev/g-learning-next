import { ControlledInput, Form, ModalFooterButtons } from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import logoGci from '@public/images/logo/gci.png'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import AktifGroupButton from './aktif-group-button'
import SinkronCardContainer from './card-container'

const formSchema = z.object({
  token: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  token?: string
}

export default function SinkronSmartCard({
  className,
}: {
  className?: string
}) {
  const [initialValues, setInitialValues] = useState<FormSchema | null>()
  const [active, setActive] = useState(true)

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <SinkronCardContainer
      logo={logoGci}
      labelTop="Smart"
      labelBottom="Feeder"
      bgColor="#D40000"
      className={className}
    >
      <AktifGroupButton
        active={active}
        onActivate={() => setActive(true)}
        onDeactivate={() => setActive(false)}
      />

      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues ?? {},
        }}
      >
        {({ control, reset, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col space-y-3 p-2">
              <ControlledInput
                name="token"
                control={control}
                errors={errors}
                label="Token Smart Feeder"
                placeholder="Masukkan token di sini"
              />
            </div>

            <ModalFooterButtons
              submit="Sambungkan"
              isSubmitting={isSubmitting}
              cancel="Batal"
              onCancel={() => reset()}
              className="p-2"
            />
          </>
        )}
      </Form>
    </SinkronCardContainer>
  )
}
