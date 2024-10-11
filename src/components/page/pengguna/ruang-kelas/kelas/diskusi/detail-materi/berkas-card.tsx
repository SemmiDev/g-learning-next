import {
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  PustakaMediaFileType,
  Text,
  Title,
} from '@/components/ui'

type BerkasCardProps = {
  files: PustakaMediaFileType[]
  setFilePreview: (file: FilePreviewType) => void
}

export default function BerkasCard({ files, setFilePreview }: BerkasCardProps) {
  return (
    <Card className="flex flex-col flex-1 p-0">
      <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
        Berkas Materi
      </Title>
      <CardSeparator />
      <div className="flex flex-col space-y-2 p-2">
        {files.length > 0 ? (
          files.map((file) => (
            <FileListItem
              key={file.id}
              file={file}
              onPreview={(file) => {
                if (!file.link) return

                setFilePreview({
                  url: file.link,
                  extension: file.extension,
                })
              }}
              download
            />
          ))
        ) : (
          <Text size="sm" align="center" className="py-4">
            Tidak ada berkas
          </Text>
        )}
      </div>
    </Card>
  )
}
