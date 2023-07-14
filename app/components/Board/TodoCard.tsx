"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@/types/board-type";

interface TodoCardProps {
  id: string;
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, todo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-md shadow-sm p-2 px-4 ${isDragging ? "bg-green-200" : "bg-white/50"
        }`}
    >
      {todo.title}
    </li>
  );
};

export default TodoCard;
