'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { lihatHasilUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/pengajar/lihat-hasil'
import { listJawabanUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/pengajar/list-jawaban'
import { simpanNilaiUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/pengajar/simpan-nilai-tugas'
import {
  Button,
  ButtonSubmit,
  Card,
  ControlledInputNumber,
  Form,
  Text,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
import {
  makeSimpleQueryDataWithId,
  makeSimpleQueryDataWithParams,
} from '@/utils/query-data'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailPesertaCard from './detail-peserta-card'
import KeteranganUjianCard from './keterangan-ujian-card'

const formSchema = z.object({
  nilai: z.array(
    z.object({
      id: z.string(),
      value: z.number().min(0).max(100),
    })
  ),
})

export type PenilaianUjianFormSchema = {
  nilai: { id: string; value: number | null }[]
}

export default function PenilaianUjianBody() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    kelas: idKelas,
    id: idAktifitas,
    peserta: idPeserta,
  }: { kelas: string; id: string; peserta: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  const queryKeyUjian = [
    'pengguna.ruang-kelas.ujian.lihat',
    idKelas,
    idAktifitas,
    idPeserta,
  ]

  const { data: dataUjian } = useQuery({
    queryKey: queryKeyUjian,
    queryFn: makeSimpleQueryDataWithParams(
      lihatHasilUjianAction,
      idKelas,
      idAktifitas,
      idPeserta
    ),
  })

  const sudahUjian =
    dataUjian?.jawaban.status_pengumpulan === 'SUDAH_MENGUMPULKAN'
  const sudahDinilai =
    dataUjian?.jawaban.status_penilaian_essay === 1 ||
    dataUjian?.jawaban.status_penilaian_essay === null

  const queryKey = [
    'pengguna.ruang-kelas.ujian.penilaian',
    idKelas,
    idAktifitas,
    idPeserta,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, success } = await listJawabanUjianAction(
        idKelas,
        idAktifitas,
        idPeserta
      )

      const list = success ? data ?? [] : []

      return {
        listPilihan: list.filter((item) => item.tipe === 'PILIHAN_GANDA'),
        listEsai: list.filter((item) => item.tipe === 'ESSAY'),
      }
    },
  })

  const initialValues: PenilaianUjianFormSchema = {
    nilai: (data?.listEsai ?? []).map((item) => ({
      id: item.id_soal,
      value: item.nilai,
    })),
  }

  const onSubmit: SubmitHandler<PenilaianUjianFormSchema> = async (data) => {
    await handleActionWithToast(
      simpanNilaiUjianAction(idKelas, idAktifitas, idPeserta, data),
      {
        loading: 'Menyimpan...',
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey })
          queryClient.invalidateQueries({ queryKey: queryKeyUjian })
        },
      }
    )
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/diskusi/ujian/${idAktifitas}`}
          onClick={() => router.back()}
        >
          <Button
            as="span"
            variant="text"
            color="primary"
            className="text-gray-dark"
          >
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>

      <KeteranganUjianCard className="mb-4" />

      <Form<PenilaianUjianFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
          values: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <DetailPesertaCard
              isWaiting={isLoading}
              tipeKelas={tipeKelas}
              sudahUjian={sudahUjian}
              sudahDinilai={sudahDinilai}
              className="mb-4"
            />

            {sudahUjian && (
              <Card className="overflow-x-auto p-0">
                <table className="w-full border-collapse font-semibold [&_tr>*]:p-2 [&_tr>*:first-child]:border-l-0 [&_tr>*:last-child]:border-r-0 [&_tr>*]:border-gray-100">
                  <thead className="[&>tr>th]:text-gray-dark [&>tr>th]:border-2 [&>tr>th]:border-t-0">
                    <tr>
                      <th className="w-10">No</th>
                      <th className="min-w-80">Soal Esai</th>
                      <th className="min-w-80">Jawaban Peserta</th>
                      <th className="w-24 min-w-24">Nilai</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr>td]:border-2">
                    {data?.listEsai.map((item, idx) => (
                      <tr key={item.id_soal}>
                        <td className="align-top text-center">{idx + 1}</td>
                        <td className="align-top">
                          <SanitizeHTML html={item.soal} />
                        </td>
                        <td className="align-top">
                          <SanitizeHTML html={item.jawaban_anda} />
                        </td>
                        <td className="align-top md:align-middle">
                          <ControlledInputNumber
                            name={`nilai.${idx}.value`}
                            control={control}
                            error={errors.nilai?.[idx]?.value?.message}
                            min={0}
                            max={100}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} align="right">
                        <ButtonSubmit type="submit" isSubmitting={isSubmitting}>
                          Simpan Penilaian
                        </ButtonSubmit>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Card>
            )}
          </>
        )}
      </Form>
    </>
  )
}
