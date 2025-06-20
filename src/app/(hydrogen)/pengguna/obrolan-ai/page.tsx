import ObrolanAiBody from '@/components/pages/pengguna/obrolan-ai/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Obrolan AI'),
}

const pageHeader = {
  title: 'SmartCampus AI',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'SmartCampus AI',
    },
  ],
}

export default function ObrolanAiPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ObrolanAiBody />
    </>
  )
}
