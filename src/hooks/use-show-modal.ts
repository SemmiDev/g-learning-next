import { useState } from 'react'

export function useShowModal<T>() {
  const [show, setShow] = useState(false)
  const [key, setKey] = useState<T>()

  const doShow = (showKey: T) => {
    setShow(true)
    setKey(showKey)
  }

  const doHide = () => {
    setShow(false)
    setTimeout(() => setKey(undefined), 300)
  }

  return {
    show,
    key,
    doShow,
    doHide,
  }
}
