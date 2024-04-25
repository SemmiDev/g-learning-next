import ReactQuill, { type ReactQuillProps } from 'react-quill'
import { FieldError } from 'rizzui'
import cn from '@/utils/class-names'
import 'react-quill/dist/quill.snow.css'

interface QuillEditorProps extends ReactQuillProps {
  error?: string
  label?: React.ReactNode
  className?: string
  labelClassName?: string
  errorClassName?: string
  toolbarPosition?: 'top' | 'bottom'
  toolbar?: 'minimalist' | 'normal'
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  tabIndex = 0,
  toolbar = 'normal',
  toolbarPosition = 'top',
  ...props
}: QuillEditorProps) {
  const listToolbar =
    toolbar === 'minimalist'
      ? [['bold', 'italic', 'underline', 'strike', 'clean']]
      : [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
        ]
  const quillModules = {
    toolbar: listToolbar,
  }

  return (
    <div className={cn(className)}>
      {label && (
        <label
          className={cn(
            'text-gray-dark font-semibold mb-1.5 block',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <ReactQuill
        modules={quillModules}
        className={cn(
          'react-quill',
          toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
          className
        )}
        tabIndex={tabIndex}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
}
