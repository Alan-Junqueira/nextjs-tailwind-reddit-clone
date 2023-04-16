import { create } from 'zustand'

type AuthViews = 'login' | 'signup' | 'resetPassword'

type AuthModalState = {
  open: boolean
  view: AuthViews
}

type AuthModalActions = {
  openModal: (modalName: AuthViews) => void
  closeModal: () => void
}

interface AuthStoreProps {
  state: AuthModalState
  actions: AuthModalActions
}

export const useAuthModalStore = create<AuthStoreProps>((set) => ({
  state: {
    open: false,
    view: 'login',
  },
  actions: {
    openModal: (modalName: AuthViews) =>
      set(() => ({
        state: { open: true, view: modalName },
      })),
    closeModal: () =>
      set((state) => ({
        ...state,
        state: { ...state.state, open: false },
      })),
  },
}))
