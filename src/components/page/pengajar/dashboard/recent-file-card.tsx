import {
  Button,
  Card,
  CardSeparator,
  Pagination,
  Text,
  Title,
} from '@/components/ui'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { Dropdown } from 'rizzui'
import RecentFileItem, { FileItemType } from './recent-file-item'

export default function RecentFileCard() {
  const files: FileItemType[] = [
    {
      id: 'a1',
      name: 'Alur Sistem Informasi',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'file',
      link: 'https://www.example.com',
    },
    {
      id: 'a2',
      name: 'Penjelasan singkat Alur Sistem Informasi',
      size: null,
      time: '13 Januari 2024',
      icon: 'video',
      link: 'https://www.example.com',
    },
    {
      id: 'a3',
      name: 'Alur Sistem Informasi 2',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'file',
      link: 'https://www.example.com',
    },
    {
      id: 'a4',
      name: 'Alur Sistem Informasi 3',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'file',
      link: 'https://www.example.com',
    },
    {
      id: 'a5',
      name: 'Alur Sistem Informasi 3',
      size: 5120,
      time: '13 Januari 2024',
      icon: 'file',
      link: 'https://www.example.com',
    },
  ]

  return (
    <Card className="flex flex-col flex-1 p-0">
      <div className="flex justify-between items-center p-2">
        <Title as="h4" weight="semibold">
          Recent Files
        </Title>
        <Dropdown>
          <Dropdown.Trigger>
            <Button size="sm" variant="outline">
              Personal <BsChevronDown className="ml-2 w-5" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item className="justify-between">
              <Text size="sm">Personal</Text> <BsCheck size={18} />
            </Dropdown.Item>
            <Dropdown.Item className="justify-between">
              <Text size="sm">UIN SUSKA Riau</Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <CardSeparator />
      <div>
        {files.map((file, idx) => (
          <RecentFileItem file={file} key={idx} />
        ))}
      </div>
      <div className="flex justify-between items-center p-2">
        <Text size="2xs" variant="lighter">
          Menampilkan 5 dari 30 data
        </Text>
        <Pagination total={30} />
      </div>
    </Card>
  )
}
