"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, StatusType, TodosData } from "@/types/board-type";
import TodoCard from "@/app/components/Board/TodoCard";

interface SortableColumnProps {
  id: StatusType;
  column: Column;
  todos: TodosData;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  id,
  column,
  todos,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const idToColumnText: { [key in StatusType]: string } = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 rounded-2xl shadow-sm bg-white/50"
    >
      <h2 className="flex items-center justify-between p-2">
        {idToColumnText[id]}
        <span className="text-sm text-gray-500 rounded-full bg-gray-300 px-4 py-2">
          {column.todoIds.length}
        </span>
      </h2>

      <div>
        <SortableContext id="todos" items={column.todoIds}>
          {column.todoIds.map((todoId) => (
            <TodoCard key={todoId} id={todoId} todo={todos.byId[todoId]} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default SortableColumn;
