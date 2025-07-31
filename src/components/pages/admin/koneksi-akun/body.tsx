'use client'

import { ModalConfirm } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataKoneksiAkunApi } from '@/services/api/admin/koneksi-akun/data'
import { disconnectGoogleMeetApi } from '@/services/api/admin/koneksi-akun/disconnect-google-meet'
import { disconnectZoomApi } from '@/services/api/admin/koneksi-akun/disconnect-zoom'
import { handleActionWithToast } from '@/utils/action'
import googleMeetIcon from '@public/icons/google-meet.png'
import zoomIcon from '@public/icons/zoom.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import KoneksiItem from './koneksi-item'

const queryKey = ['admin.koneksi-akun']

export default function KoneksiAkunBody() {
  const queryClient = useQueryClient()
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()

  const [disconnectZoom, setDisconnectZoom] = useState(false)
  const [disconnectGoogleMeet, setDisconnectGoogleMeet] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleApiQueryData(dataKoneksiAkunApi),
  })

  const handleConnectZoom = () => {
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${
      process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URL || ''
    )}`

    window.location.href = zoomAuthUrl
  }

  const handleDisconnectZoom = async () => {
    await handleActionWithToast(processApi(disconnectZoomApi), {
      loading: 'Memutuskan koneksi...',
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onFinish: () => setDisconnectZoom(false),
    })
  }

  const handleConnectGoogleMeet = () => {
    location.href = routes.admin.googleMeet
  }

  const handleDisconnectGoogleMeet = async () => {
    await handleActionWithToast(processApi(disconnectGoogleMeetApi), {
      loading: 'Memutuskan koneksi...',
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onFinish: () => setDisconnectGoogleMeet(false),
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4 lg:w-5/12">
        <KoneksiItem
          title="Zoom Meeting"
          icon={
            <Image
              src={zoomIcon}
              width={24}
              height={24}
              alt="Zoom Meeting"
              className="shrink-0"
            />
          }
          isLoading={isLoading}
          connected={data?.zoom}
          onConnect={handleConnectZoom}
          onDisconnect={() => setDisconnectZoom(true)}
        />
        <KoneksiItem
          title="Google Meet"
          icon={
            <Image
              src={googleMeetIcon}
              width={24}
              height={24}
              alt="Google Meet"
              className="shrink-0"
            />
          }
          isLoading={isLoading}
          connected={data?.google_meet}
          onConnect={handleConnectGoogleMeet}
          onDisconnect={() => setDisconnectGoogleMeet(true)}
        />
      </div>

      <ModalConfirm
        title="Putuskan Koneksi Zoom"
        desc="Yakin ingin memutuskan koneksi zoom?"
        color="danger"
        isOpen={disconnectZoom}
        onConfirm={handleDisconnectZoom}
        onClose={() => setDisconnectZoom(false)}
        headerIcon="help"
        closeOnCancel
      />

      <ModalConfirm
        title="Putuskan Koneksi Google Meet"
        desc="Yakin ingin memutuskan koneksi google meet?"
        color="danger"
        isOpen={disconnectGoogleMeet}
        onConfirm={handleDisconnectGoogleMeet}
        onClose={() => setDisconnectGoogleMeet(false)}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
