import { create } from 'zustand'

type ArtikelStoreType = {
  id: string | null
  action: 'tambah' | 'ubah' | null
  idModul: string | null
  tambahArtikel: (idModul: string) => void
  ubahArtikel: (artikelId: string) => void
  tutupArtikel: () => void
}

export const useManajemenKnowledgeArtikelStore = create<ArtikelStoreType>(
  (set) => ({
    id: null,
    action: null,
    idModul: null,
    tambahArtikel: (idModul: string) =>
      set(() => ({ id: null, idModul, action: 'tambah' })),
    ubahArtikel: (artikelId: string) =>
      set(() => ({ idModul: null, id: artikelId, action: 'ubah' })),
    tutupArtikel: () => set(() => ({ id: null, action: null, idModul: null })),
  })
)
