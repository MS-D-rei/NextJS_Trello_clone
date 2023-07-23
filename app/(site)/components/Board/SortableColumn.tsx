"use client";

import { useCallback } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useHeaderStore, useModalStore } from "@/store";
import { Column, StatusType, TodosData } from "@/types/board-type";
import TodoCard from "@/app/(site)/components/Board/TodoCard";

interface SortableColumnProps {
  id: StatusType;
  column: Column;
  todosData: TodosData;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  id,
  column,
  todosData,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const { searchString } = useHeaderStore();

  const { openAddTodoModal } = useModalStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const idToColumnText: { [key in StatusType]: string } = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  const searchedTodoIds = useCallback(() => {
    if (!searchString) {
      return column.todoIds;
    }

    return column.todoIds.filter((todoId) => {
      const todo = todosData.byId[todoId];
      return todo.title.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [searchString, column.todoIds, todosData.byId]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 rounded-2xl border border-gray-300 shadow-sm bg-gray-100/50"
    >
      <h2 className="flex items-center justify-between bg-white/80 font-bold rounded-2xl p-2 px-4 mb-4">
        {idToColumnText[id]}
        <span className="text-sm text-gray-500 rounded-full bg-gray-300 font-normal px-4 py-2">
          {searchedTodoIds().length}
        </span>
      </h2>

      <ul className="grid gap-4 list-none">
        <SortableContext id="todos" items={column.todoIds}>
          {searchedTodoIds().map((todoId) => (
            <TodoCard key={todoId} id={todoId} todo={todosData.byId[todoId]} />
          ))}
        </SortableContext>
        <li className="flex justify-end p-2 px-4 bg-white/50 rounded-md hover:bg-green-200">
          <button onClick={openAddTodoModal}>
            <PlusCircleIcon className="h-6 w-6 text-green-500" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortableColumn;
