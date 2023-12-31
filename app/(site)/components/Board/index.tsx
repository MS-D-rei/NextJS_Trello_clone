"use client";

import { useEffect } from "react";
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  MouseSensor,
  MouseSensorOptions,
  TouchSensor,
  TouchSensorOptions,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableColumn from "@/app/(site)/components/Board/SortableColumn";
import { StatusType } from "@/types/board-type";
import { useBoardStore } from "@/store";
import Button from "@/app/components/Button";

const Board = () => {
  const {
    columnsData,
    todosData,
    fetchBoard,
    changeColumnOrder,
    moveTodoInSameColumn,
    moveTodoToAnotherColumn,
    moveTodoToEmptyColumn,
    sendColumnsDataToServer,
  } = useBoardStore();

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  // console.log(columnsData);
  // console.log(todosData);

  const handleActivationOnButton = (element: HTMLElement | null) => {
    let target = element;

    if (target === null) return false;

    while (target !== null) {
      if (target.tagName.toLowerCase() === "button") {
        return false;
      }
      target = target.parentElement;
    }

    return true;
  };

  class MouseSensorToHandleActivation extends MouseSensor {
    static activators = [
      {
        eventName: "onMouseDown" as const,
        handler: (
          { nativeEvent: event }: MouseEvent,
          { onActivation }: MouseSensorOptions
        ): boolean => {
          return handleActivationOnButton(event.target as HTMLElement);
        },
      },
    ];
  }

  class TouchSensorToHandleActivation extends TouchSensor {
    static activators = [
      {
        eventName: "onTouchStart" as const,
        handler: (
          { nativeEvent: event }: TouchEvent,
          { onActivation }: TouchSensorOptions
        ): boolean => {
          return handleActivationOnButton(event.target as HTMLElement);
        },
      },
    ];
  }

  const sensors = useSensors(
    useSensor(MouseSensorToHandleActivation),
    useSensor(KeyboardSensor),
    useSensor(TouchSensorToHandleActivation)
  );

  const collisionDetection: CollisionDetection = (args) => {
    return closestCorners(args);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // console.log("DragOverEvent", event);

    const { active, over } = event;

    // do nothing pattern
    // if over is null, do nothing.
    if (over === null || over.id === undefined) return;

    // if active.id and over.id are the same, do nothing.
    if (active.id === over.id) return;

    // handleDragOver should work in only 2 pattern.
    // 1. active.id and over.id both are todo and active moves to different column.
    // 2. active.id is todo and over.id is column
    // and active moves to diff col
    // and the column is empty (todoIds length is 0).

    // other cases, do nothing.

    const isActiveColumn = ["todo", "in-progress", "done"].includes(
      active.id as StatusType
    );

    if (isActiveColumn) return;

    // now the active is todo.

    const activeTodo = todosData.byId[active.id];
    const activeTodoColumnId = columnsData.byId[activeTodo.status].id;

    const isOverColumn = ["todo", "in-progress", "done"].includes(
      over.id as StatusType
    );

    // case1: active and over are todos and active moves to difference column.

    if (!isOverColumn) {
      const overTodoStatus = todosData.byId[over.id].status;

      // if active and over are in the same column, do nothing.

      const overTodoColumnId = columnsData.byId[overTodoStatus].id;

      const areActiveAndOverTodoInSameColumn =
        activeTodoColumnId === overTodoColumnId;

      if (areActiveAndOverTodoInSameColumn) return;

      const isBelowOverTodoCard =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      moveTodoToAnotherColumn(
        active.id as string,
        over.id as string,
        isBelowOverTodoCard
      );

      sendColumnsDataToServer(activeTodo, overTodoStatus);

      return;
    }

    // case2: active is todo and over is column and the column todoIds length is 0.

    const overColumnId = columnsData.byId[over.id as StatusType].id;
    const areActiveAndOverColumnSame = activeTodoColumnId === overColumnId;

    if (areActiveAndOverColumnSame) return;

    const isOverColumnEmpty =
      columnsData.byId[over.id as StatusType].todoIds.length === 0;

    if (!isOverColumnEmpty) return;

    moveTodoToEmptyColumn(active.id as string, over.id as StatusType);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // console.log("DragEndEvent", event);

    const { active, over } = event;

    if (over === null || over.id === undefined) return;

    if (active.id === over.id) return;

    // handleDragEnd should work in only 2 patterns.
    // 1. active.id and over.id both are columns.
    // 2. active.id and over.id both are todos and they are in same columns.

    const isActiveColumn = ["todo", "in-progress", "done"].includes(
      active.id as StatusType
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
      moveTodoInSameColumn(
        active.id as string,
        over.id as string,
        activeTodoStatus
      );
      return;
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-1 mr-4 mb-2">
        <Button type="button" onClick={() => fetchBoard()} secondary>
          Reset
        </Button>
        <Button type="button">
          Save
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
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
                todosData={todosData}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default Board;
