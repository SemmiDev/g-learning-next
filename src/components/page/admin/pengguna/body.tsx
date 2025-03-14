'use client'

import TablePenggunaAktifCard from './table-pengguna-aktif-card'
import TablePenggunaDiblokirCard from './table-pengguna-diblokir-card'

export default function ListPenggunaBody() {
  return (
    <div className="flex flex-col gap-y-4">
      <TablePenggunaAktifCard />
      <TablePenggunaDiblokirCard />
    </div>
  )
}
