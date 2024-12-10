import { create } from 'zustand'

type SyncStoreType = {
  isSyncing: boolean
  setIsSyncing: (open: SyncStoreType['isSyncing']) => void
}

export const useSyncStore = create<SyncStoreType>((set) => ({
  isSyncing: false,
  setIsSyncing: (open) => set(() => ({ isSyncing: open })),
}))
