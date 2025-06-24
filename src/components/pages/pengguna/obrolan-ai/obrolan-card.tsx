import { ActionIcon, Card, Loader, Textarea, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/list-obrolan'
import { useAiChatStore } from '@/stores/ai-chat'
import cn from '@/utils/class-names'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Markdown from 'react-markdown'

const chatUser =
  'berikan saya opsi untuk kalimat di bawah ini\n\napakah kamu ingin mecetak akun untuk akses internet?\n\nkalimat tersebut digunkanan untuk kebutuhan UI design'

const chatModel =
  'Tentu, berikut beberapa opsi untuk kalimat "Apakah kamu ingin mencetak akun untuk akses internet?" yang lebih sesuai untuk UI design, dengan mempertimbangkan kejelasan, keringkasan, dan keramahan pengguna:\n\n**Opsi yang lebih ringkas dan langsung:**\n\n*   **Cetak Akun Internet?** (Paling ringkas, cocok jika ruang terbatas)\n*   **Cetak Akun?** (Jika sudah jelas konteksnya adalah akun internet)\n*   **Cetak Detail Akun?** (Menekankan apa yang akan dicetak)\n\n**Opsi yang lebih ramah dan membantu:**\n\n*   **Cetak informasi akun internet?** (Lebih lembut daripada pertanyaan langsung)\n*   **Cetak akun untuk panduan akses internet?**\n*   **Cetak akun (untuk panduan akses)?**\n\n**Opsi yang lebih berorientasi pada tindakan:**\n\n*   **Cetak Akun Sekarang** (Jika tombolnya langsung melakukan pencetakan)\n*   **Cetak Akun untuk Akses** (Menekankan tujuan pencetakan)\n\n**Pertimbangan tambahan saat memilih opsi:**\n\n*   **Ruang yang tersedia:** Jika ruang terbatas, opsi yang lebih ringkas lebih baik.\n*   **Konteks:** Jika konteksnya sudah jelas (misalnya, pengguna sudah berada di halaman pengaturan akun internet), opsi yang lebih ringkas mungkin cukup.\n*   **Target pengguna:** Jika target pengguna kurang familiar dengan teknologi, gunakan opsi yang lebih jelas dan ramah.\n*   **Gunakan Icon:** Tambahkan ikon printer yang umum untuk memperjelas fungsi tombol\n\n**Contoh penggunaan dalam UI:**\n\n*   Sebagai label tombol: "[Tombol] Cetak Akun"\n*   Sebagai teks konfirmasi: "Anda yakin ingin mencetak akun internet Anda?"\n\nSemoga ini membantu!\n'

type newChatResponse = {
  code: number
  status: string
  message: string
  success: boolean
  data: {
    event: 'metadata' | 'chunk' | 'done'
    sesi: {
      id: string
      id_pengguna: string
      judul: string
      created_at: string
      updated_at: string
    }
    pesan: {
      id: string
      id_pengguna: string
      id_sesi_chat: string
      isi: string
      is_pengguna: boolean
      created_at: string
      updated_at: string
    }
    chunk: string
  }
}

type ChatItemType = {
  id?: string
  role: 'user' | 'model'
  content: string
}

type ObrolanCardProps = {
  className?: string
}

export default function ObrolanCard({ className }: ObrolanCardProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const {
    activeHistoryId,
    setActiveHistoryId,
    setActiveHistoryIdFresh,
    isFreshHistory,
    setIsFreshHistory,
    newChatList,
    setNewChatList,
    addNewChatList,
  } = useAiChatStore()

  const [newChat, setNewChat] = useState('')
  const [isWaitingReply, setIsWaitingReply] = useState(false)
  const [newChatReply, setNewChatReply] = useState('')

  const chatRef = useRef<HTMLDivElement>(null)

  const newChatRows = useMemo(
    () => Math.min(10, newChat.split('\n').length),
    [newChat]
  )

  const queryKey = ['pengguna.obrolan-ai.obrolan', activeHistoryId || null]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      if (!activeHistoryId) return { list: [], pagination: undefined }

      if (isFreshHistory) {
        setIsFreshHistory(false)
        return { list: newChatList, pagination: undefined }
      }

      const { data } = await listObrolanAiApi({
        jwt,
        id: activeHistoryId,
        page,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id,
          content: item.isi,
          role: item.is_pengguna ? 'user' : 'model',
        })) as ChatItemType[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const list = data?.pages.flatMap((page) => page?.list) ?? []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  const handleChatKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleKirimPesan()
    }
  }

  const handleKirimPesan = async () => {
    setIsFreshHistory(!activeHistoryId)

    addNewChatList({ role: 'user', content: newChat })
    setNewChat('')
    setIsWaitingReply(true)

    await fetchEventSource(
      activeHistoryId
        ? `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/${activeHistoryId}/pesan`
        : `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${jwt ?? ''}`,
        },
        body: JSON.stringify({
          pertanyaan: newChat,
        }),
        onmessage(event) {
          const resData: newChatResponse = JSON.parse(event.data)
          const { data } = resData
          if (data.event === 'done') {
            setNewChatReply('')
            setIsWaitingReply(false)
            addNewChatList({ role: 'model', content: data.chunk })
          } else if (data.event === 'chunk') {
            setNewChatReply((reply) => reply + data.chunk)
          } else if (data.event === 'metadata') {
            if (activeHistoryId) {
              setActiveHistoryId(data.sesi.id)
            } else {
              setActiveHistoryIdFresh(data.sesi.id)
            }
          }
        },
      }
    )

    queryClient.invalidateQueries({ queryKey: ['pengguna.obrolan-ai.riwayat'] })
  }

  const scrollChatToBottom = (delay: number = 0) => {
    setTimeout(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'instant',
      })
    }, delay)
  }

  useEffect(() => {
    scrollChatToBottom()
  }, [list, newChatList, newChatReply])

  useEffect(() => {
    setNewChatList([])

    if (activeHistoryId && !isFreshHistory && list.length > 0) {
      scrollChatToBottom(100)
    }
  }, [data])

  return (
    <Card className={cn('flex flex-col gap-2 relative p-0', className)}>
      <div className="px-2 pt-2 md:px-3">
        {!!activeHistoryId || (!activeHistoryId && isFreshHistory) ? (
          <>
            <div
              ref={chatRef}
              className="flex flex-col gap-6 max-h-[60dvh] overflow-y-auto"
            >
              {isLoading && !isFreshHistory && <Loader className="py-8" />}

              {list.map((chat, idx) => (
                <Fragment key={idx}>
                  {chat.role === 'user' ? (
                    <ChatUser>{chat.content}</ChatUser>
                  ) : (
                    <ChatModel>{chat.content}</ChatModel>
                  )}
                </Fragment>
              ))}

              {hasNextPage && <Loader ref={refSentry} className="py-4" />}

              {newChatList.map((chat, idx) => (
                <Fragment key={idx}>
                  {chat.role === 'user' ? (
                    <ChatUser>{chat.content}</ChatUser>
                  ) : (
                    <ChatModel>{chat.content}</ChatModel>
                  )}
                </Fragment>
              ))}

              {newChatReply && <ChatModel>{newChatReply || ''}</ChatModel>}
              {isWaitingReply && <>...</>}
            </div>
          </>
        ) : (
          <Title as="h4" weight="semibold" align="center" className="text-xl">
            Mau tanya apa ke SmartCampus AI?
          </Title>
        )}
      </div>
      <div className="flex items-end gap-2 w-full bg-white sticky bottom-0 px-3 py-2">
        <Textarea
          className="flex-1"
          textareaClassName="resize-none"
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          rows={newChatRows || 1}
          placeholder="Tanyakan apa saja"
          onKeyDown={handleChatKeyDown}
          autoFocus
        ></Textarea>
        <ActionIcon
          size="sm"
          variant="outline"
          className="mb-1.5"
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
