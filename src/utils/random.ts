export const randomString = (length: number) => {
  return Array.apply(0, Array(length))
    .map(function () {
      return (function (charset) {
        return charset.charAt(Math.floor(Math.random() * charset.length))
      })('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
    })
    .join('')
}
