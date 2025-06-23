import { create } from 'zustand'

type AiChatStoreType = {
  open: boolean
  setOpen: (open: AiChatStoreType['open']) => void
}

export const useAiChatStore = create<AiChatStoreType>((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open: open })),
}))
