"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "@/store/boardStore";
import Column from "@/app/components/Column";

const Board = () => {
  const { board, fetchBoard } = useBoardStore();

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  console.log(board);

  const handleDragEnd = (result: DropResult) => { };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} index={index} todos={column.todos} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
