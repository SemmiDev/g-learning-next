'use client'

import PageHeader, { BreadcrumbType } from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { useParams } from 'next/navigation'

type KelasLayoutHeaderProps = {
  title: string
  breadcrumb: BreadcrumbType[]
}

export default function KelasLayoutHeader({
  title,
  breadcrumb,
}: KelasLayoutHeaderProps) {
  // const { kelas: idKelas, tes: idTes } = useParams()

  // if (idTes) {
  //   return (
  //     <PageHeader
  //       title={title}
  //       breadcrumb={[
  //         ...breadcrumb.slice(0, -1),
  //         {
  //           name: breadcrumb[breadcrumb.length - 1].name,
  //           href: `${routes.pengguna.ruangKelas}/${idKelas}`,
  //         },
  //         {
  //           name: 'Tes',
  //         },
  //       ]}
  //     />
  //   )
  // }

  return <PageHeader title={title} breadcrumb={breadcrumb} />
}
