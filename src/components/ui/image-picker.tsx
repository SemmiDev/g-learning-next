import { googleDriveThumbnailUrl } from '@/utils/google-drive-url'
import { PustakaMediaFileType } from '../shared/pustaka-media'
import PilihMediaGambar from '../shared/pustaka-media/pilih-media-gambar'

export type ImagePickerProps = {
  show: boolean
  setShow: (show: boolean) => void
  onSelect: (imageUrl?: string) => void
}

export default function ImagePicker({
  show,
  setShow,
  onSelect,
}: ImagePickerProps) {
  return (
    <PilihMediaGambar
      show={show}
      setShow={setShow}
      onSelect={(file: PustakaMediaFileType) => {
        const imageUrl = googleDriveThumbnailUrl(
          file.link ?? '',
          file.link,
          1024,
          's'
        )
        onSelect(imageUrl)
      }}
    />
  )
}
