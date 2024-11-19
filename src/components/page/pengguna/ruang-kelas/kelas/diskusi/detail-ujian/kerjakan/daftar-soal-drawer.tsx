import { Drawer } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import DaftarSoal, { DaftarSoalProps } from './daftar-soal'

type DrawerDaftarSoalProps = DaftarSoalProps & {}

export default function DrawerDaftarSoal({
  listSoal,
  currentSoal,
  setCurrentSoal,
}: DrawerDaftarSoalProps) {
  const { openSidebarMenu, setOpenSidebarMenu } = useGlobalStore()

  return (
    <Drawer isOpen={openSidebarMenu} onClose={() => setOpenSidebarMenu(false)}>
      <DaftarSoal
        listSoal={listSoal}
        currentSoal={currentSoal}
        setCurrentSoal={setCurrentSoal}
        bigger
      />
    </Drawer>
  )
}
