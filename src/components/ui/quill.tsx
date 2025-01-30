'use client'

import cn from '@/utils/class-names'
import QuillResizeImage from 'quill-resize-image'
import { useCallback, useRef, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { FieldError } from 'rizzui'
import { PustakaMediaFileType } from '../shared/pustaka-media'
import PilihMediaGambar from '../shared/pustaka-media/pilih-media-gambar'
import Label from './label'
import TextLabel from './text/label'

Quill.register('modules/resize', QuillResizeImage)

export interface QuillEditorProps extends ReactQuill.ReactQuillProps {
  error?: string
  label?: React.ReactNode
  required?: boolean
  className?: string
  labelClassName?: string
  errorClassName?: string
  toolbarPosition?: 'top' | 'bottom'
  toolbar?: 'minimalist' | 'minimalist-image' | 'normal' | 'normal-image'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  noMaxHeight?: boolean
}

export default function QuillEditor({
  id,
  label,
  required,
  error,
  className,
  labelClassName,
  errorClassName,
  tabIndex = 0,
  toolbar = 'normal',
  toolbarPosition = 'top',
  size = 'sm',
  noMaxHeight,
  ...props
}: QuillEditorProps) {
  const [showPilihGambar, setShowPilihGambar] = useState(false)
  const [editorIdx, setEditorIdx] = useState(0)
  const quillRef = useRef(null)

  const imageHandler = useCallback(() => {
    setShowPilihGambar(true)

    const quill: any = quillRef.current
    if (quill) {
      setEditorIdx(quill.editor?.selection?.lastRange?.index ?? 0)
    }
  }, [])

  const onPilihGambar = (file: PustakaMediaFileType) => {
    const quill: any = quillRef.current

    if (quill) {
      quill.getEditor().insertEmbed(editorIdx, 'image', file.link)
    }
  }

  const listToolbar = {
    minimalist: [['bold', 'italic', 'underline', 'strike', 'clean']],
    'minimalist-image': [
      ['bold', 'italic', 'underline', 'strike', 'clean', 'image'],
    ],
    normal: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    'normal-image': [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean', 'image'],
    ],
  }

  const quillModules = {
    toolbar: {
      container: listToolbar[toolbar],
      handlers: {
        image: imageHandler,
      },
    },
    resize: {
      locale: {},
    },
  }

  return (
    <>
      <div
        className={cn(
          'col-span-full',
          {
            '[&_.ql-editor]:min-h-[80px]': size === 'sm',
            '[&_.ql-editor]:min-h-[150px]': size === 'md',
            '[&_.ql-editor]:min-h-[300px]': size === 'lg',
            '[&_.ql-editor]:min-h-[450px]': size === 'xl',
            '[&_.ql-editor]:max-h-none': noMaxHeight,
          },
          className
        )}
      >
        {label && (
          <TextLabel className={cn('mb-1.5', labelClassName)}>
            <Label label={label} required={required} />
          </TextLabel>
        )}
        <ReactQuill
          ref={quillRef}
          modules={quillModules}
          className={cn(
            'react-quill',
            {
              'react-quill-toolbar-bottom relative':
                toolbarPosition === 'bottom',
              '[&>.ql-container]:!border-[1.8px] [&>.ql-container]:!border-danger [&>.ql-toolbar]:!border-b-danger':
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

      {['minimalist-image', 'normal-image'].includes(toolbar) && (
        <PilihMediaGambar
          show={showPilihGambar}
          setShow={setShowPilihGambar}
          onSelect={onPilihGambar}
        />
      )}
    </>
  )
}
