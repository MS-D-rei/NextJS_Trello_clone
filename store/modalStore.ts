import { create } from "zustand";

interface ModalState {
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  isAddTodoModalOpen: boolean;
  openAddTodoModal: () => void;
  closeAddTodoModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isDeleteModalOpen: false,
  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  isAddTodoModalOpen: false,
  openAddTodoModal: () => set({ isAddTodoModalOpen: true }),
  closeAddTodoModal: () => set({ isAddTodoModalOpen: false }),
}));
