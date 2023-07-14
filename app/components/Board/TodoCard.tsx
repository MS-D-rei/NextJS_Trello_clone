"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@/types/board-type";
import { XCircleIcon } from "@heroicons/react/24/solid";

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
      className={`flex items-center justify-between rounded-md shadow-sm p-2 px-4
      ${isDragging ? "bg-green-200" : "bg-white/50"}`}
    >
      <p>{todo.title}</p>
      <button>
        <XCircleIcon className="h-6 w-6 text-red-300 hover:text-red-500" />
      </button>
    </li>
  );
};

export default TodoCard;
