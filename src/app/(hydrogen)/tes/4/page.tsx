import { Button } from '@/components/ui'

export default function Tes4Page() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2">
        <Button size="xl">Tombol Extra Large</Button>
        <Button size="lg">Tombol Large</Button>
        <Button size="md">Tombol Medium</Button>
        <Button size="sm">Tombol Small</Button>
      </div>
      <div className="flex gap-x-2">
        <Button color="primary">Tombol Primary</Button>
        <Button color="secondary">Tombol Secondary</Button>
        <Button color="info">Tombol Info</Button>
        <Button color="success">Tombol Success</Button>
        <Button color="warning">Tombol Warning</Button>
        <Button color="danger">Tombol Danger</Button>
        <Button color="gray">Tombol Gray</Button>
      </div>
      <div className="flex gap-x-2">
        <Button variant="flat" color="primary">
          Tombol Primary
        </Button>
        <Button variant="flat" color="secondary">
          Tombol Secondary
        </Button>
        <Button variant="flat" color="info">
          Tombol Info
        </Button>
        <Button variant="flat" color="success">
          Tombol Success
        </Button>
        <Button variant="flat" color="warning">
          Tombol Warning
        </Button>
        <Button variant="flat" color="danger">
          Tombol Danger
        </Button>
        <Button variant="flat" color="gray">
          Tombol Gray
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button variant="outline-colorful" color="primary">
          Tombol Primary
        </Button>
        <Button variant="outline-colorful" color="secondary">
          Tombol Secondary
        </Button>
        <Button variant="outline-colorful" color="info">
          Tombol Info
        </Button>
        <Button variant="outline-colorful" color="success">
          Tombol Success
        </Button>
        <Button variant="outline-colorful" color="warning">
          Tombol Warning
        </Button>
        <Button variant="outline-colorful" color="danger">
          Tombol Danger
        </Button>
        <Button variant="outline-colorful" color="gray">
          Tombol Gray
        </Button>
      </div>
    </div>
  )
}
