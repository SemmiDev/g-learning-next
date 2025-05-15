import { makeActionResponse } from '@/utils/action'
import { makeJwtPostRequestApi } from '@/utils/api'
import NodeRSA from 'encrypt-rsa'

export const presensiSesiNonQrApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string,
  formData: FormData
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi`,
    jwt,
    formData
  )

export const presensiSesiQrApi = async (
  jwt: string,
  idKelas: string,
  idSesi: string,
  qrData: string
) => {
  try {
    const nodeRSA = new NodeRSA()

    const currentTime = Math.floor(Date.now() / 1000)

    const decryptedString = nodeRSA.decryptStringWithRsaPrivateKey({
      text: qrData,
      privateKey: process.env.QRCODE_PRIVATE_KEY,
    })

    const decryptedData: {
      kelas: string
      sesi: string
      id: string
      time: number
    } = JSON.parse(decryptedString)

    if (decryptedData.kelas !== idKelas || decryptedData.sesi !== idSesi) {
      return makeActionResponse(false, 'Kelas atau Sesi Tidak Valid')
    }

    // QR Code Kadaluarsa 2 menit
    if (currentTime - decryptedData.time > 2 * 60) {
      return makeActionResponse(false, 'QR Code Kadaluarsa')
    }

    const formData = new FormData()
    formData.append('kode_unik_qr', decryptedData.id)
    formData.append(
      'waktu_qr',
      new Date(decryptedData.time * 1000).toISOString()
    )

    return await makeJwtPostRequestApi(
      `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi`,
      jwt,
      formData
    )
  } catch (e) {
    return makeActionResponse(false, 'QR Code Tidak Valid')
  }
}
