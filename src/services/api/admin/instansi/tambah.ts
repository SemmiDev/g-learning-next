import { TambahInstansiFormSchema } from '@/components/pages/admin/instansi/modal/tambah'
import { makeJwtPostRequestApi } from '@/utils/api'

export const tambahInstansiApi = async (
  jwt: string,
  data: TambahInstansiFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi`,
    jwt,
    {
      nama_instansi: data.nama,
      telepon_instansi: data.kontak,
      nama_pimpinan: data.pimpinan,
      telepon_pimpinan: data.kontakPimpinan,
      jenis: data.jenis?.value,
      id_paket: data.paket?.value,
      pengguna: {
        username: data.usernameAdmin,
        kata_sandi: data.passwordAdmin,
      },
      semester_aktif: data.semester?.value,
      url_smart: data.urlSmart,
      host_smart: data.hostSmart,
    }
  )
