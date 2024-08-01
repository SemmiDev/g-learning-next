import {
  Button,
  ButtonSubmit,
  ControlledInput,
  ControlledPassword,
  Form,
  ModalFooterButtons,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import logoDikti from '@public/images/logo/dikti.png'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import SinkronCardContainer from './card-container'
import AktifGroupButton from './aktif-group-button'

const formSchema = z.object({
  url: z.string().pipe(required.url()),
  username: z.string().pipe(required),
  password: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  url?: string
  username?: string
  password?: string
}

export default function SinkronDiktiCard({
  className,
}: {
  className?: string
}) {
  const [initialValues, setInitialValues] = useState<FormSchema | null>()
  const [active, setActive] = useState(false)

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <SinkronCardContainer
      logo={logoDikti}
      labelTop="Feeder"
      labelBottom="PDDIKTI"
      bgColor="#1C4B85"
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
                name="url"
                control={control}
                errors={errors}
                label="URL Feeder"
                placeholder="URL Feeder"
              />

              <ControlledInput
                name="username"
                control={control}
                errors={errors}
                label="Username Feeder"
                placeholder="Username Feeder"
              />

              <ControlledPassword
                name="password"
                control={control}
                errors={errors}
                label="Katasandi Feeder"
                placeholder="Katasandi Feeder"
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
