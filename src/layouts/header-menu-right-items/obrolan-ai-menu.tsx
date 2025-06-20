import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import { usePathname } from 'next/navigation'
import { LuCpu } from 'react-icons/lu'

export default function ObrolanAiMenu() {
  const pathname = usePathname()

  const showObrolanAi = pathname !== routes.pengguna.obrolanAI

  if (!showObrolanAi) return null

  return (
    <Button
      aria-label="Notification"
      variant="text"
      className="relative shadow backdrop-blur-md"
      title="Tanya SmartCampus AI"
    >
      <LuCpu className="size-4 me-1 mt-0.5" />
      <span className="hidden sm:inline">Tanya SmartCampus AI</span>
    </Button>
  )
}
