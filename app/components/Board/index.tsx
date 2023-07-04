"use client";

import { useEffect } from "react";
import { useBoardStore } from "@/store/boardStore";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const { fetchBoard } = useBoardStore();

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard])

  return (
    <div>Board</div>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div></div>}
    //   </Droppable>
    // </DragDropContext>
  );
};

export default Board;
