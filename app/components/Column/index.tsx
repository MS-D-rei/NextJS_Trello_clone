"use client";

import { Todos } from "@/types/board-type";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface ColumnProps {
  id: string;
  todos: Todos;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ id, todos, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm
                  ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`}
              >
                <h2>{id}</h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
