import { useEffect, useState } from 'react'

export type DocumentSizeType =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

export const useViewportSize = () => {
  const [size, setSize] = useState<DocumentSizeType>('2xs')

  const handleResize = () => {
    if (window.innerWidth < 480) {
      setSize('2xs')
    } else if (window.innerWidth < 640) {
      setSize('xs')
    } else if (window.innerWidth < 768) {
      setSize('sm')
    } else if (window.innerWidth < 1024) {
      setSize('md')
    } else if (window.innerWidth < 1280) {
      setSize('lg')
    } else if (window.innerWidth < 1536) {
      setSize('xl')
    } else if (window.innerWidth < 1920) {
      setSize('2xl')
    } else if (window.innerWidth < 2560) {
      setSize('3xl')
    } else {
      setSize('4xl')
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
