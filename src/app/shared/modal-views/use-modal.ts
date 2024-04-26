'use client'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { ModalSize } from 'rizzui'

export type ModalViewProps = {
  closeModal: () => void
}

type ModalTypes = {
  view: React.ReactNode
  isOpen: boolean
  size?: ModalSize
  customSize?: string
}

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
})

export function useModal() {
  const state = useAtomValue(modalAtom)
  const setState = useSetAtom(modalAtom)

  const openModal = ({
    view,
    size,
    customSize,
  }: {
    view: React.ReactNode
    size?: ModalSize
    customSize?: string
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      size,
      customSize,
    })
  }

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    })
  }

  return {
    ...state,
    openModal,
    closeModal,
  }
}
