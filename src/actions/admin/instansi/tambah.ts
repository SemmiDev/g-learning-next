'use server'

import { TambahInstansiFormSchema } from '@/components/page/admin/instansi/modal/tambah'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahInstansiAction = async (data: TambahInstansiFormSchema) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/instansi`, {
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
  })
