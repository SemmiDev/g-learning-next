export type AnyObject = Record<string, any>

export type Nullish<T> = { [P in keyof T]: T[P] | null }
