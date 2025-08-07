import {
  ActionIcon,
  Card,
  ContentLoader,
  Textarea,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { NewChatResponseType } from '@/layouts/header-menu-right-items/obrolan-ai/drawer'
import { listObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/list-obrolan'
import { ChatAiItemType, useAiChatStore } from '@/stores/ai-chat'
import cn from '@/utils/class-names'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Markdown from 'react-markdown'

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
    scrollWindowToBottom()
  }

  const scrollChatToBottom = (delay: number = 0) => {
    setTimeout(() => {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'instant',
      })
    }, delay)
  }

  const scrollWindowToBottom = (delay: number = 0) => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
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

  return (
    <Card className={cn('flex flex-col gap-2 relative p-0', className)}>
      <div className="px-2 pt-2 md:px-3">
        {!!activeHistoryId || (!activeHistoryId && isFreshHistory) ? (
          <div
            ref={chatRef}
            className="flex flex-col gap-6 max-h-[60dvh] overflow-y-auto"
          >
            {isLoading && !isFreshHistory && <ContentLoader className="py-8" />}

            {list.map((chat, idx) => (
              <Fragment key={idx}>
                {chat.role === 'user' ? (
                  <ChatUser>{chat.content}</ChatUser>
                ) : (
                  <ChatModel>{chat.content}</ChatModel>
                )}
              </Fragment>
            ))}

            {hasNextPage && <ContentLoader ref={refSentry} className="py-4" />}

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
          <Title
            as="h4"
            weight="semibold"
            align="center"
            className="text-base md:text-xl"
          >
            Mau tanya apa ke SmartCampus AI?
          </Title>
        )}
      </div>
      <div className="flex items-end gap-2 w-full bg-white sticky bottom-0 px-3 py-2">
        <Textarea
          ref={newChatRef}
          className="flex-1"
          textareaClassName="resize-none [&:disabled]:!bg-muted/20"
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          rows={newChatRows || 1}
          placeholder="Tanyakan apa saja"
          onKeyDown={handleChatKeyDown}
          onFocus={() => scrollWindowToBottom(200)}
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
