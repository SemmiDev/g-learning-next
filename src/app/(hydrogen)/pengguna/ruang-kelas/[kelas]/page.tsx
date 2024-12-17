import DiskusiBody from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/body'
import { userAgentMobile } from '@/utils/user-agent'

export default async function DiskusiPage() {
  const isMobile = await userAgentMobile()

  return <DiskusiBody isMobile={isMobile} />
}
