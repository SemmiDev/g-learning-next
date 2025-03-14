import { ActionIcon, Textarea, Thumbnail } from '@/components/ui'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import cn from '@/utils/class-names'
import { ChangeEventHandler } from 'react'
import { BsFillSendFill } from 'react-icons/bs'

type FormKomentarProps = {
  onSend: () => void
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  disabled?: boolean
  autoFocus?: boolean
  className?: string
}

export default function FormKomentar({
  onSend,
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  className,
}: FormKomentarProps) {
  const { image: imagePengguna, name: namaPengguna } = useSessionPengguna()

  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      <Thumbnail
        src={imagePengguna || undefined}
        alt="profil"
        size={32}
        avatar={namaPengguna ?? ''}
        rounded="md"
      />
      <Textarea
        className="flex-1"
        rows={2}
        placeholder="Tulis Komentar..."
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      ></Textarea>
      <ActionIcon
        size="sm"
        variant="outline"
        onClick={() => onSend()}
        disabled={disabled || !value}
      >
        <BsFillSendFill size={12} />
      </ActionIcon>
    </div>
  )
}
