export type AnyObject = Record<string, any>

export type Nullish<T> = { [P in keyof T]: T[P] | null }

export type RemainingParams<T extends (...args: any[]) => any> = T extends (
  arg1: any,
  ...rest: infer R
) => any
  ? R
  : never
