import { useEffect, useState } from 'react'

export const useAutoSizeLargeModal = () => {
  const [size, setSize] = useState<'lg' | 'full'>('lg')

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSize('full')
    } else {
      setSize('lg')
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
