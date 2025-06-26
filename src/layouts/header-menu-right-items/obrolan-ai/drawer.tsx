import { ActionIcon, Drawer, Loader, Textarea, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/list-obrolan'
import { ChatAiItemType, useAiChatStore } from '@/stores/ai-chat'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import {
  BsClockHistory,
  BsFillSendFill,
  BsPlusCircle,
  BsThreeDotsVertical,
} from 'react-icons/bs'
import { LuCpu } from 'react-icons/lu'
import { PiXBold } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Markdown from 'react-markdown'
import { Dropdown } from 'rizzui'
import RiwayatObrolanAiDrawer from './riwayat-drawer'

export type NewChatResponseType = {
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

export default function ObrolanAiDrawer() {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const {
    open,
    setOpen,
    setOpenHistory,
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
  const newChatRef = useRef<HTMLTextAreaElement>(null)

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
        })) as ChatAiItemType[],
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
          const resData: NewChatResponseType = JSON.parse(event.data)
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

    newChatRef.current?.focus()
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

    newChatRef.current?.focus()

    if (activeHistoryId && !isFreshHistory && list.length > 0) {
      scrollChatToBottom()
    }
  }, [data])

  useEffect(() => {
    setTimeout(() => {
      newChatRef.current?.focus()
    }, 0)
  }, [open])

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

  return (
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
        <div className="flex gap-2">
          <Dropdown placement="bottom-start" className="">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="outline-hover">
                <BsThreeDotsVertical className="size-4" />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-44 divide-y !py-0">
              <div className="py-2">
                {activeHistoryId && (
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={() => setActiveHistoryId(undefined)}
                  >
                    <BsPlusCircle className="text-primary size-4 mr-2" />
                    Obrolan Baru
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  className="text-gray-dark"
                  onClick={() => setOpenHistory(true)}
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
      {!!activeHistoryId || (!activeHistoryId && isFreshHistory) ? (
        <div
          ref={chatRef}
          className="flex flex-col gap-6 overflow-y-auto flex-grow px-2 pt-2 md:px-3"
        >
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

          {newChatReply && <ChatModel>{`${newChatReply}...`}</ChatModel>}
        </div>
      ) : (
        <div className="flex flex-col justify-center h-full">
          <Title as="h5" weight="semibold" align="center" className="text-lg">
            Mau tanya apa ke SmartCampus AI?
          </Title>
        </div>
      )}
      <div className="flex items-end gap-2 w-full bg-white sticky bottom-0 px-3 py-3">
        <Textarea
          ref={newChatRef}
          className="flex-1"
          textareaClassName="resize-none [&:disabled]:!bg-muted/20"
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          rows={newChatRows || 1}
          placeholder="Tanyakan apa saja"
          onKeyDown={handleChatKeyDown}
          disabled={isWaitingReply}
        ></Textarea>
        <ActionIcon
          size="sm"
          variant="outline"
          className="mb-1.5"
          onClick={handleKirimPesan}
          disabled={isWaitingReply}
        >
          <BsFillSendFill className="size-3" />
        </ActionIcon>
      </div>

      <RiwayatObrolanAiDrawer />
    </Drawer>
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
