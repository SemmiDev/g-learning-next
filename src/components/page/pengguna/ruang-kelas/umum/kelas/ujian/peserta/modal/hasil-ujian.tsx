import { lihatHasilUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
  Text,
  Time,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { parseDate } from '@/utils/date'
import {
  makeSimpleQueryDataWithId,
  makeSimpleQueryDataWithParams,
} from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import { useParams } from 'next/navigation'
import { Tooltip } from 'rizzui'

type MulaiUjianModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function HasilUjianModal({
  id,
  show,
  onHide,
}: MulaiUjianModalProps) {
  const router = useRouter()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const tipeKelas = dataKelas?.kelas?.tipe === 'Akademik' ? 'akademik' : 'umum'

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.ujian.hasil-ujian',
      'peserta',
      idKelas,
      id,
    ],
    queryFn: makeSimpleQueryDataWithParams(
      lihatHasilUjianAction,
      idKelas,
      id || null
    ),
    enabled: !!id,
  })

  const handleClose = () => {
    onHide()
  }

  const selesai = !!data?.jawaban.waktu_selesai
  const jadwalMulai = parseDate(data?.aktifitas.waktu_mulai_ujian)
  const jadwalSelesai = parseDate(data?.aktifitas.waktu_selesai_ujian)
  const dalamJadwal =
    !!jadwalMulai &&
    !!jadwalSelesai &&
    jadwalMulai <= new Date() &&
    jadwalSelesai >= new Date()

  const sudahDinilai =
    data?.jawaban.status_penilaian_essay === 1 ||
    data?.jawaban.status_penilaian_essay === null

  return (
    <Modal
      title="Hasil Ujian"
      size="md"
      isLoading={!isLoading && isFetching}
      isOpen={show}
      headerClassName="[&_.modal-title]:text-lg"
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={172} />
      ) : (
        <>
          <div className="flex p-3">
            <table className="flex-1 text-xs text-gray-dark">
              <tbody>
                <tr>
                  <td className="w-40">Total soal</td>
                  <td className="w-3 text-center"> : </td>
                  <td className="font-semibold">
                    {data?.bank_soal.jumlah_soal_yang_digunakan ?? '-'}
                  </td>
                </tr>
                <tr>
                  <td>Jumlah soal pilgan</td>
                  <td className="w-3 text-center"> : </td>
                  <td className="font-semibold">
                    {data?.bank_soal.total_soal_pilihan_ganda ?? '-'}
                  </td>
                </tr>
                <tr>
                  <td>Pilgan benar/salah/kosong</td>
                  <td className="text-center"> : </td>
                  <td className="font-semibold">
                    {selesai
                      ? `${data?.jawaban.jawaban_benar ?? '-'} /
                      ${data?.jawaban.jawaban_salah ?? '-'} /
                      ${data?.jawaban.jawaban_kosong ?? '-'}`
                      : '- / - / -'}
                  </td>
                </tr>
                <tr>
                  <td>Jumlah soal esai</td>
                  <td className="w-3 text-center"> : </td>
                  <td className="font-semibold">
                    {data?.bank_soal.total_soal_essay ?? '-'}
                  </td>
                </tr>
                <tr>
                  <td>Waktu mulai</td>
                  <td className="text-center"> : </td>
                  <td className="font-semibold">
                    <Time
                      date={data?.jawaban.waktu_mulai}
                      format="datetime"
                      empty="-"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Waktu selesai</td>
                  <td className="text-center"> : </td>
                  <td className="font-semibold">
                    <Time
                      date={data?.jawaban.waktu_selesai}
                      format="datetime"
                      empty="-"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Tooltip
              placement="left"
              content={
                selesai ? (
                  <div>
                    Nilai Pilgan:{' '}
                    {data?.jawaban.skor_akhir_pilihan_ganda || '-'}
                    <br />
                    Nilai Esai:{' '}
                    {sudahDinilai ? (
                      data?.jawaban.skor_akhir_essay || '-'
                    ) : (
                      <small>Belum Dinilai</small>
                    )}
                  </div>
                ) : (
                  'Belum Ujian'
                )
              }
            >
              <div className="flex flex-col items-center w-24 rounded-md bg-gray-50 self-center p-3">
                <Text size="sm" weight="medium" variant="lighter">
                  Nilai
                </Text>
                <Text size="3xl" weight="bold" variant="dark" className="mt-1">
                  {selesai && sudahDinilai
                    ? data?.jawaban.skor_akhir || 0
                    : '-'}
                </Text>
              </div>
            </Tooltip>
          </div>
          <CardSeparator />
          <ModalFooterButtons
            cancel={selesai || !dalamJadwal ? 'Tutup' : 'Batal'}
            onCancel={handleClose}
          >
            {selesai ? (
              <div className="flex-1">
                <Button className="w-full" disabled>
                  Mulai Ujian
                </Button>
              </div>
            ) : dalamJadwal ? (
              <div className="flex-1">
                <Button
                  className="w-full"
                  onClick={() =>
                    router.push(
                      `${routes.pengguna.ruangKelas.diikuti[tipeKelas]}/${idKelas}/ujian/${id}/kerjakan`
                    )
                  }
                >
                  {!!data?.jawaban.waktu_mulai ? 'Lanjut' : 'Mulai'} Ujian
                </Button>
              </div>
            ) : null}
          </ModalFooterButtons>
        </>
      )}
    </Modal>
  )
}
