import { create } from 'zustand'

type GlobalStoreType = {
  openSidebarMenu: boolean
  setOpenSidebarMenu: (open: GlobalStoreType['openSidebarMenu']) => void
}

export const useGlobalStore = create<GlobalStoreType>((set) => ({
  openSidebarMenu: false,
  setOpenSidebarMenu: (open) => set(() => ({ openSidebarMenu: open })),
}))
