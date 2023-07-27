import { create } from "zustand";
import { StatusType } from "@/types/board-type";

interface NewTodoState {
  newTodoTitle: string;
  newTodoStatus: StatusType;
  newTodoImage: string;
  setNewTodoTitle: (title: string) => void;
  setNewTodoStatus: (status: StatusType) => void;
  setNewTodoImage: (image: string) => void;
}

export const useNewTodoStore = create<NewTodoState>((set) => ({
  newTodoTitle: "",
  newTodoStatus: "todo",
  newTodoImage: "",
  setNewTodoTitle: (title) => set({ newTodoTitle: title }),
  setNewTodoStatus: (status) => set({ newTodoStatus: status }),
  setNewTodoImage: (image) => set({ newTodoImage: image }),
}));
