import { UbahInstansiFormSchema } from '@/components/pages/admin/instansi/modal/ubah'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahInstansiApi = async (
  jwt: string,
  id: string,
  data: UbahInstansiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi/${id}`,
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
