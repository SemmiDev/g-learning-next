import { Button } from '@/components/ui'
import cn from '@/utils/class-names'
import { base64PngToFile } from '@/utils/image'
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo'
import { useEffect, useRef, useState } from 'react'

type CameraProps = {
  onChange?: (photo?: File) => void
}

export default function CameraPart({ onChange }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [camera, setCamera] = useState<CameraPhoto>()
  const [photoData, setPhotoData] = useState<string>()

  useEffect(() => {
    if (videoRef.current === null) return

    const cameraPhoto = new CameraPhoto(videoRef.current)
    cameraPhoto.startCamera(FACING_MODES.USER, {
      width: 1920,
      height: 1080,
    })
    cameraPhoto.startCamera()

    setCamera(cameraPhoto)

    return () => {
      camera?.stopCamera()
    }
  }, [videoRef])

  const handleTakePhoto = () => {
    const photo = camera?.getDataUri({
      sizeFactor: 1,
      isImageMirror: true,
    })

    onChange && onChange(photo ? base64PngToFile(photo, 'foto.png') : undefined)

    setPhotoData(photo)
  }

  const handleReTakePhoto = () => {
    onChange && onChange(undefined)

    setPhotoData(undefined)
  }

  return (
    <div className="flex flex-col gap-y-2 p-2">
      <video
        ref={videoRef}
        className={cn(['-scale-x-100', !photoData ? 'block' : 'hidden'])}
        autoPlay
      />
      {!!photoData && <img src={photoData} alt="foto" />}

      <div className="flex gap-x-2">
        <Button
          size="sm"
          variant="outline-colorful"
          className="flex-1"
          onClick={handleTakePhoto}
          disabled={!!photoData}
        >
          Ambil Foto
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={handleReTakePhoto}
          disabled={!photoData}
        >
          Foto Ulang
        </Button>
      </div>
    </div>
  )
}
