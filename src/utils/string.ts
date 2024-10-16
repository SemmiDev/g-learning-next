import _ from 'lodash'

export const makeParams = (
  object?: Record<string, string | number | undefined>
) => {
  if (!object) return ''

  const params = _.mapValues(object, (val) => (val ?? '') + '')

  return new URLSearchParams(_.pickBy(params, (val) => !!val)).toString()
}

export const makeUrl = (
  url: string,
  params?: Record<string, string | number | undefined>
) => {
  return url + (params ? '?' : '') + makeParams(params)
}

export const cleanQuill = (value: string | undefined) => {
  if (value === '<p><br></p>') return

  return value
}
