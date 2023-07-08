import { create } from "zustand";
import { ColumnData, TodoData } from "@/types/board-type";
import { getColumnAndTodoData } from "@/service/getColumnAndTodoData";
import { arrayMove } from "@dnd-kit/sortable";

interface BoardState {
  columns: ColumnData;
  todos: TodoData;
  fetchBoard: () => void;
  changeColumnOrder: (activeId: string, overId: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: {
    byId: {
      todo: { id: "todo", todoIds: [] },
      "in-progress": { id: "in-progress", todoIds: [] },
      done: { id: "done", todoIds: [] },
    },
    allIds: [],
  },
  todos: {
    byId: {},
    allIds: [],
  },
  fetchBoard: async () => {
    const { columnData, todoData } = await getColumnAndTodoData();

    set({ columns: columnData, todos: todoData });
  },
  changeColumnOrder: (activeId, overId) => {
    if (activeId === overId) return;

    if (activeId !== overId) {
      set((state) => {
        const activeIndex = state.columns.allIds.indexOf(activeId);
        const overIndex = state.columns.allIds.indexOf(overId);
        const newColumnOrder = arrayMove(
          state.columns.allIds,
          activeIndex,
          overIndex
        );

        return {
          columns: {
            ...state.columns,
            allIds: newColumnOrder,
          },
        };
      });
    }
  },
}));
