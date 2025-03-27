'use server'

import { UbahInstansiFormSchema } from '@/components/page/admin/instansi/modal/ubah'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahInstansiAction = async (
  id: string,
  data: UbahInstansiFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/admin/instansi/${id}`, {
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
  })
