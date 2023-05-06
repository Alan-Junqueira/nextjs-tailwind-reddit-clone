import { create } from 'zustand'

type CreateCommunityModalState = {
  createCommunityModalOpen: boolean
}

type CreateCommunityModalActions = {
  openCreateCommunityModal: () => void
  closeCreateCommunityModal: () => void
}

interface CreateCommunityModalProps {
  state: CreateCommunityModalState
  actions: CreateCommunityModalActions
}

export const useCreateCommunityModalStore = create<CreateCommunityModalProps>((set) => ({
  state: {
    createCommunityModalOpen: false,
  },
  actions: {
    openCreateCommunityModal: () =>
      set((prev) => ({
        ...prev,
        state: { createCommunityModalOpen: true },
      })),
    closeCreateCommunityModal: () =>
      set((prev) => ({
        ...prev,
        state: { createCommunityModalOpen: false },
      })),
  },
}))
