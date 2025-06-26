import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useAiChatStore } from '@/stores/ai-chat'
import { usePathname } from 'next/navigation'
import { LuCpu } from 'react-icons/lu'
import ObrolanAiDrawer from './obrolan-ai/drawer'

export default function ObrolanAiMenu() {
  const pathname = usePathname()
  const { level } = useSessionPengguna()
  const { setOpen } = useAiChatStore()

  const showObrolanAi = pathname !== routes.pengguna.obrolanAI

  if (level !== 'Pengguna' || !showObrolanAi) return null

  return (
    <>
      <Button
        size="sm"
        variant="text"
        className="relative shadow backdrop-blur-md"
        title="Tanya SmartCampus AI"
        onClick={() => setOpen(true)}
      >
        <LuCpu className="size-4 me-1 mt-0.5" />
        <span className="hidden sm:inline">Tanya SmartCampus AI</span>
      </Button>

      <ObrolanAiDrawer />
    </>
  )
}
