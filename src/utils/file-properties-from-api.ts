export const getFileType = (file: { tipe: string | null }) => {
  return file.tipe === 'Audio'
    ? 'audio'
    : file.tipe === 'Video'
    ? 'video'
    : file.tipe === 'Gambar'
    ? 'image'
    : file.tipe === 'Teks'
    ? 'link'
    : undefined
}

export const getFileIsFolder = (file: { tipe: string | null }) => {
  return file.tipe === 'Folder'
}

export const getFileCount = (file: {
  tipe: string | null
  total_files: number
}) => {
  return file.tipe === 'Folder' ? file.total_files : undefined
}

export const getFileSize = (file: { tipe: string | null; ukuran: number }) => {
  return file.tipe !== 'Folder' ? file.ukuran : undefined
}
