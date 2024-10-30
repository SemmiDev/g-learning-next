import { useEffect, useState } from 'react'

export const useWindowLocation = () => {
  const [location, setLocation] = useState<Location>()

  useEffect(() => {
    setLocation(window.location)
  }, [])

  return location
}
