import { create } from 'zustand'

type ChatItemType = {
  id?: string
  role: 'user' | 'model'
  content: string
}

type AiChatStoreType = {
  open: boolean
  setOpen: (open: AiChatStoreType['open']) => void
  activeHistoryId: string | undefined
  setActiveHistoryId: (id: AiChatStoreType['activeHistoryId']) => void
  isFreshHistory: boolean
  setIsFreshHistory: (fresh: AiChatStoreType['isFreshHistory']) => void
  setActiveHistoryIdFresh: (id: AiChatStoreType['activeHistoryId']) => void
  newChatList: ChatItemType[]
  setNewChatList: (list: AiChatStoreType['newChatList']) => void
  addNewChatList: (data: AiChatStoreType['newChatList'][0]) => void
}

export const useAiChatStore = create<AiChatStoreType>((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open: open })),
  activeHistoryId: undefined,
  setActiveHistoryId: (id) =>
    set(() => ({ activeHistoryId: id, isFreshHistory: false })),
  isFreshHistory: false,
  setIsFreshHistory: (fresh) => set(() => ({ isFreshHistory: fresh })),
  setActiveHistoryIdFresh: (id) =>
    set(() => ({ activeHistoryId: id, isFreshHistory: true })),
  newChatList: [],
  setNewChatList: (list) => set(() => ({ newChatList: list })),
  addNewChatList: (data) =>
    set((state) => ({ newChatList: [...state.newChatList, data] })),
}))
