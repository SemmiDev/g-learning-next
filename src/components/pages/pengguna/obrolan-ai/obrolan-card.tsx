import { ActionIcon, Card, Textarea, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { useMemo, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import Markdown from 'react-markdown'

const chatUser =
  'berikan saya opsi untuk kalimat di bawah ini\n\napakah kamu ingin mecetak akun untuk akses internet?\n\nkalimat tersebut digunkanan untuk kebutuhan UI design'

const chatModel =
  'Tentu, berikut beberapa opsi untuk kalimat "Apakah kamu ingin mencetak akun untuk akses internet?" yang lebih sesuai untuk UI design, dengan mempertimbangkan kejelasan, keringkasan, dan keramahan pengguna:\n\n**Opsi yang lebih ringkas dan langsung:**\n\n*   **Cetak Akun Internet?** (Paling ringkas, cocok jika ruang terbatas)\n*   **Cetak Akun?** (Jika sudah jelas konteksnya adalah akun internet)\n*   **Cetak Detail Akun?** (Menekankan apa yang akan dicetak)\n\n**Opsi yang lebih ramah dan membantu:**\n\n*   **Cetak informasi akun internet?** (Lebih lembut daripada pertanyaan langsung)\n*   **Cetak akun untuk panduan akses internet?**\n*   **Cetak akun (untuk panduan akses)?**\n\n**Opsi yang lebih berorientasi pada tindakan:**\n\n*   **Cetak Akun Sekarang** (Jika tombolnya langsung melakukan pencetakan)\n*   **Cetak Akun untuk Akses** (Menekankan tujuan pencetakan)\n\n**Pertimbangan tambahan saat memilih opsi:**\n\n*   **Ruang yang tersedia:** Jika ruang terbatas, opsi yang lebih ringkas lebih baik.\n*   **Konteks:** Jika konteksnya sudah jelas (misalnya, pengguna sudah berada di halaman pengaturan akun internet), opsi yang lebih ringkas mungkin cukup.\n*   **Target pengguna:** Jika target pengguna kurang familiar dengan teknologi, gunakan opsi yang lebih jelas dan ramah.\n*   **Gunakan Icon:** Tambahkan ikon printer yang umum untuk memperjelas fungsi tombol\n\n**Contoh penggunaan dalam UI:**\n\n*   Sebagai label tombol: "[Tombol] Cetak Akun"\n*   Sebagai teks konfirmasi: "Anda yakin ingin mencetak akun internet Anda?"\n\nSemoga ini membantu!\n'

type ObrolanCardProps = {
  className?: string
}

export default function ObrolanCard({ className }: ObrolanCardProps) {
  const [showChat, setShowChat] = useState(false)
  const [newChat, setNewChat] = useState('')

  const newChatRows = useMemo(
    () => Math.min(10, newChat.split('\n').length),
    [newChat]
  )

  const handleKirimPesan = () => {
    setShowChat(!showChat)

    console.log(JSON.stringify(newChat))
  }

  return (
    <Card className={cn('flex flex-col gap-2 relative p-0', className)}>
      <div className="px-2 pt-2 md:px-3">
        {showChat ? (
          <div className="flex flex-col gap-4 max-h-[60dvh] overflow-y-scroll">
            <ChatUser>{chatUser}</ChatUser>
            <ChatModel>{chatModel}</ChatModel>
            <ChatUser>{chatUser}</ChatUser>
            <ChatModel>{chatModel}</ChatModel>
          </div>
        ) : (
          <Title as="h4" weight="semibold" align="center" className="text-xl">
            Mau tanya apa ke SmartCampus AI?
          </Title>
        )}
      </div>
      <div className="flex gap-2 w-full bg-white sticky bottom-0 px-4 py-2">
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
    </Card>
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
