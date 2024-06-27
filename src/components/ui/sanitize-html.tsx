'use client'

import sanitizeHtml from 'sanitize-html'

type OptionsType = {
  allowedTags: string[]
  allowedAttributes: object
  allowedIframeHostnames: string[]
}

type SanitizeHTMLProps = {
  html: string
  options?: sanitizeHtml.IOptions
}

const defaultOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img'],
  allowedAttributes: {
    a: ['href'],
    img: ['src', 'referrerpolicy'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
}

const sanitize = (dirty: string, options?: sanitizeHtml.IOptions) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
})

export const SanitizeHTML = ({ html, options }: SanitizeHTMLProps) => (
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
)
