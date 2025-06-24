import { ActionIcon, Button, Drawer, Textarea, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useAiChatStore } from '@/stores/ai-chat'
import { useRouter } from '@bprogress/next/app'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BsClockHistory,
  BsFillSendFill,
  BsPlusSquare,
  BsThreeDotsVertical,
} from 'react-icons/bs'
import { LuCpu } from 'react-icons/lu'
import { PiXBold } from 'react-icons/pi'
import Markdown from 'react-markdown'
import { Dropdown } from 'rizzui'

const chatUser =
  'berikan saya opsi untuk kalimat di bawah ini\n\napakah kamu ingin mecetak akun untuk akses internet?\n\nkalimat tersebut digunkanan untuk kebutuhan UI design'

const chatModel =
  'Tentu, berikut beberapa opsi untuk kalimat "Apakah kamu ingin mencetak akun untuk akses internet?" yang lebih sesuai untuk UI design, dengan mempertimbangkan kejelasan, keringkasan, dan keramahan pengguna:\n\n**Opsi yang lebih ringkas dan langsung:**\n\n*   **Cetak Akun Internet?** (Paling ringkas, cocok jika ruang terbatas)\n*   **Cetak Akun?** (Jika sudah jelas konteksnya adalah akun internet)\n*   **Cetak Detail Akun?** (Menekankan apa yang akan dicetak)\n\n**Opsi yang lebih ramah dan membantu:**\n\n*   **Cetak informasi akun internet?** (Lebih lembut daripada pertanyaan langsung)\n*   **Cetak akun untuk panduan akses internet?**\n*   **Cetak akun (untuk panduan akses)?**\n\n**Opsi yang lebih berorientasi pada tindakan:**\n\n*   **Cetak Akun Sekarang** (Jika tombolnya langsung melakukan pencetakan)\n*   **Cetak Akun untuk Akses** (Menekankan tujuan pencetakan)\n\n**Pertimbangan tambahan saat memilih opsi:**\n\n*   **Ruang yang tersedia:** Jika ruang terbatas, opsi yang lebih ringkas lebih baik.\n*   **Konteks:** Jika konteksnya sudah jelas (misalnya, pengguna sudah berada di halaman pengaturan akun internet), opsi yang lebih ringkas mungkin cukup.\n*   **Target pengguna:** Jika target pengguna kurang familiar dengan teknologi, gunakan opsi yang lebih jelas dan ramah.\n*   **Gunakan Icon:** Tambahkan ikon printer yang umum untuk memperjelas fungsi tombol\n\n**Contoh penggunaan dalam UI:**\n\n*   Sebagai label tombol: "[Tombol] Cetak Akun"\n*   Sebagai teks konfirmasi: "Anda yakin ingin mencetak akun internet Anda?"\n\nSemoga ini membantu!\n'

export default function ObrolanAiMenu() {
  const pathname = usePathname()
  const router = useRouter()
  const { level } = useSessionPengguna()
  const { open, setOpen } = useAiChatStore()

  const chatRef = useRef<HTMLDivElement>(null)

  const [newChat, setNewChat] = useState('')

  const newChatRows = useMemo(
    () => Math.min(10, newChat.split('\n').length),
    [newChat]
  )

  const handleKirimPesan = () => {
    console.log(JSON.stringify(newChat))
  }

  const showObrolanAi = pathname !== routes.pengguna.obrolanAI

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: 'instant',
        })
      }, 100)
    }
  }, [open])

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

      <Drawer
        size="lg"
        isOpen={open}
        onClose={() => setOpen(false)}
        containerClassName="flex flex-col"
      >
        <div className="flex items-center justify-between border-b border-muted gap-2 ps-4 pe-2 py-2">
          <div className="flex flex-row">
            <LuCpu className="size-5 me-1.5 mt-1" />
            <Title as="h5">SmartCampus AI</Title>
          </div>
          <div className="flex gap-4">
            <Dropdown placement="bottom-start" className="">
              <Dropdown.Trigger>
                <ActionIcon as="span" size="sm" variant="outline-hover">
                  <BsThreeDotsVertical className="size-4" />
                </ActionIcon>
              </Dropdown.Trigger>
              <Dropdown.Menu className="w-44 divide-y !py-0">
                <div className="py-2">
                  <Dropdown.Item className="text-gray-dark" onClick={() => {}}>
                    <BsPlusSquare className="text-primary size-4 mr-2" />
                    Obrolan Baru
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={() => {
                      setOpen(false)
                      router.push(routes.pengguna.obrolanAI)
                    }}
                  >
                    <BsClockHistory className="text-warning size-4 mr-2" />
                    Riwayat Obrolan
                  </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <ActionIcon
              size="sm"
              rounded="full"
              variant="text"
              title={'Tutup'}
              onClick={() => setOpen(false)}
            >
              <PiXBold className="size-4" />
            </ActionIcon>
          </div>
        </div>
        <div
          ref={chatRef}
          className="flex flex-col gap-12 flex-grow overflow-y-auto px-4 py-2"
        >
          <ChatUser>{chatUser}</ChatUser>
          <ChatModel>{chatModel}</ChatModel>
          <ChatUser>{chatUser}</ChatUser>
          <ChatModel>{chatModel}</ChatModel>
        </div>
        <div className="flex gap-2 w-full bg-white sticky bottom-0 px-4 py-3">
          <Textarea
            className="flex-1"
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
            rows={newChatRows || 1}
            placeholder="Tanyakan apa saja"
          ></Textarea>
          <ActionIcon
            size="sm"
            variant="outline"
            className="mt-1"
            onClick={handleKirimPesan}
          >
            <BsFillSendFill className="size-3" />
          </ActionIcon>
        </div>
      </Drawer>
    </>
  )
}

function ChatUser({ children }: { children: string }) {
  return (
    <div className="prose prose-sm w-fit border border-muted rounded-2xl rounded-tr-none self-end px-3 py-2">
      <Markdown>{children}</Markdown>
    </div>
  )
}

function ChatModel({ children }: { children: string }) {
  return (
    <div className="prose prose-sm">
      <Markdown>{children}</Markdown>
    </div>
  )
}
