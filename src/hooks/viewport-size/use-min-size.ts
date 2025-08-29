import { DocumentSizeType, useViewportSize } from './use-size'

export const useMinViewportSize = (
  minSize: Exclude<DocumentSizeType, '2xs'> = 'xs'
) => {
  const size = useViewportSize()

  return (
    (minSize === 'xs' && size !== '2xs') ||
    (minSize === 'sm' &&
      ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(size)) ||
    (minSize === 'md' &&
      ['md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(size)) ||
    (minSize === 'lg' && ['lg', 'xl', '2xl', '3xl', '4xl'].includes(size)) ||
    (minSize === 'xl' && ['xl', '2xl', '3xl', '4xl'].includes(size)) ||
    (minSize === '2xl' && ['2xl', '3xl', '4xl'].includes(size)) ||
    (minSize === '3xl' && ['3xl', '4xl'].includes(size)) ||
    (minSize === '4xl' && size === '4xl')
  )
}
