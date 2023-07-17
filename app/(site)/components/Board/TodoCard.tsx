"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XCircleIcon } from "@heroicons/react/24/solid";
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
      className={`rounded-md shadow-sm p-2 px-4
      ${isDragging ? "bg-green-200" : "bg-white/50"}`}
    >
      <div className="flex items-center justify-between">
        <p>{todo.title}</p>
        <button>
          <XCircleIcon className="h-6 w-6 text-red-300 hover:text-red-500" />
        </button>
      </div>

      {/* Add image here */}
    </li>
  );
};

export default React.memo(TodoCard);
