import TablePenggunaAktifCard from '@/components/page/instansi/profil/pengguna/table-pengguna-aktif-card'
import TablePenggunaDiblokirCard from '@/components/page/instansi/profil/pengguna/table-pengguna-diblokir-card'

export default function PenggunaPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <TablePenggunaAktifCard />
      <TablePenggunaDiblokirCard />
    </div>
  )
}
