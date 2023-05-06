import { create } from 'zustand'

type DirectoryMenuState = {
  directoryOpen: boolean
}

type DirectoryMenuActions = {
  openDirectory: () => void
  closeDirectory: () => void
  toggleDirectory: () => void
}

interface DirectoryMenuProps {
  state: DirectoryMenuState
  actions: DirectoryMenuActions
}

export const useDirectoryMenuStore = create<DirectoryMenuProps>((set) => ({
  state: {
    directoryOpen: false,
  },
  actions: {
    openDirectory: () =>
      set((prev) => ({
        ...prev,
        state: { directoryOpen: true },
      })),
    closeDirectory: () =>
      set((prev) => ({
        ...prev,
        state: { directoryOpen: false },
      })),
    toggleDirectory: () => {
      set(prev => ({
        ...prev,
        state: { directoryOpen: !prev.state.directoryOpen }
      }))
    }
  },
}))
