import { create } from "zustand";
import { ColumnsData, StatusType, TodosData } from "@/types/board-type";
import { getColumnAndTodoData } from "@/service/getColumnAndTodoData";
import { arrayMove } from "@dnd-kit/sortable";

interface BoardState {
  columnsData: ColumnsData;
  todosData: TodosData;
  fetchBoard: () => void;
  changeColumnOrder: (activeId: StatusType, overId: StatusType) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  columnsData: {
    byId: {
      todo: { id: "todo", todoIds: [] },
      "in-progress": { id: "in-progress", todoIds: [] },
      done: { id: "done", todoIds: [] },
    },
    allIds: [],
  },
  todosData: {
    byId: {},
    allIds: [],
  },
  fetchBoard: async () => {
    const { columnsData, todosData } = await getColumnAndTodoData();

    set({ columnsData, todosData });
  },
  changeColumnOrder: (activeId, overId) => {
    if (activeId === overId) return;

    if (activeId !== overId) {
      set((state) => {
        const activeIndex = state.columnsData.allIds.indexOf(activeId);
        const overIndex = state.columnsData.allIds.indexOf(overId);
        const newColumnOrder = arrayMove(
          state.columnsData.allIds,
          activeIndex,
          overIndex
        );

        return {
          columnsData: {
            ...state.columnsData,
            allIds: newColumnOrder,
          },
        };
      });
    }
  },
}));
