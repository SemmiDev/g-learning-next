import { Button } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'

type FixedNavbarProps = {
  show?: boolean
  className?: string
}

export default function FixedNavbar({ show, className }: FixedNavbarProps) {
  const { setOpenSidebarMenu } = useGlobalStore()

  return (
    <div
      className={cn(
        'flex justify-end items-center gap-x-4 top-0 left-0 w-full z-50 fixed bg-white shadow-md px-3 py-1 md:hidden',
        className,
        { hidden: !show }
      )}
    >
      <Button
        size="sm"
        color="success"
        variant="outline"
        className="lg:hidden"
        onClick={() => setOpenSidebarMenu(true)}
      >
        Daftar Soal
      </Button>
    </div>
  )
}
