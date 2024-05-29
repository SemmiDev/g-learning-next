'use client'

import cn from '@/utils/class-names'
import { useCallback, useRef } from 'react'
import ReactQuill, { type ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FieldError } from 'rizzui'
import TextLabel from './text/label'

export interface QuillEditorProps extends ReactQuillProps {
  error?: string
  label?: React.ReactNode
  className?: string
  labelClassName?: string
  errorClassName?: string
  toolbarPosition?: 'top' | 'bottom'
  toolbar?: 'minimalist' | 'minimalist-image' | 'normal'
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
  const quillRef = useRef(null)
  const imageHandler = useCallback(() => {
    const quill: any = quillRef.current
    if (quill) {
      const editor = quill.getEditor()
      editor.insertEmbed(
        0,
        'image',
        'https://oyster.ignimgs.com/mediawiki/apis.ign.com/monster-hunter-rise/7/70/Monster_Hunter_Rise_-_Monsters_2021-03-27_00-00-56.png'
      )
    }
  }, [])

  const listToolbar =
    toolbar === 'minimalist'
      ? [['bold', 'italic', 'underline', 'strike', 'clean']]
      : toolbar === 'minimalist-image'
      ? [['bold', 'italic', 'underline', 'strike', 'clean', 'image']]
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
    toolbar: {
      container: listToolbar,
      handlers: {
        image: imageHandler,
      },
    },
  }

  return (
    <div className={cn(className)}>
      {label && (
        <TextLabel className={cn('mb-1.5', labelClassName)}>{label}</TextLabel>
      )}
      <ReactQuill
        ref={quillRef}
        modules={quillModules}
        className={cn(
          'react-quill',
          {
            'react-quill-toolbar-bottom relative': toolbarPosition === 'bottom',
            '[&>.ql-container]:!border-[1.8px] [&>.ql-container]:!border-red [&>.ql-toolbar]:!border-b-red':
              error,
          },
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
