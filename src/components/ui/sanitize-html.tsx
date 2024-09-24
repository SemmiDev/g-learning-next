'use client'

import cn from '@/utils/class-names'
import sanitizeHtml, { IOptions } from 'sanitize-html'

const defaultOptions: IOptions = {
  allowedTags: ['p', 'b', 'i', 'em', 'u', 's', 'strong', 'a', 'img'],
  allowedAttributes: {
    a: ['href'],
    img: ['src', 'referrerpolicy'],
    li: ['data-list'],
    '*': ['class', 'style'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
}

const sanitize = (dirty: string, options?: IOptions) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
})

type SanitizeHTMLProps = {
  html: string
  className?: string
  fromQuill?: boolean
  options?: sanitizeHtml.IOptions
}

export const SanitizeHTML = ({
  html,
  className,
  fromQuill = true,
  options,
}: SanitizeHTMLProps) => (
  <div
    dangerouslySetInnerHTML={sanitize(html, options)}
    className={cn('sanitized-html', { 'ql-editor': fromQuill }, className)}
  />
)
