'use client'
import { DataType as DataSesiType } from '@/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { Title } from '@/components/ui'
import NodeRSA from 'encrypt-rsa'
import { useParams } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { generate as shortUuid } from 'short-uuid'

export default function QRCodeBody({ sesi }: { sesi: DataSesiType }) {
  const [qrCodeData, setQrCodeData] = useState<string>()

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  useEffect(() => {
    const generateQrCode = () => {
      const nodeRSA = new NodeRSA()
      const encryptedString = nodeRSA.encryptStringWithRsaPublicKey({
        text: JSON.stringify({
          kelas: idKelas,
          sesi: idSesi,
          id: shortUuid(),
          time: Math.floor(Date.now() / 1000),
        }),
        publicKey: process.env.NEXT_PUBLIC_QRCODE_KEY,
      })

      setQrCodeData(encryptedString)
    }

    generateQrCode()
    const newTimer = setInterval(generateQrCode, 3000)

    return () => clearInterval(newTimer)
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-fit">
        {qrCodeData && (
          <div className="flex flex-col items-center gap-4">
            <Title>QR Code Presensi: {sesi.judul}</Title>
            <QRCodeSVG
              size={600}
              value={qrCodeData}
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}
