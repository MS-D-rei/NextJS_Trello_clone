"use client";

import { useEffect, useState } from "react";
import { useBoardStore } from "@/store/boardStore";
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableColumn from "@/app/components/Board/SortableColumn";
import { StatusType } from "@/types/board-type";

const Board = () => {
  const {
    columnsData,
    todosData,
    fetchBoard,
    changeColumnOrder,
    moveTodoInSameColumn,
    moveTodoToAnotherColumn,
  } = useBoardStore();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  console.log(columnsData);
  console.log(todosData);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(PointerSensor)
  );

  const collisionDetection: CollisionDetection = (args) => {
    return closestCorners(args);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log("DragOverEvent");
    console.log(event);

    const { active, over } = event;

    // do nothing pattern
    // if over is null, do nothing.
    if (over === null || over.id === undefined) return;

    // if active.id and over.id are the same, do nothing.
    if (active.id === over.id) return;

    // handleDragOver should work in only 1 pattern.
    // 1. active.id and over.id both are todos and active move to different column.

    // other cases, do nothing.

    const isActiveOrOverColumn =
      ["todo", "in-progress", "done"].includes(active.id as StatusType) ||
      ["todo", "in-progress", "done"].includes(over.id as StatusType);

    if (isActiveOrOverColumn) return;

    const activeTodo = todosData.byId[active.id];
    const overTodo = todosData.byId[over.id];

    // if active and over are in the same column, do nothing.

    const activeColumnId = columnsData.byId[activeTodo.status].id;
    const overColumnId = columnsData.byId[overTodo.status].id;

    const isActiveAndOverTodoInSameColumn = activeColumnId === overColumnId;
    if (isActiveAndOverTodoInSameColumn) {
      return;
    }

    // work case: active and over are todos and active move to difference column.

    const isBelowOverTodoCard =
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height;

    moveTodoToAnotherColumn(
      active.id as string,
      over.id as string,
      isBelowOverTodoCard
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("DragEndEvent");
    console.log(event);

    const { active, over } = event;

    if (over === null || over.id === undefined) return;

    if (active.id === over.id) return;

    // handleDragEnd should work in only 2 patterns.
    // 1. active.id and over.id both are columns.
    // 2. active.id and over.id both are todos and they are in same columns.

    const isActiveColumn = ["todo", "in-progress", "done"].includes(
      activeId as StatusType
    );
    const isOverColumn = ["todo", "in-progress", "done"].includes(
      over.id as StatusType
    );

    // if other cases, do nothing.

    if (isActiveColumn && !isOverColumn) return;
    if (!isActiveColumn && isOverColumn) return;

    // case 1. active.id and over.id both are columns.

    if (isActiveColumn && isOverColumn) {
      changeColumnOrder(active.id as StatusType, over.id as StatusType);
      return;
    }

    // case 2. active.id and over.id both are todos and they are in same columns.

    const activeTodoStatus = todosData.byId[active.id].status;
    const overTodoStatus = todosData.byId[over.id].status;

    const areBothActiveAndOverTodoInSameColumn =
      activeTodoStatus === overTodoStatus;

    if (areBothActiveAndOverTodoInSameColumn) {
      moveTodoInSameColumn(active.id as string, over.id as string);
      return;
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
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
