'use client';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { Todo } from "@/types/board-type";

interface TodoCardProps {
  id: string;
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, todo }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-md shadow-sm bg-white/50 p-2 px-4"
    >
      {todo.title}
    </li>
  )
};

export default TodoCard;
