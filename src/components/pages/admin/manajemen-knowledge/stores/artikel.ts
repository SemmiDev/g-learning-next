import { create } from 'zustand'

type ArtikelStoreType = {
  id: string | null
  action: 'tambah' | 'ubah' | null
  modulId: string | null
  tambahArtikel: (modulId: string) => void
  ubahArtikel: (artikelId: string) => void
  tutupArtikel: () => void
}

export const useManajemenKnowledgeArtikelStore = create<ArtikelStoreType>(
  (set) => ({
    id: null,
    action: null,
    modulId: null,
    tambahArtikel: (modulId: string) =>
      set(() => ({ id: null, modulId, action: 'tambah' })),
    ubahArtikel: (artikelId: string) =>
      set(() => ({ modulId: null, id: artikelId, action: 'ubah' })),
    tutupArtikel: () => set(() => ({ id: null, action: null, modulId: null })),
  })
)
