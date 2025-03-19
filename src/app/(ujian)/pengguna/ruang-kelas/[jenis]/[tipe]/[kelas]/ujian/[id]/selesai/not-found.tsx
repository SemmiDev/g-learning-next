import NotFound from '@/app/not-found'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('404 - Not Found'),
}

export default function NotFoundPage() {
  return <NotFound />
}
