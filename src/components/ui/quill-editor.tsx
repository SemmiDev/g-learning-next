'use client'

import ReactQuill, { type ReactQuillProps } from 'react-quill'
import { FieldError } from 'rizzui'
import cn from '@/utils/class-names'
import 'react-quill/dist/quill.snow.css'
// import { useCallback, useRef } from 'react'

export interface QuillEditorProps extends ReactQuillProps {
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
  // const quillRef = useRef(null)
  // const imageHandler = useCallback(() => {
  //   const quill: any = quillRef.current
  //   if (quill) {
  //     const editor = quill.getEditor()
  //     editor.insertEmbed(
  //       0,
  //       'image',
  //       'https://oyster.ignimgs.com/mediawiki/apis.ign.com/monster-hunter-rise/7/70/Monster_Hunter_Rise_-_Monsters_2021-03-27_00-00-56.png'
  //     )
  //   }
  // }, [])

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
          // ['link', 'image'],
          ['clean'],
        ]

  const quillModules = {
    toolbar: {
      container: listToolbar,
      // handlers: {
      //   image: imageHandler,
      // },
    },
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
        // ref={quillRef}
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
