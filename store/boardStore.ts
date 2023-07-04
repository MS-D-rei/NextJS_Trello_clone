import { create } from "zustand";
import { Board, BoardColumn, StatusType } from "@/types/board-type";
import { getTodosGroupedByStatus } from "@/service/getTodosGroupedByStatus";

interface BoardState {
  board: Board;
  fetchBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<StatusType, BoardColumn>(),
  },
  fetchBoard: async () => {
    const todos = getTodosGroupedByStatus();
  }
}));
