import { useEffect, useState } from 'react'

export const useAutoSizeMediumModal = () => {
  const [size, setSize] = useState<'md' | 'full'>('md')

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setSize('full')
    } else {
      setSize('md')
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return size
}
