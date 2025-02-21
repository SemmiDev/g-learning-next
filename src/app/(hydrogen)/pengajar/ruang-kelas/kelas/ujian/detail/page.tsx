'use client'

import DetailPesertaCard from '@/components/page/pengajar/ruang-kelas/kelas/ujian/detail-peserta-card'
import KeteranganTugasCard from '@/components/page/pengajar/ruang-kelas/kelas/ujian/keterangan-tugas-card'
import {
  Button,
  Card,
  ControlledInputNumber,
  Form,
  Text,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { z } from '@/utils/zod-id'
import Link from 'next/link'
import { SubmitHandler } from 'react-hook-form'
import { RiArrowLeftLine } from 'react-icons/ri'

const formSchema = z.object({
  nilai: z.array(z.number().min(0).max(100)),
})

export type NilaiUjianFormSchema = {
  nilai: (number | null)[]
}

export default function UjianDetailPage() {
  const listJawaban = [
    {
      id: 1,
      soal: 'Sistem terasering adalah suatu sistem yang banyak diterapkan pada lahan perbukitan di Indonesia, apa sebetulnya keuntungan yang bisa dihasilkan dari sistem terasering tersebut! Jelaskanlah dengan singkat!',
      jawaban: `<p>Sistem terasering adalah teknik pertanian dengan membuat teras-teras pada lahan miring atau perbukitan. Keuntungan utama dari sistem ini adalah:</p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Mencegah Erosi: Terasering mengurangi aliran air permukaan, sehingga tanah tidak mudah terkikis.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Mempertahankan Kesuburan Tanah: Dengan mengurangi erosi, lapisan tanah atas yang subur tetap terjaga.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Mengoptimalkan Pengairan: Air hujan atau irigasi dapat meresap lebih merata ke dalam tanah.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Meningkatkan Luas Lahan yang Dapat Ditanami: Lahan miring menjadi lebih produktif karena terasering membuatnya datar.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Mengurangi Risiko Longsor: Struktur terasering menstabilkan lereng bukit.</li></ol><p>Dengan demikian, terasering sangat bermanfaat untuk pertanian berkelanjutan di daerah perbukitan. 😊</p>`,
    },
    ...[...Array(4)].map((_, idx) => ({
      id: idx + 2,
      soal: 'Sistem terasering adalah suatu sistem yang banyak diterapkan pada lahan perbukitan di Indonesia, apa sebetulnya keuntungan yang bisa dihasilkan dari sistem terasering tersebut! Jelaskanlah dengan singkat!',
      jawaban:
        'Sistem terasering adalah suatu sistem yang banyak diterapkan pada lahan perbukitan di Indonesia, apa sebetulnya keuntungan yang bisa dihasilkan dari sistem terasering tersebut! Jelaskanlah dengan singkat!',
    })),
  ]

  const initialValues: NilaiUjianFormSchema = {
    nilai: listJawaban.map(() => null),
  }

  const onSubmit: SubmitHandler<NilaiUjianFormSchema> = async (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={`${routes.pengajar.kelas}/ujian`}>
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

      <KeteranganTugasCard className="mb-4" />

      <Form<NilaiUjianFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
          values: initialValues,
        }}
      >
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <DetailPesertaCard sudahDinilai={false} className="mb-4" />

            <Card className="p-0">
              <table className="w-full border-collapse font-semibold [&_tr>*]:p-2 [&_tr>*:first-child]:border-l-0 [&_tr>*:last-child]:border-r-0 [&_tr>*]:border-gray-100">
                <thead className="[&>tr>th]:text-gray-dark [&>tr>th]:border-2 [&>tr>th]:border-t-0">
                  <tr>
                    <th className="w-10">No</th>
                    <th>Soal Esai</th>
                    <th>Jawaban Peserta</th>
                    <th className="w-24">Nilai</th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:border-2">
                  {listJawaban.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td>
                        <SanitizeHTML html={item.soal} />
                      </td>
                      <td>
                        <SanitizeHTML html={item.jawaban} />
                      </td>
                      <td>
                        <ControlledInputNumber
                          name={`nilai.${idx}`}
                          control={control}
                          error={errors.nilai?.[idx]?.message}
                          min={0}
                          max={100}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end p-2">
                <Button type="submit">Simpan Penilaian</Button>
              </div>
            </Card>
          </>
        )}
      </Form>
    </>
  )
}
