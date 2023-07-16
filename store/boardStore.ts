import { create } from "zustand";
import { databases } from "@/appwrite";
import { arrayMove } from "@dnd-kit/sortable";
import { ColumnsData, StatusType, Todo, TodosData } from "@/types/board-type";
import { getColumnAndTodoData } from "@/service/getColumnAndTodoData";

interface BoardState {
  columnsData: ColumnsData;
  todosData: TodosData;
  fetchBoard: () => void;
  changeColumnOrder: (activeId: StatusType, overId: StatusType) => void;
  moveTodoInSameColumn: (
    activeTodoId: string,
    overTodoId: string,
    status: StatusType
  ) => void;
  moveTodoToAnotherColumn: (
    activeTodoId: string,
    overTodoId: string,
    isBelowTodoCard: boolean | null
  ) => void;
  moveTodoToEmptyColumn: (
    activeTodoIds: string,
    overColumnId: StatusType
  ) => void;
  sendColumnsDataToServer: (todo: Todo, status: StatusType) => void;
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
  },
  moveTodoInSameColumn: (activeTodoId, overTodoId, status) => {
    set((state) => {
      const column = state.columnsData.byId[status];

      const activeTodoIndex = column.todoIds.indexOf(activeTodoId);
      const overTodoIndex = column.todoIds.indexOf(overTodoId);

      const newTodosOrder = arrayMove(
        column.todoIds,
        activeTodoIndex,
        overTodoIndex
      );

      return {
        columnsData: {
          ...state.columnsData,
          byId: {
            ...state.columnsData.byId,
            [column.id]: {
              ...column,
              todoIds: newTodosOrder,
            },
          },
        },
      };
    });
  },
  moveTodoToAnotherColumn: (activeTodoId, overTodoId, isBelowTodoCard) => {
    set((state) => {
      const { columnsData, todosData } = state;

      // remove active todo id from active column's todoIds

      const activeTodoStatus = todosData.byId[activeTodoId].status;
      const activeColumn = columnsData.byId[activeTodoStatus];
      const newActiveTodosOrder = activeColumn.todoIds.filter(
        (todoId) => todoId !== activeTodoId
      );

      // add active todo id to over column's todoIds

      // calculate overTodoIndex
      const overTodoStatus = todosData.byId[overTodoId].status;
      const overColumn = columnsData.byId[overTodoStatus];
      const overTodoIndex = overColumn.todoIds.indexOf(overTodoId);

      // calculate landingIndex
      let landingIndex = 0;
      const modifier = isBelowTodoCard ? 1 : 0;
      landingIndex =
        overTodoIndex >= 0
          ? overTodoIndex + modifier
          : overColumn.todoIds.length + 1;

      // add activeTodoId to overTodoColumn's todoIds

      const newOverTodosOrder = [
        ...overColumn.todoIds.slice(0, landingIndex),
        activeTodoId,
        ...overColumn.todoIds.slice(landingIndex),
      ];

      // change activeTodo's status to overTodo's status

      return {
        columnsData: {
          ...columnsData,
          byId: {
            ...columnsData.byId,
            [activeColumn.id]: {
              ...activeColumn,
              todoIds: newActiveTodosOrder,
            },
            [overColumn.id]: {
              ...overColumn,
              todoIds: newOverTodosOrder,
            },
          },
        },
        todosData: {
          ...todosData,
          byId: {
            ...todosData.byId,
            [activeTodoId]: {
              ...todosData.byId[activeTodoId],
              status: overTodoStatus,
            },
          },
        },
      };
    });
  },
  moveTodoToEmptyColumn: (activeTodoId, overColumnId) => {
    set((state) => {
      // this function do 3 things.
      // 1. remove active todo id from active column's activeTodoIds
      // 2. add active todo id to over column's activeTodoIds
      // 3. change active todo's status to over column's status

      const activeTodoStatus = state.todosData.byId[activeTodoId].status;
      const activeColumn = state.columnsData.byId[activeTodoStatus];
      const newActiveTodosOrder = activeColumn.todoIds.filter(
        (todoId) => todoId !== activeTodoId
      );
      const overColumn = state.columnsData.byId[overColumnId];

      return {
        columnsData: {
          ...state.columnsData,
          byId: {
            ...state.columnsData.byId,
            [activeColumn.id]: {
              ...activeColumn,
              todoIds: newActiveTodosOrder,
            },
            [overColumn.id]: {
              ...overColumn,
              todoIds: [activeTodoId],
            },
          },
        },
        todosData: {
          ...state.todosData,
          byId: {
            ...state.todosData.byId,
            [activeTodoId]: {
              ...state.todosData.byId[activeTodoId],
              status: overColumnId,
            },
          },
        },
      };
    });
  },
  sendColumnsDataToServer: async (todo, status) => {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID,
      todo.$id,
      {
        status,
      }
    );
    console.log(response);
  },
}));
