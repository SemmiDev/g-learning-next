import { Card, Text, Thumbnail } from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import { LuChevronDown } from 'react-icons/lu'

type DetailPesertaCardProps = {
  sudahDinilai: boolean
  className?: string
}

export default function DetailPesertaCard({
  sudahDinilai,
  className,
}: DetailPesertaCardProps) {
  return (
    <>
      <Card
        className={cn(
          'flex flex-col justify-between items-center gap-2 lg:flex-row',
          className
        )}
      >
        <div className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-6/12">
          <div className="flex items-center gap-x-2">
            <Thumbnail src={imagePhoto} alt="profil" size={48} />
            <Text weight="semibold" variant="dark">
              Prabroro Janggar
            </Text>
          </div>
          <div className="flex items-center gap-x-4">
            <Text
              weight="semibold"
              color={sudahDinilai ? 'primary' : 'gray'}
              variant={sudahDinilai ? 'default' : 'lighter'}
            >
              {sudahDinilai ? 'Sudah Dinilai' : 'Belum Dinilai'}
            </Text>
            <LuChevronDown size={24} />
          </div>
        </div>
      </Card>
    </>
  )
}
