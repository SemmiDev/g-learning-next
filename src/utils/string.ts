import _ from 'lodash'

export const makeParams = (
  object?: Record<string, string | number | undefined>
) => {
  if (!object) return ''

  return new URLSearchParams(
    _.mapValues(object, (val) => (val ?? '') + '')
  ).toString()
}

export const makeUrl = (
  url: string,
  params?: Record<string, string | number | undefined>
) => {
  return url + (params ? '?' : '') + makeParams(params)
}
