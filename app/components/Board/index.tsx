"use client";

import { useEffect } from "react";
import { useBoardStore } from "@/store/boardStore";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableColumn from "@/app/components/Board/SortableColumn";
import { StatusType } from "@/types/board-type";

const Board = () => {
  const { columnsData, todosData, fetchBoard, changeColumnOrder, moveTodoToAnotherColumn } =
    useBoardStore();

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  console.log(columnsData);
  console.log(todosData);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(PointerSensor)
  );

  const handleDragOver = (event: DragOverEvent) => {
    console.log(event);

    const { active, over } = event;

    const activeId = active.id;
    const overId = over?.id;
    const isActiveAndOverSame = activeId === overId;
    const isColumnActive = ["todo", "in-progress", "done"].includes(
      activeId as StatusType
    );

    if (
      over === null ||
      overId === undefined ||
      isActiveAndOverSame ||
      isColumnActive
    ) {
      return;
    }

    const activeTodo = todosData.byId[activeId];
    const overTodo = todosData.byId[overId];

    const activeColumnId = columnsData.byId[activeTodo.status].id;
    const overColumnId = columnsData.byId[overTodo.status].id;
    const isActiveAndOverTodoInSameColumn = activeColumnId === overColumnId;

    if (isActiveAndOverTodoInSameColumn) {
      return;
    }

    const isBelowOverTodoCard =
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height;

    moveTodoToAnotherColumn(activeId, overId, isBelowOverTodoCard);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);

    const { active, over } = event;

    // If the active item was dropped outside of a container, do nothing
    if (over === null) return;

    // If the active item was dropped in the same container, do nothing
    if (active.id === over.id) return;

    // If the active item was one of the columns, change order

    const isColumnActive = ["todo", "in-progress", "done"].includes(
      active.id as StatusType
    );

    if (isColumnActive) {
      const activeId = active.id as StatusType;
      const overId = over.id as StatusType;

      changeColumnOrder(activeId, overId);
      return;
    }

    
  };

  return (
    <DndContext
      sensors={sensors}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext id="board" items={columnsData.allIds}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {columnsData.allIds.map((status) => (
            <SortableColumn
              key={status}
              id={status}
              column={columnsData.byId[status]}
              todos={todosData}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Board;
