import { useEffect, useState } from 'react'

export const useAutoSizeExtraLargeModal = () => {
  const [size, setSize] = useState<'xl' | 'full'>('xl')

  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setSize('full')
    } else {
      setSize('xl')
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return size
}
