import { Drawer } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import DaftarSoal, { DaftarSoalProps } from './daftar-soal'

type DrawerDaftarSoalProps = Omit<DaftarSoalProps, 'bigger'>

export default function DrawerDaftarSoal(props: DrawerDaftarSoalProps) {
  const { openSidebarMenu, setOpenSidebarMenu } = useGlobalStore()

  return (
    <Drawer isOpen={openSidebarMenu} onClose={() => setOpenSidebarMenu(false)}>
      <DaftarSoal {...props} bigger />
    </Drawer>
  )
}
