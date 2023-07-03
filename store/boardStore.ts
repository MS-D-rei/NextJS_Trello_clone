import { create } from "zustand";
import { Board, BoardColumn, StatusType } from "@/types/board-type";

interface BoardState {
  board: Board;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<StatusType, BoardColumn>(),
  },
}));
