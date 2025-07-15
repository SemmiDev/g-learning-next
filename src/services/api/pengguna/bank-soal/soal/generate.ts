import { GenerateSoalFormSchema } from '@/components/pages/pengguna/bank-soal/kategori/soal/modal/generate'
import { makeJwtPostRequestApi } from '@/utils/api'

export const generateSoalApi = async (
  jwt: string,
  idBankSoal: string,
  data: GenerateSoalFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idBankSoal}/ai/generate`,
    jwt,
    {
      jumlah_soal_pilihan_ganda: data.jumlahPilihan,
      jumlah_opsi_jawaban: data.opsiPilihan?.value ?? 4,
      jumlah_soal_essay: data.jumlahEsai,
      bahasa: data.bahasa?.value ?? 'Indonesia',
      bobot_essay: data.jumlahEsai ? data.bobotEsai : null,
      berkas: !data.usingMateri
        ? (data.pustakaMedia ?? []).map((berkas) => berkas.id)
        : undefined,
      id_bank_ajar: data.usingMateri ? [data.materi?.id] : undefined,
    }
  )
