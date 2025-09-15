import { AnyObject } from './type-interface'

export function getLocalStorage(key: string, defaultValue: AnyObject) {
  try {
    const saved = localStorage.getItem(key)

    return saved ? JSON.parse(saved) : defaultValue
  } catch (error) {}

  return defaultValue
}

export function setLocalStorage(key: string, value: AnyObject) {
  localStorage.setItem(key, JSON.stringify(value))
}
